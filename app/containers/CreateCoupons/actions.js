import { SET_LOADING } from 'containers/StoreSeo/constants'
import {
  RESET_DATA,
  GET_CATEGORIES,
  SET_CATEGORIES,
  GET_PAGINATION_PRODUCT,
  SET_PAGINATION_PRODUCT,
  SET_EMPTY_PRODUCT,
  GET_PAGINATION_COUNT,
  SET_PAGINATION_COUNT,
  RESET_PRODUCTS,
} from './constants'

export const resetData = () => ({
  type: RESET_DATA,
})

export const getCategories = storeId => ({
  type: GET_CATEGORIES,
  storeId,
})

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories,
})

export const getPaginationProduct = (storeId, pageNum) => ({
  type: GET_PAGINATION_PRODUCT,
  storeId,
  pageNum,
})

export const setPaginationProduct = items => ({
  type: SET_PAGINATION_PRODUCT,
  items,
})

export const getPaginationCount = storeId => ({
  type: GET_PAGINATION_COUNT,
  storeId,
})

export const setPaginationCount = count => ({
  type: SET_PAGINATION_COUNT,
  count,
})

export const emptyProduct = () => ({
  type: SET_EMPTY_PRODUCT,
})
export const setLoading = boolean => ({
  type: SET_LOADING,
  boolean,
})
export const resetProducts = (products) => ({
  type: RESET_PRODUCTS,
  products,
})
