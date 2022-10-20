import produce from 'immer'
import { SET_MERCHANT_ADDRESS_ID, SET_PAGEINDEX, SET_STORE_MODULES } from './constants'

// The initial state of the App
export const initialState = {
  merchantAddressId: null,
  storeModules: {},
  pageIndex:0,
}

/* eslint-disable default-case, no-param-reassign */
const checkoutPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_MERCHANT_ADDRESS_ID:
        draft.merchantAddressId = action.merchantAddressId
        break
      case SET_STORE_MODULES:
        draft.storeModules = action.storeModules
        break   
      case SET_PAGEINDEX:
        draft.pageIndex = action.pageIndex
        break
      default:
    }
  })

export default checkoutPageReducer
