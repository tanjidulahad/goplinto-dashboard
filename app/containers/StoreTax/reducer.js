import produce from 'immer'
import { SET_EDIT, SET_NEW_TAX, SET_TAXES, SET_TAX_DESC, SET_TAX_NAME, SET_TAX_PERCENTAGE } from './constants'

// The initial state of the App
export const initialState = {
  edit: false,
  taxes: [],
  currentTax: {
    new: false,
    taxName: '',
    taxPercentage: '',
    taxDesc: '',
  },
}

/* eslint-disable default-case, no-param-reassign */
const storeTaxReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TAXES:
        draft.taxes = action.taxes
        break
      case SET_TAX_NAME:
        draft.currentTax.taxName = action.text
        break
      case SET_TAX_PERCENTAGE:
        draft.currentTax.taxPercentage = action.text
        break
      case SET_TAX_DESC:
        draft.currentTax.taxDesc = action.text
        break
      case SET_NEW_TAX:
        draft.currentTax.new = action.boolean
        break
      case SET_EDIT:
        draft.edit = action.boolean
        break
      default:
    }
  })

export default storeTaxReducer
