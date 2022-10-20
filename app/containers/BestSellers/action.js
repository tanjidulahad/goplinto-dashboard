import {
  GET_ALL_ITEMS,
  DELETE_ITEM,
  SET_ALL_ITEMS,
  REMOVE_BEST_SELLER,
  ADD_ITEM_BEST_SELLER,
  RESET_ALL_ITEMS,
  SET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS,
  SET_LOADING_PRODUCTS,
  GET_WIDGET_STATUS,
  SET_WIDGET_STATUS,
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

export const removeBestSeller = (storeId, widgetId) => ({
  type: REMOVE_BEST_SELLER,
  storeId,
  widgetId,
})

export const addItemsToBestSeller = (storeId, itemIds) => ({
  type: ADD_ITEM_BEST_SELLER,
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

export const getWidgetStatusForBS = storeId => ({
  type: GET_WIDGET_STATUS,
  storeId,
})

export const setWidgetStatusForBS = boolean => ({
  type: SET_WIDGET_STATUS,
  boolean,
})
