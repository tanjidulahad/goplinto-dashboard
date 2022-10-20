import produce from 'immer'
import {
  CHANGE_REST_NAME,
  APPLY_PRIMARY_COLOR,
  TOGGLE_PREVIEW_STATE,
  LOAD_LOGO_IMG,
  LOAD_COVER_PIC,
  CHANGE_ITEM_SECTION_LAYOUT,
} from './constants'

export const initialState = {
  preview: false,
  resName: '',
  restLogoUrl: '',
  coverImgUrl: 'https://via.placeholder.com/1600x800/000000/000000/',
  theme: {
    primary_color: '#000',
  },
  layout: 'grid',
}

/* eslint-disable default-case, no-param-reassign */
const customizePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_REST_NAME:
        draft.resName = action.resName.replace(/@/gi, '')
        break
      case APPLY_PRIMARY_COLOR:
        draft.theme.primary_color = action.primaryColor ? `#${action.primaryColor.replace(/#/gi, '')}` : '#0e0e0e'
        break
      case TOGGLE_PREVIEW_STATE:
        draft.preview = !draft.preview
        break
      case LOAD_LOGO_IMG:
        draft.restLogoUrl = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break
      case LOAD_COVER_PIC:
        draft.coverImgUrl = `https://dsa0i94r8ef09.cloudfront.net/${action.key}`
        break
      case CHANGE_ITEM_SECTION_LAYOUT:
        draft.layout = action.chosenLayout
    }
  })

export default customizePageReducer
