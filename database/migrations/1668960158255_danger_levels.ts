import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'danger_levels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('station_id')
        .unsigned()
        .references('id')
        .inTable('stations')
        .onDelete('CASCADE')

      table.double('min').notNullable()
      table.double('max').nullable()
      table.enum('measure_type', ['level', 'discharge', 'temperature']).notNullable()
      table.enum('type', ['dl1', 'dl2', 'dl3', 'dl4', 'dl5']).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.index(['measure_type', 'type', 'station_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
