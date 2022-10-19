import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Station from 'App/Models/Station'
import GetStationsValidator from 'App/Validators/GetStationsValidator'

export default class StationsController {
  public async stations({ request }: HttpContextContract) {
    const { lat, lon } = await request.validate(GetStationsValidator)

    const query =
      lat !== undefined && lon !== undefined ? Station.allByDistance(lat, lon) : Station.query()

    return query
  }
  public async station({ response }: HttpContextContract) {
    return response.notImplemented()
  }
  public async measures({ response }: HttpContextContract) {
    return response.notImplemented()
  }
}
