'use strict'

const Coupon = use('App/Models/Coupon')

class CouponController {
  /**
   * Retrieves EVERY coupon from the database
   */
  async getAll () {
    const coupons = await Coupon.all()
    return { coupons }
  }

  /**
   * Retrieves the coupon for a given code
   */
  async getByCode ({ params }) {
    const coupon = await Coupon.findByOrFail('code', params.code)

    return {
      coupon: coupon.value,
      discount: coupon.discount
    }
  }

  /**
   * Creates a new coupon (admin only)
   */
  async create ({ request, response }) {
    // save and get instance back
    const couponData = request.only(['discount', 'value', 'end'])
    const coupon = await Coupon.create(couponData)
    await coupon.reload()
    return response.status(201).send({ coupon })
  }
}

module.exports = CouponController
