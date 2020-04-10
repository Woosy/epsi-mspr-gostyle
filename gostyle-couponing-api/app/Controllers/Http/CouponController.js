'use strict'

const Coupon = use('App/Models/Coupon')

class CouponController {
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
}

module.exports = CouponController
