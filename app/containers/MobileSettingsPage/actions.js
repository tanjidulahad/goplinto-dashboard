import {
  UPLOAD_SPLASH_SCREEN_LOGO,
  UPLOAD_ANDROID_TRAY_ICON,
  UPLOAD_IOS_TRAY_ICON,
  LOAD_SPLASH_SCREEN_LOGO,
  LOAD_ANDROID_TRAY_ICON,
  LOAD_IOS_TRAY_ICON,
  SET_SPLASH_SCREEN_LOGO,
  SET_ANDROID_TRAY_ICON,
  SET_IOS_TRAY_ICON,
  GET_MOBILE_APP_SETTINGS,
  SUBMIT_MOBILE_APP_SETTINGS,
  SET_ERROR,
  SET_FLAG,
} from './constants'

export const uploadSplashScreenLogo = (imgFile, storeId) => {
  return {
    type: UPLOAD_SPLASH_SCREEN_LOGO,
    imgFile,
    storeId,
  }
}

export const uploadAndroidTrayIcon = (imgFile, storeId) => {
  return {
    type: UPLOAD_ANDROID_TRAY_ICON,
    imgFile,
    storeId,
  }
}

export const uploadIOSTrayIcon = (imgFile, storeId) => {
  return {
    type: UPLOAD_IOS_TRAY_ICON,
    imgFile,
    storeId,
  }
}

export const loadSplashScreenLogo = key => ({
  type: LOAD_SPLASH_SCREEN_LOGO,
  key,
})
export const loadAndroidTrayIcon = key => ({
  type: LOAD_ANDROID_TRAY_ICON,
  key,
})
export const loadIOSTrayIcon = key => ({
  type: LOAD_IOS_TRAY_ICON,
  key,
})

export const setSplashScreenLogo = ({ value }) => ({
  type: SET_SPLASH_SCREEN_LOGO,
  value,
})
export const setAndroidTrayIcon = ({ value }) => ({
  type: SET_ANDROID_TRAY_ICON,
  value,
})
export const setIOSTrayIcon = ({ value }) => ({
  type: SET_IOS_TRAY_ICON,
  value,
})

export const getMobileAppSettings = ({ storeId }) => ({
  type: GET_MOBILE_APP_SETTINGS,
  storeId,
})

export const submitMobileAppSettings = ({ storeId, merchantId, splashScreenLogo, androidTrayIcon, iosTrayIcon }) => ({
  type: SUBMIT_MOBILE_APP_SETTINGS,
  storeId,
  merchantId,
  splashScreenLogo,
  androidTrayIcon,
  iosTrayIcon,
})

export const setError = ({ boolean }) => ({
  type: SET_ERROR,
  boolean,
})

export const setFlag = ({ value }) => ({
  type: SET_FLAG,
  value,
})
