import { BaseCommand } from '@adonisjs/core/build/standalone'
import PromisePool, { OnProgressCallback } from '@supercharge/promise-pool/dist'
import { load } from 'cheerio'
import DangerLevel from 'App/Models/DangerLevel'
import Station from 'App/Models/Station'
import axios, { AxiosInstance } from 'axios'
import getProgressBar from 'App/Utils/ProgressBarLogger'
import { normalizeDischarge } from 'App/Utils/Normalizer'

export default class FetchOfevDangerLevels extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'fetch:ofev:danger_levels'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Fetch OFEV danger levels for stations'

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

  public static readonly OFEV_URL: string = 'https://www.hydrodaten.admin.ch/en/'

  public async run() {
    // Clear all danger levels
    await DangerLevel.query().delete()

    const stations = await Station.all()

    const api = axios.create({
      baseURL: FetchOfevDangerLevels.OFEV_URL,
      timeout: 30000,
    })

    this.logger.info('fetching danger levels...', undefined, `${stations.length}`)
    const logUpdate: OnProgressCallback<Station> = (_, pool) =>
      this.logger.logUpdate(
        `${getProgressBar(pool.processedPercentage())} ${pool.processedPercentage().toFixed(0)}%`
      )

    const { results, errors } = await PromisePool.for(stations)
      .withConcurrency(10)
      .onTaskStarted(logUpdate)
      .onTaskFinished(logUpdate)
      .process((station) => this.pollDangerLevels(station.id, station.vendorIdentifier, api))

    this.logger.logUpdatePersist()
    this.logger.success('fetched danger levels', undefined, `${results.length}`)

    if (errors.length > 0) {
      this.logger.warning('failed to fetch danger levels', undefined, `${errors.length}`)
      for (const error of errors) {
        this.logger.error(error)
      }
    }
  }

  private async pollDangerLevels(id: number, vendorId: string, api: AxiosInstance) {
    const pageText = await api
      .get<string>(`${vendorId}.html`, { responseType: 'text' })
      .then((response) => response.data)

    const $ = load(pageText)
    const rows = $('h3')
      .filter((_, el) => $(el).text().trim() === 'Danger levels')
      .next()
      .find('tr')
      .toArray()
      .map((row) => row.children.map((cell) => $(cell).text().trim()).filter((cell) => cell !== ''))

    if (rows.length === 0) return

    const listTypes = new Set()

    const createPromises = rows.slice(1).flatMap((row) => {
      const [unparsedType, ...values] = row
      const [measureType, unit] = this.parseMeasureType(unparsedType)
      listTypes.add(unparsedType)
      return values
        .map(this.parseLevelValues)
        .map(([min, max]) => {
          if (measureType !== 'discharge') return [min, max]
          return [normalizeDischarge(min, unit), max ? normalizeDischarge(max, unit) : null]
        })
        .map(([min, max]: [number, number | null], index) => {
          const dangerLevel = new DangerLevel()
          dangerLevel.stationId = id
          dangerLevel.min = min
          dangerLevel.max = max
          dangerLevel.measureType = measureType as 'level' | 'discharge' | 'temperature'
          dangerLevel.type = rows[0][index + 1].toLowerCase() as
            | 'dl1'
            | 'dl2'
            | 'dl3'
            | 'dl4'
            | 'dl5'
          return dangerLevel.save().catch((error) => {
            if (error.code !== '23505') throw error
          })
        })
    })

    return Promise.allSettled(createPromises)
  }

  private parseMeasureType(type: string) {
    const typeParts = type.split(' ').map((word) => word.toLowerCase())
    const rawType = typeParts[0]
    return [rawType === 'waterlevel' ? 'level' : rawType, typeParts[1].slice(1, -1)]
  }

  private parseLevelValues(values: string): [number, number | null] {
    if (values.includes(' - ')) {
      const [min, max] = values.split(' - ').map((value) => parseFloat(value))
      return [min, max]
    }
    if (values.includes('< ')) {
      return [0, parseFloat(values.split('< ')[1])]
    }
    if (values.includes('> ')) {
      return [parseFloat(values.split('> ')[1]), null]
    }
    throw new Error(`Could not parse level values: "${values}"`)
  }
}
