import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Measure from 'App/Models/Measure'
import Station from 'App/Models/Station'
import GetStationMeasureValidator from 'App/Validators/GetStationMeasureValidator'
import GetStationsValidator from 'App/Validators/GetStationsValidator'
import { DateTime, Duration } from 'luxon'

export default class StationsController {
  public async stations({ request }: HttpContextContract) {
    const { lat, lon } = await request.validate(GetStationsValidator)

    const query =
      lat !== undefined && lon !== undefined
        ? Station.query().withScopes((scopes) => scopes.byDistance(lat, lon))
        : Station.query()

    query.withScopes((scopes) => scopes.withStats())

    return query
  }

  public async station({ request }: HttpContextContract) {
    return Station.query()
      .where('id', request.param('id'))
      .withScopes((scopes) => scopes.withStats())
      .firstOrFail()
  }

  public async measures({ request }: HttpContextContract) {
    const { from = DateTime.now().minus(Duration.fromObject({ week: 1 })), to = DateTime.now() } =
      await request.validate(GetStationMeasureValidator)

    return Measure.query()
      .where('station_id', request.param('id'))
      .andWhereBetween('measured_at', [from.toJSDate(), to.toJSDate()])
  }
}
