import produce from 'immer'
import { SET_LOADING, SET_ERROR_MESSAGE, SET_SEO_DESC, SET_SEO_TITLE, SET_SEO_TAGS } from './constants'

// The initial state of the App
export const initialState = {
  seoTitle: '',
  seoDesc: '',
  seoTags: '',
  loading: false,
  errorMessage: false
}

/* eslint-disable default-case, no-param-reassign */
const seoDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SEO_TITLE:
        draft.seoTitle = action.seoTitle
        break
      case SET_SEO_TAGS:
        draft.seoTags = action.seoTags
        break
      case SET_SEO_DESC:
        draft.seoDesc = action.seoDesc
        break
      case SET_LOADING:
        draft.loading = action.boolean
        break
      case SET_ERROR_MESSAGE:
        draft.errorMessage = action.boolean
      default:
    }
  })

export default seoDetailsReducer
