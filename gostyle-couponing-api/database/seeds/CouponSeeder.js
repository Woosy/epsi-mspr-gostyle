'use strict'

/*
|--------------------------------------------------------------------------
| CouponSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CouponSeeder {
  async run () {
    await Factory
      .model('App/Models/Coupon')
      .createMany(3)
  }
}

module.exports = CouponSeeder
