import produce from 'immer'
import { SET_INTEGRATIONS, SET_ERROR, SET_FLAG } from './constants'

export const initialState = { integrations: [], error: false, flag: false }

const integrationsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_INTEGRATIONS:
        draft.integrations = action.integrations
        break
      case SET_ERROR:
        draft.error = action.boolean

        break
      case SET_FLAG:
        draft.flag = action.value

        break
      default:
    }
  })

export default integrationsReducer
