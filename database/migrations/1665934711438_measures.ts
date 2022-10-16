import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'measures'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('station_id')
        .unsigned()
        .references('id')
        .inTable('stations')
        .onDelete('CASCADE')

      table.enum('type', ['level', 'discharge', 'temperature']).notNullable()
      table.double('value').notNullable()

      table.timestamp('measured_at', { useTz: true }).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
