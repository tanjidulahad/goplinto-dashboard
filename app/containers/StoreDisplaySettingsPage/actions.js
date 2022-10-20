import {
  GET_DISPLAY_SETTINGS,
  SET_LAYOUT,
  UPLOAD_LOGO_IMG,
  UPLOAD_COVER_PIC,
  LOAD_COVER_PIC,
  LOAD_LOGO_IMG,
  SUBMIT_DISPLAY_SETTINGS,
  SET_FAV_ICON,
  SET_SECONDARY_COLOR,
  SET_TERTIARY_COLOR,
  LOAD_FAV_ICON,
  UPLOAD_FAV_ICON,
} from './constants'

export const getDisplaySettings = storeId => ({
  type: GET_DISPLAY_SETTINGS,
  storeId,
})

export const setLayout = value => ({
  type: SET_LAYOUT,
  value,
})

export const uploadLogoImg = (imgFile, storeId) => ({
  type: UPLOAD_LOGO_IMG,
  imgFile,
  storeId,
})
export const uploadFavIcon = (imgFile, storeId) => ({
  type: UPLOAD_FAV_ICON,
  imgFile,
  storeId,
})

export const loadLogo = key => ({
  type: LOAD_LOGO_IMG,
  key,
})
export const loadFavIcon = key => ({
  type: LOAD_FAV_ICON,
  key,
})

export const uploadCoverPic = (imgFile, storeId) => ({
  type: UPLOAD_COVER_PIC,
  imgFile,
  storeId,
})

export const loadCoverPic = key => ({
  type: LOAD_COVER_PIC,
  key,
})

export const submitDisplaySettings = (merchantId, storeId, displayData) => ({
  type: SUBMIT_DISPLAY_SETTINGS,
  storeId,
  merchantId,
  displayData,
})

export const setSecondaryColor = (value) => ({
  type: SET_SECONDARY_COLOR,
  value
})
export const setTertiaryColor = (value) => ({
  type: SET_TERTIARY_COLOR,
  value
})
export const setFavIcon = (value) => ({
  type: SET_FAV_ICON,
  value
})
