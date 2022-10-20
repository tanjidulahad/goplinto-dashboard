import produce from 'immer'
import { SET_ALL_WIDGETS, SET_SHOW_WIDGET_BEST_SELLER, SET_SHOW_WIDGET_NEW_ARRIVAL } from './constants'
// The initial state of the App
export const initialState = {
  Widgets: [],
  showProductBestSeller: true,
  showProductNewArrival: true,
}

/* eslint-disable default-case, no-param-reassign */
const addOnsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_ALL_WIDGETS:
        draft.Widgets = action.widgets
        break
      case SET_SHOW_WIDGET_BEST_SELLER:
        draft.showProductBestSeller = action.widgetStatus
        break
      case SET_SHOW_WIDGET_NEW_ARRIVAL:
        draft.showProductNewArrival = action.widgetStatus
        break
      default:
        break
    }
  })

export default addOnsReducer
