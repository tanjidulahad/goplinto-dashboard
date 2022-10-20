import produce from 'immer'
import { SET_LAYOUT, LOAD_LOGO_IMG, LOAD_COVER_PIC, SET_SECONDARY_COLOR, SET_TERTIARY_COLOR, SET_FAV_ICON, LOAD_FAV_ICON } from './constants'

// The initial state of the App
export const initialState = {
  logoImgUrl: '',
  coverImageUrl: '',
  primaryColor: '',
  layout: '',
  SecondaryColor: '',
  TertiaryColor: '',
  FavIcon:'',
}

/* eslint-disable default-case, no-param-reassign */
const DisplaySettingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LAYOUT:
        draft.layout = action.value
        break

      case LOAD_LOGO_IMG:
        draft.logoImgUrl = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break
      case LOAD_FAV_ICON:
        draft.FavIcon = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break

      case LOAD_COVER_PIC:
        draft.coverImageUrl = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break


      case SET_SECONDARY_COLOR:
        draft.SecondaryColor = action.value
        break

      case SET_TERTIARY_COLOR:
        draft.TertiaryColor = action.value
        break
        
      case SET_FAV_ICON:
        draft.FavIcon = action.value
        break
      default:
    }
  })

export default DisplaySettingsReducer
