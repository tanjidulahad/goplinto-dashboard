import produce from 'immer'
import orderStatusEnums from 'utils/orderStatusEnums'
import { SET_ORDER, SHOW_ORDER } from './constants'

// The initial state of the App
export const initialState = {
  order: null,
  showOrder: false,
}

/* eslint-disable default-case, no-param-reassign */
const orderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ORDER:
        draft.order = action.order
        draft.showOrder = false
        break
      case SHOW_ORDER:
        draft.showOrder = action.value
        if (!action.value) draft.order = null
        break
      default:
    }
  })

export default orderReducer
