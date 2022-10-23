import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import loadAssets from 'App/Utils/AssetsLoader'
import path from 'path'

const isDevEnv = Env.get('NODE_ENV') === 'development'

Route.group(() => {
  Route.get('/stations', 'StationsController.stations').as('stations')
  Route.get('/stations/:id', 'StationsController.station').as('station')
  Route.get('/stations/:id/measures', 'StationsController.measures').as('measures')
})
  .prefix('/api')
  .where('id', Route.matchers.number())

if (isDevEnv) {
  Route.get('/src/*', async ({ request, response }) => {
    const file = path.resolve(`./ui/${request.url()}`)
    response.attachment(file, path.basename(file), 'inline')
  })
}

Route.get('*', async ({ view }) => {
  const assetsData = await loadAssets()
  return view.render('index', {
    isDev: !assetsData.found && isDevEnv,
    assetsData,
  })
})
