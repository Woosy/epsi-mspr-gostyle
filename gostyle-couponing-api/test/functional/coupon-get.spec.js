'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Coupon Get')

trait('Test/ApiClient')

// ===============================================================
// == GET /coupons/:code =========================================
// ===============================================================

test('should be able to get a coupon', async ({ client }) => {
  const coupon = await Factory.model('App/Models/Coupon').create()

  const response = await client
    .get(`/coupons/${coupon.code}`)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    coupon: coupon.value,
    discount: coupon.discount
  })
})

test('should throw error coupon not found', async ({ client }) => {
  const response = await client
    .get('/coupons/invalid_code')
    .end()

  response.assertStatus(404)
})
