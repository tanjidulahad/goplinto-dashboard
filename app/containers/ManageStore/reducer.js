import produce from 'immer'
import { SET_STORES } from './constants'

// The initial state of the App
export const initialState = {
  stores: [],
}

/* eslint-disable default-case, no-param-reassign */
const manageStoreReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_STORES:
        draft.stores = action.stores
        break
      default:
        return state
    }
  })

export default manageStoreReducer
