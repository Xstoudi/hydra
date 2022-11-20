import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class DangerLevel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stationId: number

  @column()
  public min: number

  @column()
  public max: number | null

  @column()
  public measureType: 'level' | 'discharge' | 'temperature'

  @column()
  public type: 'dl1' | 'dl2' | 'dl3' | 'dl4' | 'dl5'

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
