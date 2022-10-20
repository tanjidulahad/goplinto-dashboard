import produce from 'immer'
import { SET_ALL_ITEMS, RESET_ALL_ITEMS, SET_ALL_PRODUCTS, SET_WIDGET_STATUS } from './constants'

// The initial state of the App
export const initialState = {
  Items: [],
  fetched: false,
  Products: [],
  loadingProduct: false,
  showBestSeller: true,
}

/* eslint-disable default-case, no-param-reassign */
const bestSellerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ALL_ITEMS:
        draft.Items = [...action.items]
        draft.fetched = true
        break

      case RESET_ALL_ITEMS:
        draft.Items = []
        draft.fetched = false
        break

      case SET_ALL_PRODUCTS:
        const nextItemList = [...action.items]
        draft.Products = nextItemList
        draft.loadingProduct = true
        break

      case SET_WIDGET_STATUS:
        draft.showBestSeller = action.boolean
        break

      default:
        break
    }
  })

export default bestSellerReducer
