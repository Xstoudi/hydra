import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeFetch,
  beforeFind,
  column,
  HasMany,
  hasMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import Database from '@ioc:Adonis/Lucid/Database'
import Measure from './Measure'

type StationQuery = ModelQueryBuilderContract<typeof Station>

export default class Station extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  /**
   * Longitude / Latitude
   */
  @column({
    prepare: (value?: GeoCoordinate) => {
      return value
        ? Database.st().geographyFromText(`POINT(${value.longitude} ${value.latitude})`)
        : value
    },
    consume: (value?: string) => {
      if (!value) {
        return value
      }

      const [longitude, latitude] = value
        .replace('POINT(', '')
        .replace(')', '')
        .split(' ')
        .map((v) => parseFloat(v))

      return { longitude, latitude }
    },
  })
  public coordinates: GeoCoordinate

  @column()
  public waterBodyName: string

  @column()
  public waterBodyType: 'river' | 'lake' | 'spring' | 'piezometer' | 'well' | 'groundwater'

  @column()
  public vendorIdentifier: string

  @hasMany(() => Measure)
  public measures: HasMany<typeof Measure>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeFind()
  @beforeFetch()
  public static async fetchCoordinates(query: StationQuery) {
    query.select(Database.raw('*, ST_AsText(coordinates) as coordinates'))
  }

  public static allByDistance(latitude: number, longitude: number) {
    return Station.query().orderByRaw(
      Database.st().distance(
        'coordinates',
        Database.st().geographyFromText(`POINT(${longitude} ${latitude})`)
      )
    )
  }
}
