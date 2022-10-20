import produce from 'immer'

import { INITIALIZE, SET_IMAGE_LINK } from './constants'

// The initial state of the brandingReducer
export const initialState = {
  businessCards: [],
  qrCards: [],
}

/* eslint-disable default-case, no-param-reassign */
const brandingReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INITIALIZE:
        draft.businessCards = new Array(action.businessCards).fill(null)
        draft.qrCards = new Array(action.qrCards).fill(null)
        break
      case SET_IMAGE_LINK:
        const link = action.key !== '' ? `https://dsa0i94r8ef09.cloudfront.net/${action.key}` : null
        if (action.kind === 'branding') draft.businessCards[action.idx] = link
        else draft.qrCards[action.idx] = link
      default:
        break
    }
  })

export default brandingReducer
