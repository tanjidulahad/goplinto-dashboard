import produce from 'immer'
import {
  LOAD_DISPLAY_SETTINGS,
  SET_LAYOUT,
  SET_LOGO_IMG,
  SET_COVER_IMG,
  SET_PRIMARY_COLOR,
  SET_SECONDARY_COLOR,
  SET_ERROR,
  SET_FLAG,
} from './constants'

// The initial state of the App
export const initialState = {
  storeLogoUrl: '',
  splashScreenBackgroundUrl: '',
  primaryColor: '',
  secondaryColor: '',
  layout: '',
  updateError: false,
  flag: false,
}

/* eslint-disable default-case, no-param-reassign */
const KioskSettingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_DISPLAY_SETTINGS:
        draft.updateError = false
        draft.flag = false
        draft.storeLogoUrl = action.settings.store_logo_url
        draft.splashScreenBackgroundUrl = action.settings.splash_screen_background
        draft.primaryColor = action.settings.primary_color
        draft.secondaryColor = action.settings.secondary_color
        draft.layout = action.settings.layout
        break
      case SET_LOGO_IMG:
        const logoURL = action.key !== '' ? `https://dsa0i94r8ef09.cloudfront.net/${action.key}` : ''
        draft.storeLogoUrl = logoURL
        break
      case SET_COVER_IMG:
        const coverURL = action.key !== '' ? `https://dsa0i94r8ef09.cloudfront.net/${action.key}` : ''
        draft.splashScreenBackgroundUrl = coverURL
        break
      case SET_PRIMARY_COLOR:
        draft.primaryColor = action.color
        break
      case SET_SECONDARY_COLOR:
        draft.secondaryColor = action.color
        break
      case SET_LAYOUT:
        draft.layout = action.layout
        break
      case SET_ERROR:
        draft.updateError = action.value
        break
      case SET_FLAG:
        draft.flag = action.value
        break
      default:
    }
  })

export default KioskSettingsReducer
