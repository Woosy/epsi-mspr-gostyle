'use strict'

const Schema = use('Schema')

class CouponsSchema extends Schema {
  async up () {
    await this.db.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    this.create('coupons', (table) => {
      table.increments()
      table.string('code').unique().index().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('value').notNullable()
      table.integer('discount').notNullable()
      table.dateTime('end').nullable().defaultTo(null)
      table.timestamps()
    })
  }

  down () {
    this.drop('coupons')
  }
}

module.exports = CouponsSchema
