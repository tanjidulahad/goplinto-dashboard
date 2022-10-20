import produce from 'immer'
import { setStoreDesc } from './actions'
import { SET_LOADING, SET_STORE_DESC, SET_STORE_NAME, SET_STORE_TYPE } from './constants'

// The initial state of the App
export const initialState = {
  storeName: '',
  storeType: { label: 'Choose Store Type', value: 'NULL' },
  storeDescription: '',
  loading: false,
}

/* eslint-disable default-case, no-param-reassign */
const storeDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_STORE_NAME:
        draft.storeName = action.storeName
        break
      case SET_STORE_TYPE:
        draft.storeType = action.storeType
        break
      case SET_STORE_DESC:
        draft.storeDescription = action.storeDesc
        break
      case SET_LOADING:
        draft.loading = action.boolean
        break
      default:
    }
  })

export default storeDetailsReducer
