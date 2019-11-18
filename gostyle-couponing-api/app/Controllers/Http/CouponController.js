'use strict'

const Coupon = use('App/Models/Coupon')
const ModelNotFoundException = use('App/Exceptions/ModelNotFoundException')

class CouponController {

  /**
   * Retrieves the coupon for a given code
   */
  async getByCode({ params }) {
    const coupon = await Coupon.findBy('code', params.code)
    if (!coupon) throw new ModelNotFoundException('Aucun coupon correspondant')

    return {
      coupon: coupon.value,
      discount: coupon.discount
    }
  }

}

module.exports = CouponController
