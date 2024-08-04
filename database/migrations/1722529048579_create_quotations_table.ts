import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'quotations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('cascade')
      table.integer('quotation_number').unsigned().notNullable().unique()
      table.dateTime('date').notNullable()
      table.dateTime('expiration_date')
      table.decimal('amount', 10, 2).notNullable()
      table
        .enum('status', ['draft', 'sent', 'accepted', 'rejected', 'cancelled'])
        .notNullable()
        .defaultTo('draft')
      table.string('note', 255)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
