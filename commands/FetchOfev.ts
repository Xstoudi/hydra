import { BaseCommand } from '@adonisjs/core/build/standalone'
import axios, { AxiosInstance } from 'axios'
import camelize from 'App/Utils/Camelize'
import { OnProgressCallback, PromisePool } from '@supercharge/promise-pool'
import getProgressBar from 'App/Utils/ProgressBarLogger'
import Station from 'App/Models/Station'
import Measure from 'App/Models/Measure'
import { DateTime, Duration } from 'luxon'
import wait from 'App/Utils/Wait'
import durationHumanizer from 'App/Utils/DurationHumanizer'
import { normalizeDischarge } from 'App/Utils/Normalizer'

export default class FetchOfev extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fetch:ofev'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Fetch live OFEV data from SwissHydroApi'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: true,
  }

  public static readonly API_URL: string = 'https://swisshydroapi.bouni.de/api/v1/'

  public async run() {
    const api = axios.create({
      baseURL: FetchOfev.API_URL,
      timeout: 30000,
    })

    api.interceptors.response.use((response) => {
      response.data = camelize(response.data)
      return response
    })

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const startTime = Date.now()
      try {
        await this.pollerRoutine(api)
      } catch (error) {
        this.logger.error(error)
      }

      const tookTime = Date.now() - startTime
      const toWait = 600000 - tookTime

      this.logger.info(
        `polling took ${durationHumanizer(
          Duration.fromMillis(tookTime)
        )} --> waiting ${durationHumanizer(Duration.fromMillis(toWait))}...`
      )
      await wait(toWait)
    }
  }

  private async pollerRoutine(api: AxiosInstance) {
    const { data: stations } = await api.get<OFEVStationsResponse>('stations')
    const { data: stationsData } = await api.get<OFEVStationsWithDataResponse>('stations/data')

    this.logger.info('fetching stations...', undefined, `${stations.length}`)
    const logUpdate: OnProgressCallback<OFEVStationLight> = (_, pool) =>
      this.logger.logUpdate(
        `${getProgressBar(pool.processedPercentage())} ${pool.processedPercentage().toFixed(0)}%`
      )

    // Handle stations in promise pool
    const { results, errors } = await PromisePool.for(stations)
      .withConcurrency(10)
      .onTaskStarted(logUpdate)
      .onTaskFinished(logUpdate)
      .process((station) => this.handleStation(station.id, stationsData[station.id]))

    this.logger.logUpdatePersist()
    this.logger.success('fetched stations', undefined, `${results.length}`)

    if (errors.length > 0) {
      this.logger.warning('failed to fetch stations', undefined, `${errors.length}`)
      for (const error of errors) {
        this.logger.error(error)
      }
    }
  }

  private async handleStation(
    id: string,
    { name, coordinates, waterBodyName, waterBodyType, parameters }: OFEVStationResponse
  ) {
    // Find by vendor id or create station
    const station = await Station.firstOrCreate(
      { vendorIdentifier: id },
      {
        name: name,
        coordinates: coordinates,
        waterBodyName: waterBodyName,
        waterBodyType: waterBodyType,
        vendorIdentifier: id,
      }
    )

    const parametersSaved = await Promise.allSettled(
      Object.keys(parameters).map(async (parameterKey: keyof StationParameters) => {
        const { value, unit, datetime } = parameters[parameterKey]!

        const normalizedValue =
          parameterKey === 'discharge' ? normalizeDischarge(value, unit) : value

        // Check if latest measure was already saved as a different time
        const falselyUpdatedMeasure = await Measure.query()
          .where({
            stationId: station.id,
            type: parameterKey,
          })
          .orderBy('id', 'desc')
          .first()

        if (falselyUpdatedMeasure !== null && falselyUpdatedMeasure.value === normalizedValue) {
          return
        }

        const measure = new Measure()
        measure.stationId = station.id
        measure.type = parameterKey
        measure.value = normalizedValue
        measure.measuredAt = DateTime.fromISO(datetime)
        await measure.save().catch((error) => {
          if (error.code !== '23505') throw error
        })
      })
    )

    parametersSaved.forEach((result) => {
      if (result.status === 'rejected') {
        throw result.reason
      }
    })
  }
}
