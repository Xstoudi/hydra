import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/stations', 'StationsController.stations').as('stations')
  Route.get('/stations/:id', 'StationsController.station').as('station')
  Route.get('/stations/:id/measures', 'StationsController.measures').as('measures')
})
  .prefix('/api')
  .where('id', Route.matchers.number())
