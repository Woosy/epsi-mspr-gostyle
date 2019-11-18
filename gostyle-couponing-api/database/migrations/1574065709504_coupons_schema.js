'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponsSchema extends Schema {
  up () {
    this.create('coupons', (table) => {
      table.increments()
      table.uuid('code')
      table.string('value')
      table.dateTime('end').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down () {
    this.drop('coupons')
  }
}

module.exports = CouponsSchema
