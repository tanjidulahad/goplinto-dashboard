import {
  GET_ALL_ITEMS,
  DELETE_ITEM,
  SET_ALL_ITEMS,
  REMOVE_NEW_ARRIVALS,
  ADD_ITEM_NEW_ARRIVALS,
  RESET_ALL_ITEMS,
  SET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS,
  SET_LOADING_PRODUCTS,
  GET_NEW_ARRIVAL_STATUS,
} from './constants'

export const getAllItems = storeId => ({
  type: GET_ALL_ITEMS,
  storeId,
})

export const setAllItems = items => ({
  type: SET_ALL_ITEMS,
  items,
})

export const deleteItem = (itemId, storeId) => ({
  type: DELETE_ITEM,
  itemId,
  storeId,
})

export const removeNewArrivals = (storeId, widgetId) => ({
  type: REMOVE_NEW_ARRIVALS,
  storeId,
  widgetId,
})

export const addItemsToNewArrivals = (storeId, itemIds) => ({
  type: ADD_ITEM_NEW_ARRIVALS,
  storeId,
  itemIds,
})

export const resetAllItems = () => ({
  type: RESET_ALL_ITEMS,
})

export const getPaginationProduct = storeId => ({
  type: GET_ALL_PRODUCTS,
  storeId,
})
export const setPaginationProduct = items => ({
  type: SET_ALL_PRODUCTS,
  items,
})

export const setLoading = boolean => ({
  type: SET_LOADING_PRODUCTS,
  boolean,
})

export const getNewArrivalStatus = storeId => ({
  type: GET_NEW_ARRIVAL_STATUS,
  storeId,
})

