import produce from 'immer'
import {
  SET_CATEGORIES,
  SET_PAGINATION_PRODUCT,
  SET_EMPTY_PRODUCT,
  SET_PAGINATION_COUNT,
  SET_LOADING,
  RESET_PRODUCTS,
} from './constants'
// The initial state of the App
export const initialState = {
  creating: '',
  categories: [],
  products: [],
  count: 0,
  loading: false,
}

/* eslint-disable default-case, no-param-reassign */
const CreateCouponsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PAGINATION_COUNT:
        draft.count = action.count
        break
      case SET_LOADING:
        draft.loading = action.boolean
        break
      case SET_CATEGORIES:
        draft.categories = action.categories
        break
      case RESET_PRODUCTS:
        draft.products = []
        break
      case SET_PAGINATION_PRODUCT:
        const nextItemList = [...action.items]
        draft.products = nextItemList
        break
      default:
        break
    }
  })

export default CreateCouponsReducer
