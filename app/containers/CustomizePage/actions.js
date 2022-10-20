import {
  CHANGE_ITEM_SECTION_LAYOUT,
  CHANGE_REST_NAME,
  APPLY_PRIMARY_COLOR,
  TOGGLE_PREVIEW_STATE,
  UPLOAD_LOGO_IMG,
  LOAD_LOGO_IMG,
  UPLOAD_COVER_PIC,
  LOAD_COVER_PIC,
  SAVE_CUSTOM_CONFIG,
  SAVE_DISPLAY_SETTINGS,
  SAVE_BANNER_TO_DB,
} from './constants'

export const uploadLogoImg = (imgFile, storeId) => ({
  type: UPLOAD_LOGO_IMG,
  imgFile,
  storeId,
})

export const loadLogo = key => ({
  type: LOAD_LOGO_IMG,
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

export const changeRestaurantName = resName => ({
  type: CHANGE_REST_NAME,
  resName,
})

export const savePrimaryColor = ({ primaryColor }) => ({
  type: APPLY_PRIMARY_COLOR,
  primaryColor,
})

export const togglePreviewState = () => ({
  type: TOGGLE_PREVIEW_STATE,
})

export const saveConfigToS3 = () => ({
  type: SAVE_CUSTOM_CONFIG,
})

export const changeItemLayout = ({ value }) => ({
  type: CHANGE_ITEM_SECTION_LAYOUT,
  chosenLayout: value,
})

export const saveDisplaySettings = (action, merchantId, storeId) => ({
  type: SAVE_DISPLAY_SETTINGS,
  customizedData: action,
  storeId,
  merchantId,
})

export const saveBannerToDb = (url, merchantId, storeId) => ({
  type: SAVE_BANNER_TO_DB,
  url,
  merchantId,
  storeId,
})
