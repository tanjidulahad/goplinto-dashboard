import {
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  GET_TOTAL_NOTIFICATIONS,
  SET_TOTAL_NOTIFICATIONS,
  RESET_NOTIFICATIONS,
  SET_PAGE_INDEX,
  DELETE_NOTIFICATION,
  DELETE_NOTIFICATION_IN_DB,
  SET_LOADING,
} from './constants'

export const setLoading = val => ({
  type: SET_LOADING,
  val,
})

export const resetNotifications = () => ({
  type: RESET_NOTIFICATIONS,
})

export const deleteNotificationInDB = (storeId, id) => ({
  type: DELETE_NOTIFICATION_IN_DB,
  storeId,
  id,
})

export const deleteNotification = id => ({
  type: DELETE_NOTIFICATION,
  id,
})

export const getTotalNotifications = storeId => ({
  type: GET_TOTAL_NOTIFICATIONS,
  storeId,
})

export const setTotalNotifications = count => ({
  type: SET_TOTAL_NOTIFICATIONS,
  count,
})

export const setPageIndex = pageNum => ({
  type: SET_PAGE_INDEX,
  pageNum,
})

export const getNotifications = (storeId, pageNum) => ({
  type: GET_NOTIFICATIONS,
  storeId,
  pageNum,
})

export const setNotifications = notifications => ({
  type: SET_NOTIFICATIONS,
  notifications,
})
