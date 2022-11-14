import Application from '@ioc:Adonis/Core/Application'
import Route from '@ioc:Adonis/Core/Route'
import { readFile } from 'node:fs/promises'

Route.group(() => {
  Route.get('/stations', 'StationsController.stations').as('stations')
  Route.get('/stations/:id', 'StationsController.station').as('station')
  Route.get('/stations/:id/measures', 'StationsController.measures').as('measures')
})
  .prefix('/api')
  .where('id', Route.matchers.number())

if (!Application.inDev) {
  const staticViewPromise = readFile(Application.publicPath('index.html'), 'utf-8')

  Route.get('*', () => {
    return staticViewPromise
  })
}
