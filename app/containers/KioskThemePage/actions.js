import {
  INIT_DISPLAY_SETTINGS,
  LOAD_DISPLAY_SETTINGS,
  UPLOAD_LOGO_IMG,
  SET_LOGO_IMG,
  UPLOAD_COVER_IMG,
  SET_COVER_IMG,
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_LAYOUT,
  UPDATE_KIOSK_THEME,
  SET_ERROR,
  SET_FLAG,
} from './constants'

export const initSettings = storeId => ({
  type: INIT_DISPLAY_SETTINGS,
  storeId,
})

export const loadSettings = data => ({
  type: LOAD_DISPLAY_SETTINGS,
  settings: data,
})

export const uploadLogoImg = (imgFile, storeId) => ({
  type: UPLOAD_LOGO_IMG,
  imgFile,
  storeId,
})

export const setLogo = key => ({
  type: SET_LOGO_IMG,
  key,
})

export const uploadCoverPic = (imgFile, storeId) => ({
  type: UPLOAD_COVER_IMG,
  imgFile,
  storeId,
})

export const setCoverPic = key => ({
  type: SET_COVER_IMG,
  key,
})

export const setPrimaryColor = color => ({
  type: SET_PRIMARY_COLOR,
  color,
})

export const setSecondaryColor = color => ({
  type: SET_SECONDARY_COLOR,
  color,
})

export const setLayout = layout => ({
  type: SET_LAYOUT,
  layout,
})

export const setError = val => ({ type: SET_ERROR, value: val })

export const setFlag = val => ({ type: SET_FLAG, value: val })

export const updateKioskTheme = (themeData, storeId, merchantId) => ({
  type: UPDATE_KIOSK_THEME,
  themeData,
  storeId,
  merchantId,
})
