import produce from 'immer'
import { UPDATE_SOCIAL_ACCOUNTS } from './constants'

export const initialState = {
 social:[],
}

/* eslint-disable default-case, no-param-reassign */
const storeDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_SOCIAL_ACCOUNTS:
        draft.social = action.social
        break
      default:
    }
  })

export default storeDetailsReducer
