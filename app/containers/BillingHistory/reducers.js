import produce from 'immer'
import { SET_BILLS, SET_CREDITS_HISTORY, SET_UPDATE_CANCEL_ERROR } from './constants'

// The initial state of the App
export const initialState = {
  billingHistoryItems: [],
  showCancelError: false,
  creditHistory:[]
}

/* eslint-disable default-case, no-param-reassign */
const billingHistoryReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BILLS:
        draft.billingHistoryItems = action.items
        break      
      case SET_CREDITS_HISTORY:
        draft.creditHistory = action.items
        break
      case SET_UPDATE_CANCEL_ERROR:
        draft.showCancelError = action.bool
        break
      default:
    }
  })

export default billingHistoryReducer
