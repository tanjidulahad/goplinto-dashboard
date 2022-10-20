import produce from 'immer'
import {
  SET_CONVENIENCE_LOADING,
  SET_COD,
  SET_CONVENIENCE,
  SET_INITIAL_LOADING,
  SET_ONLINE,
  SHOW_CONVENIENCE_MESSAGE,
  SET_CONVENIENCE_AMOUNT,
} from './constants'

// The initial state of the App
export const initialState = {
  firstTime: true,
  cod: false,
  online: false,
  convenience: false,
  convenienceAmount: '',
  loadConvenienceStatus: false,
  showConvenienceStatus: false,
}

/* eslint-disable default-case, no-param-reassign */
const storeDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_COD:
        draft.cod = action.boolean
        break
      case SET_ONLINE:
        draft.online = action.boolean
        break
      case SET_CONVENIENCE:
        draft.convenience = action.boolean
        break    
      case SET_CONVENIENCE_AMOUNT:
        draft.convenienceAmount = action.value
        break
      case SET_INITIAL_LOADING:
        draft.firstTime = action.boolean
        break

      case SET_CONVENIENCE_LOADING:
        draft.loadConvenienceStatus = action.boolean
        break
      case SHOW_CONVENIENCE_MESSAGE:
        draft.showConvenienceStatus = action.boolean
        break
      default:
    }
  })

export default storeDetailsReducer
