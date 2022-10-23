import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetStationMeasureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    from: schema.date.optional(),
    to: schema.date.optional(),
  })

  public messages: CustomMessages = {}
}
