import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Station from './Station'

export default class Measure extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stationId: number

  @column()
  public type: 'level' | 'discharge' | 'temperature'

  @column()
  public value: number

  @column.dateTime()
  public measuredAt: DateTime

  @hasOne(() => Station)
  public station: HasOne<typeof Station>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
