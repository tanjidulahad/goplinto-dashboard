import produce from 'immer'
import orderStatusEnums from 'utils/orderStatusEnums'
import { SET_PAST_ORDERS, SET_CANCELLED_ORDERS, SET_DELIVERED_ORDERS, SET_HAS_MORE } from './constants'
import { SET_ERROR, SET_ERROR_MESSAGE } from "../Reports/constants"

// The initial state of the App
export const initialState = {
  allPastOrders: [],
  deliveredOrders: [],
  cancelledOrders: [],
  hasMore: true,
  error: '',
  errorMessage: '',
}

/* eslint-disable default-case, no-param-reassign */
const pastOrdersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_DELIVERED_ORDERS:
        draft.deliveredOrders = action.orders
        break
      case SET_CANCELLED_ORDERS:
        draft.cancelledOrders = action.orders
        break
      case SET_ERROR:
        draft.error = action.boolean
        break
      case SET_HAS_MORE:
        draft.hasMore = action.boolean
      case SET_ERROR_MESSAGE:
        draft.errorMessage = action.val
      default:
    }
  })

export default pastOrdersReducer
