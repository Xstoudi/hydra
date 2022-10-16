import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.geography('coordinates').notNullable()
      table.string('water_body_name').notNullable()
      table
        .string('water_body_type')
        .notNullable()
        .checkIn(['river', 'lake', 'spring', 'piezometer', 'well', 'groundwater'])

      table.string('vendor_identifier').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
