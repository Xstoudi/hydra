import { BaseCommand } from '@adonisjs/core/build/standalone'
import Execa from 'App/Utils/Execa'
import fs from 'fs-extra'
import path from 'path'

export default class AppBuild extends BaseCommand {
  public static commandName = 'app:build'

  public static description = 'Unified Adonis & Vite build'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  public async run() {
    const targetDir = path.resolve('./public/assets')
    await fs.remove(targetDir)

    await Execa.execute('npm', ['run', 'build:vite'])

    await fs.move(path.resolve('./ui/dist/assets'), targetDir)

    await fs.move(
      path.resolve('./ui/dist/manifest.json'),
      path.resolve('./public/assets/manifest.json')
    )

    await Execa.execute('npm', ['run', 'build:adonis'])

    await fs.remove(targetDir)
    await fs.remove(path.resolve('./ui/dist'))
  }
}
