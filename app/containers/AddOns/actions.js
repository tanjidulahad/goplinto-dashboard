import {
  LIST_ALL_WIDGETS,
  SET_WIDGET_STATUS,
  SET_ALL_WIDGETS,
  SET_SHOW_WIDGET_BEST_SELLER,
  SET_SHOW_WIDGET_NEW_ARRIVAL,
} from './constants'

export const listAllActiveWidgets = () => ({
  type: LIST_ALL_WIDGETS,
})

export const setWidgetStatus = (storeId, widgetId, widgetStatus, merchantId) => ({
  type: SET_WIDGET_STATUS,
  storeId,
  widgetId,
  widgetStatus,
  merchantId,
})

export const setAllWidgets = widgets => ({
  type: SET_ALL_WIDGETS,
  widgets,
})

export const setWidgetStatusReducer = (widgetStatus, bestSeller) => ({
  type: SET_SHOW_WIDGET_BEST_SELLER,
  widgetStatus,
  bestSeller,
})

export const setShowWidgetNewArrival = (widgetStatus, newArrival) => ({
  type: SET_SHOW_WIDGET_NEW_ARRIVAL,
  widgetStatus,
  newArrival,
})

export const getWidgetStatusBestSeller = storeId => ({
  type: GET_WIDGET_STATUS_BEST_SELLER,
  storeId,
})

