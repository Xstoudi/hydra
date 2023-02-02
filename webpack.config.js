const { join } = require('path')
const Encore = require('@symfony/webpack-encore')

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore.setOutputPath('./public/assets')
Encore.setPublicPath('/assets')

Encore.addEntry('app', './resources/js/app.tsx')

Encore.copyFiles({
  from: './resources/image',
  to: 'image/[path][name].[hash:8].[ext]',
})

Encore.copyFiles({
  from: './resources/locale',
  to: 'locale/[path][name].[hash:8].[ext]',
})

Encore.disableSingleRuntimeChunk()
Encore.cleanupOutputBeforeBuild()
Encore.enableSourceMaps(!Encore.isProduction())
Encore.enableVersioning(Encore.isProduction())

Encore.configureDevServerOptions((options) => {
  if (!options.static) {
    options.static = []
  } else if (!Array.isArray(options.static)) {
    options.static = [options.static]
  }

  options.liveReload = true
  options.static.push({
    directory: join(__dirname, './resources/views'),
    watch: true,
  })
})

Encore.enablePostCssLoader()
Encore.enableTypeScriptLoader()
Encore.enableReactPreset()

const config = Encore.getWebpackConfig()
config.infrastructureLogging = {
  level: 'warn',
}
config.stats = 'errors-warnings'

module.exports = config
