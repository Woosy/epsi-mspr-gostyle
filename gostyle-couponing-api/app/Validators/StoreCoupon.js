'use strict'

const { formatters } = use('Validator')

class StoreCoupon {
  get formatter () {
    return formatters.JsonApi
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      value: 'required|unique:coupons,value',
      discount: 'required|integer|min:1|max:100'
    }
  }

  // get messages () {
  //   return {
  //     'discount.required': 'You must provide a discount value.',
  //   }
  // }
}

module.exports = StoreCoupon
