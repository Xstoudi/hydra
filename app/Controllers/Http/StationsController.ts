import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Measure from 'App/Models/Measure'
import Station from 'App/Models/Station'
import GetStationMeasureValidator from 'App/Validators/GetStationMeasureValidator'
import GetStationsValidator from 'App/Validators/GetStationsValidator'
import { DateTime, Duration } from 'luxon'

export default class StationsController {
  public async index({ inertia }: HttpContextContract) {
    const stations = await Station.query().withScopes((scopes) => scopes.withStats())
    return inertia.render('Stations', {
      stations: stations.map((station) => station.serialize()),
    })
  }

  public async show({ inertia, request }: HttpContextContract) {
    const station = await Station.query()
      .where('id', request.param('id'))
      .withScopes((scopes) => scopes.withStats())
      .withScopes((scopes) => scopes.withDangerLevels())
      .firstOrFail()
    return inertia.render('Station', {
      station: station.serialize(),
    })
  }

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
      .withScopes((scopes) => scopes.withDangerLevels())
      .firstOrFail()
  }

  public async measures({ request }: HttpContextContract) {
    const {
      from = DateTime.now().minus(Duration.fromObject({ week: 1 })),
      to = DateTime.now(),
      grouping = null,
    } = await request.validate(GetStationMeasureValidator)

    const query = Measure.query()
    if (grouping === null || grouping === 'none') {
      query
        .where('station_id', request.param('id'))
        .andWhereBetween('measured_at', [from.toJSDate(), to.toJSDate()])
        .orderBy('measured_at', 'asc')
    } else if (grouping === 'hour') {
      query
        .select('station_id', 'type', 'measured_at')
        .avg('value', 'value')
        .from(
          Measure.query()
            .select(
              'id',
              'station_id',
              'type',
              'value',
              Database.raw(`DATE_TRUNC('hour', measured_at) as measured_at`)
            )
            .where('station_id', request.param('id'))
            .andWhereBetween('measured_at', [from.toJSDate(), to.toJSDate()])
            .as('truncated')
        )
        .groupBy('station_id', 'type', 'measured_at')
    } else if (grouping === '6-hours') {
      query
        .select('station_id', 'type', 'measured_at')
        .avg('value', 'value')
        .from(
          Measure.query()
            .select(
              'id',
              'station_id',
              'type',
              'value',
              Database.raw(
                `DATE_TRUNC('day', measured_at) + FLOOR(EXTRACT(hour from measured_at) / 6.0) * 6 * interval '1 hour' as measured_at`
              )
            )
            .where('station_id', request.param('id'))
            .andWhereBetween('measured_at', [from.toJSDate(), to.toJSDate()])
            .as('truncated')
        )
        .groupBy('station_id', 'type', 'measured_at')
    } else if (grouping === '12-hours') {
      query
        .select('station_id', 'type', 'measured_at')
        .avg('value', 'value')
        .from(
          Measure.query()
            .select(
              'id',
              'station_id',
              'type',
              'value',
              Database.raw(
                `DATE_TRUNC('day', measured_at) + FLOOR(EXTRACT(hour from measured_at) / 12.0) * 12 * interval '1 hour' as measured_at`
              )
            )
            .where('station_id', request.param('id'))
            .andWhereBetween('measured_at', [from.toJSDate(), to.toJSDate()])
            .as('truncated')
        )
        .groupBy('station_id', 'type', 'measured_at')
    } else if (grouping === 'day') {
      query
        .select('station_id', 'type', 'measured_at')
        .avg('value', 'value')
        .from(
          Measure.query()
            .select(
              'id',
              'station_id',
              'type',
              'value',
              Database.raw(`DATE_TRUNC('day', measured_at) as measured_at`)
            )
            .where('station_id', request.param('id'))
            .andWhereBetween('measured_at', [from.toJSDate(), to.toJSDate()])
            .as('truncated')
        )
        .groupBy('station_id', 'type', 'measured_at')
    }

    return query
  }
}
