import produce from 'immer'
import {
  LOAD_ANDROID_TRAY_ICON,
  LOAD_IOS_TRAY_ICON,
  LOAD_SPLASH_SCREEN_LOGO,
  SET_SPLASH_SCREEN_LOGO,
  SET_ANDROID_TRAY_ICON,
  SET_IOS_TRAY_ICON,
  SET_ERROR,
  SET_FLAG,
} from './constants'

// The initial state of the App
export const initialState = {
  splashScreenLogo: '',
  androidTrayIcon: '',
  iosTrayIcon: '',
  error: false,
  flag: false,
}

/* eslint-disable default-case, no-param-reassign */
const mobileSettingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_SPLASH_SCREEN_LOGO:
        draft.splashScreenLogo = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break
      case LOAD_ANDROID_TRAY_ICON:
        draft.androidTrayIcon = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break
      case LOAD_IOS_TRAY_ICON:
        draft.iosTrayIcon = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break
      case SET_SPLASH_SCREEN_LOGO:
        draft.splashScreenLogo = action.value
        break
      case SET_ANDROID_TRAY_ICON:
        draft.androidTrayIcon = action.value
        break
      case SET_IOS_TRAY_ICON:
        draft.iosTrayIcon = action.value
        break
      case SET_ERROR:
        draft.error = action.boolean
        break
      case SET_FLAG:
        draft.flag = action.value
        break
      default:
    }
  })

export default mobileSettingsReducer
