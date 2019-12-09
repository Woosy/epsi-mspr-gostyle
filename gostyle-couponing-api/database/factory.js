'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const moment = use('moment')
const Factory = use('Factory')

Factory.blueprint('App/Models/Coupon', async (faker) => {
  return {
    code: faker.guid(),
    value: faker.word(),
    discount: faker.integer({ min: 1, max: 99 }),
    end: moment(faker.date({ year: 2020 })).add(4, 'days').format('YYYY-MM-DD HH:mm:ss')
  }
})
