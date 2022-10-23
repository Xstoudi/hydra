import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'measures_fk_indices'

  public async up() {
    this.schema.table('measures', (table) => {
      table.index(['station_id', 'measured_at'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
