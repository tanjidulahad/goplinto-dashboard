import produce from 'immer'
import { SET_TEMPLATES } from './constants'

export const initialState = {
  templates: [],
}

const storeTaxReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TEMPLATES:
        draft.templates = action.templates
        break
      default:
    }
  })

export default storeTaxReducer
