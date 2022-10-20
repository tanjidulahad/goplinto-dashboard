import {
  CREATE_NOTIFICATION_STATUS,
  CREATE_NOTIFICATION_ERROR,
  CREATE_NOTIFICATION,
  START_UPLOAD_IMAGE,
  SET_UPLOADED_IMAGE,
  RESET_DATA,
  SET_IMAGE,
} from './constants'

export const resetData = () => ({
  type: RESET_DATA,
})

export const createNotificationStatus = val => ({
  type: CREATE_NOTIFICATION_STATUS,
  val,
})

export const setCreateNotificationError = val => ({
  type: CREATE_NOTIFICATION_ERROR,
  val,
})

export const startUploadImage = (imgFile, storeId) => ({
  type: START_UPLOAD_IMAGE,
  storeId,
  imgFile,
})

export const setUploadedImage = key => ({
  type: SET_UPLOADED_IMAGE,
  key,
})

export const setImage = imageUrl => ({
  type: SET_IMAGE,
  imageUrl,
})

export const createNotification = (storeId, merchantId, data) => ({
  type: CREATE_NOTIFICATION,
  storeId,
  merchantId,
  data,
})
