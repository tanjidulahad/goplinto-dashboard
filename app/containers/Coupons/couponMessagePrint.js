const couponMessagePrint = (coupon, storeCurrencySymbol )=> {
  var msg = ''
  let id = coupon.coupon_type_id
  if (id == 1) {
    msg = storeCurrencySymbol + coupon.coupon_attributes.discountAmount + ' off '
    if (coupon.min_order_amount != null) {
      msg = msg + '. Minimum purchase of ' + storeCurrencySymbol + coupon.min_order_amount
    }
    return msg
  }
  if (id == 2) {
    msg = 'upto ' + coupon.coupon_attributes.discountPercentage + '% off '
    if (coupon.coupon_attributes.capValue != null) {
      msg = msg + '. max ' + coupon.coupon_attributes.capValue + ' . '
    }
    if (coupon.min_order_amount != null) {
      msg = msg + 'Minimum purchase of ' + storeCurrencySymbol+ coupon.min_order_amount + ' '
    }
    return msg
  }
  if (id == 3) {
    msg = 'Free Delivery'
    if (coupon.min_order_amount != null) {
      msg = msg + ' . Minimum purchase of ' + storeCurrencySymbol + coupon.min_order_amount + ' '
    }
    return msg
  }
  if (id == 4) {
    msg = 'Buy ' + coupon.coupon_attributes.buyCount + ' Get ' + coupon.coupon_attributes.getCount
    if (coupon.min_order_amount != null) {
      msg = msg + ' . Minimum purchase of ' + storeCurrencySymbol + coupon.min_order_amount + ' '
    }
    return msg
  }
}
export default couponMessagePrint
