import { BaseCommand } from '@adonisjs/core/build/standalone'
import Execa from 'App/Utils/Execa'

export default class AppDev extends BaseCommand {
  public static commandName = 'app:dev'
  public static description = 'Unified Adonis & Vite dev mode'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    this.logger.info('Starting servers')

    const adonisDev = Execa.execute('npm', ['run', 'dev:adonis'])
    const viteDev = Execa.execute('npm', ['run', 'dev:vite'])

    await Promise.all([adonisDev, viteDev])
  }
}
