'use strict'

const Schema = use('Schema')

class CouponsSchema extends Schema {
  up () {
    this.create('coupons', (table) => {
      table.increments()
      table.string('code')
      table.string('value')
      table.integer('discount')
      table.dateTime('end').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down () {
    this.drop('coupons')
  }
}

module.exports = CouponsSchema
