import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetStationsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lat: schema.number.optional([rules.requiredIfExists('lon'), rules.range(-90, 90)]),
    lon: schema.number.optional([rules.requiredIfExists('lat'), rules.range(-180, 180)]),
    page: schema.number.optional([]), // TODO: remove if not needed
  })

  public messages: CustomMessages = {
    'lat.requiredIfExists': 'stations:errors.validation.required',
    'lon.requiredIfExists': 'stations:errors.validation.required',
    'lat.range': 'stations:errors.validation.lat-range',
    'lon.range': 'stations:errors.validation.lon-range',
  }
}
