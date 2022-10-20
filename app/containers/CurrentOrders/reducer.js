import produce from 'immer'
import enums from 'utils/orderStatusEnums'
import {
  SET_CURRENT_ORDERS, SET_LOADING, UPDATE_CURRENT_ORDERS, SET_OUT_FOR_DELIVERY_ORDERS,
  SET_PREPARING_ORDERS,
  SET_NEW_ORDERS,
  UPDATE_OUT_FOR_DELIVERY_ORDERS,
  UPDATE_NEW_ORDERS,
  UPDATE_PREPARING_ORDERS,
  HAS_MORE,
  SET_SHOW_LOADER_CARD,
} from './constants'

// The initial state of the App
export const initialState = {
  allOrders: [],
  newOrders: [],
  prepOrders: [],
  outForDeliveryOrders: [],
  loading: false,
  hasMore: true,
  loaderCard:false,
}

/* eslint-disable default-case, no-param-reassign */
const currentOrdersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_OUT_FOR_DELIVERY_ORDERS:
        draft.outForDeliveryOrders = action.orders
        break
      case SET_NEW_ORDERS:
        draft.newOrders = action.orders
        break
      case SET_PREPARING_ORDERS:
        draft.prepOrders = action.orders
        break
      case UPDATE_OUT_FOR_DELIVERY_ORDERS:
        draft.outForDeliveryOrders = [...draft.outForDeliveryOrders, ...action.orders]
        break
      case UPDATE_NEW_ORDERS:
        draft.newOrders = [...draft.newOrders, ...action.orders]
        break
      case UPDATE_PREPARING_ORDERS:
        draft.prepOrders = [...draft.prepOrders, ...action.orders]
        break

      case HAS_MORE:
        draft.hasMore = action.boolean
        break
      case SET_LOADING:
        draft.loading = action.boolean
        break   
      case SET_SHOW_LOADER_CARD:
        draft.loaderCard = action.boolean
        break
      default:
    }
  })

export default currentOrdersReducer
