import { BaseCommand } from '@adonisjs/core/build/standalone'
import axios from 'axios'
import camelize from 'App/Utils/Camelize'
import { OnProgressCallback, PromisePool } from '@supercharge/promise-pool'
import getProgressBar from 'App/Utils/ProgressBarLogger'
import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'

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

    // Handle stations in promise pool
    const { results, errors } = await PromisePool.for(stations)
      .withConcurrency(50)
      .onTaskStarted(logUpdate)
      .onTaskFinished(logUpdate)
      .process((station) =>
        api
          .get<OFEVStationResponse>(`station/${station.id}`)
          .then((response) => response.data)
          .then(this.handleStation)
      )

    this.logger.logUpdatePersist()
    this.logger.success('fetched stations', undefined, `${results.length}`)
    if (errors.length > 0) {
      this.logger.warning('failed to fetch stations', undefined, `${errors.length}`)
    }
  }

  private async handleStation(station: OFEVStationResponse) {
    console.log(station)
  }
}
