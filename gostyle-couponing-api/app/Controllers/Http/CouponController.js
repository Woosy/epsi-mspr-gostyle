'use strict'

const Coupon = use('App/Models/Coupon')

class CouponController {

  /**
   * Retrieves EVERY coupon from the database
   */
  async getAll({}) {
    const coupons = {} 
    coupons.coupons = await Coupon.all()
    return coupons
  }

  /**
   * Retrieves the coupon for a given code
   */
  async getByCode({ params }) {
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
    let coupon = await Coupon.create(couponData)
    coupon = await Coupon.findBy('id', coupon.id)
    return response.status(201).send({ coupon })
  }

}

module.exports = CouponController
