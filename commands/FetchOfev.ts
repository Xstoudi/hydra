import { BaseCommand } from '@adonisjs/core/build/standalone'
import axios from 'axios'
import camelize from 'App/Utils/Camelize'
import { OnProgressCallback, PromisePool, StopThePromisePoolError } from '@supercharge/promise-pool'
import getProgressBar from 'App/Utils/ProgressBarLogger'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'
import Station from 'App/Models/Station'
import Measure from 'App/Models/Measure'
import { DateTime } from 'luxon'
import Database, { TransactionClientContract } from '@ioc:Adonis/Lucid/Database'

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
    stayAlive: false,
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

    const { data: stations } = await api.get<OFEVStationsResponse>('stations')

    this.logger.info('fetching stations...', undefined, `${stations.length}`)
    const logUpdate: OnProgressCallback<OFEVStationLight> = (_, pool) =>
      this.logger.logUpdate(
        `${getProgressBar(pool.processedPercentage())} ${pool.processedPercentage().toFixed(0)}%`
      )

    const measuresTransaction = await Database.transaction()

    // Handle stations in promise pool
    const { results, errors } = await PromisePool.for(stations)
      .withConcurrency(50)
      .onTaskStarted(logUpdate)
      .onTaskFinished(logUpdate)
      .handleError((error, station) => {
        this.logger.error(error.message)
      })
      .process((station) =>
        api
          .get<OFEVStationResponse>(`station/${station.id}`)
          .then((response) => response.data)
          .then((data) => this.handleStation(station.id, data, measuresTransaction))
      )

    await measuresTransaction.commit()

    this.logger.logUpdatePersist()
    this.logger.success('fetched stations', undefined, `${results.length}`)
    if (errors.length > 0) {
      this.logger.warning('failed to fetch stations', undefined, `${errors.length}`)
    }
    await this.exit()
  }

  private async handleStation(
    id: string,
    { name, coordinates, waterBodyName, waterBodyType, parameters }: OFEVStationResponse,
    transaction: TransactionClientContract
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

    await Promise.allSettled(
      Object.keys(parameters).map((parameterKey: keyof StationParameters) => {
        const { value, unit, datetime } = parameters[parameterKey]!
        const measure = new Measure()
        measure.useTransaction(transaction)
        measure.stationId = station.id
        measure.type = parameterKey
        measure.value = parameterKey === 'discharge' ? this.normalizeDischarge(value, unit) : value
        measure.measuredAt = DateTime.fromISO(datetime)
        return measure.save()
      })
    )
  }

  private normalizeDischarge(value: number, unit: string) {
    switch (unit) {
      case 'm3/s':
        return value
      case 'l/s':
        return value / 1000
      case 'l/min':
        return value / 1000 / 60
      default:
        throw new Error(`unknown discharge unit "${unit}"`)
    }
  }
}
