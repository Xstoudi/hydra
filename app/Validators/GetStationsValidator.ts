import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetStationsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lat: schema.number.optional([rules.requiredIfExists('lon'), rules.range(-90, 90)]),
    lon: schema.number.optional([rules.requiredIfExists('lat'), rules.range(-180, 180)]),
    page: schema.number.optional([]),
  })

  public messages: CustomMessages = {}
}
