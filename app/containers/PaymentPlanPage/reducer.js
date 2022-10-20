import produce from 'immer'
import { SET_CURRENT_SUBSCRIPTION_PLAN } from './constants'

// The initial state of the App
export const initialState = {
  currentSubscriptionPlan: [],
}

/* eslint-disable default-case, no-param-reassign */
const paymentPlanReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CURRENT_SUBSCRIPTION_PLAN:
        draft.currentSubscriptionPlan = action.subscriptionPlan
        break
      default:
    }
  })

export default paymentPlanReducer
