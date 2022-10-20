import produce from 'immer'
import { SET_ALL_ITEMS, RESET_ALL_ITEMS, SET_ALL_PRODUCTS } from './constants'

// The initial state of the App
export const initialState = {
  Items: [],
  fetched: false,
  Products: [],
  loadingProduct: false,
}

/* eslint-disable default-case, no-param-reassign */
const newArrivalsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ALL_ITEMS:
        draft.Items = action.items
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

      default:
        break
    }
  })

export default newArrivalsReducer
