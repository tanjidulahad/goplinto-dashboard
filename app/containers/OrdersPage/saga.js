import { call, put, takeLatest } from 'redux-saga/effects'
import request from 'utils/request'
import { setOrder, showOrder } from './actions'
import { READ_ORDER } from './constants'

const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

const concatAddress = address => {
  let concatenatedAddress = ''
  for (const [key, value] of Object.entries(address)) {
    if (key === 'city' && address['zip_code']) {
      concatenatedAddress += value + ' - '
      continue
    }
    if (value) concatenatedAddress += value + ', '
  }
  return concatenatedAddress.slice(0, -2)
}

function* readOrder({ orderId }) {
  try {
    const orderDetails = yield call(request, `${BASE_URL}manage-orders/read-order&orderId=${orderId}`, {})
    let orderPlacedType
    let address = null
    if (
      (orderDetails.isDelivery === 'Y' && orderDetails.isParcel === 'Y') ||
      (orderDetails.isDelivery === 'Y' && orderDetails.isParcel === 'N')
    ) {
      orderPlacedType = 'Delivery'
      const { address_line_1, address_line_2, state, city, country, zip_code } = orderDetails.deliveryAddressDetails
      address = concatAddress({ address_line_1, address_line_2, city, zip_code, state, country })
    } else if (orderDetails.isDelivery === 'N' && orderDetails.isParcel === 'Y') {
      orderPlacedType = 'Pickup'
    } else if (orderDetails.isDelivery === 'N' && orderDetails.isParcel === 'N') {
      orderPlacedType = 'Dine In'
    }
    yield put(setOrder({ ...orderDetails, orderPlacedType, address }))
    yield put(showOrder(true))
  } catch (e) {
    console.log({ e })
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* pastOrdersSaga() {
  yield takeLatest(READ_ORDER, readOrder)
}
