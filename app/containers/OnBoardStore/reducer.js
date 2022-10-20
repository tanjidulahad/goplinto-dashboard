/*
 * OnBoardStoreReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer'
import { UPDATE_PAGE_INDEX } from './constants'

// The initial state of the App
export const initialState = {
  pageIndex: 0,
}

/* eslint-disable default-case, no-param-reassign */
const onBoardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_PAGE_INDEX:
        // Delete prefixed '@' from the github username
        draft.pageIndex = action.pageIndex
        break
    }
  })

export default onBoardReducer
