const { join } = require('path')
const Encore = require('@symfony/webpack-encore')

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev')
}

Encore.setOutputPath('./build/inertia/ssr')
Encore.setPublicPath('/ssr')

Encore.addEntry('ssr', './resources/js/ssr.tsx')

Encore.disableSingleRuntimeChunk()
Encore.cleanupOutputBeforeBuild()
Encore.enableVersioning(Encore.isProduction())

Encore.configureDevServerOptions((options) => {
  if (!options.static) {
    options.static = []
  } else if (!Array.isArray(options.static)) {
    options.static = [options.static]
  }

  options.liveReload = true
  options.static.push({
    directory: join(__dirname, './resources/js/pages'),
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

config.externals = [require('webpack-node-externals')()]
config.externalsPresets = { node: true }
config.output = {
  libraryTarget: 'commonjs2',
  filename: 'ssr.js',
  path: join(__dirname, './build/inertia/ssr'),
  publicPath: process.env.NODE_ENV === 'production' ? '/assets' : 'http://localhost:8080/assets/',
}
config.experiments = { outputModule: true }

module.exports = config
