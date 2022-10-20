import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectPastOrders = state => state.get('pastOrders') || initialState
const selectGlobal = state => state.get('global')

const makeSelectPastOrders = () =>
  createSelector(
    selectPastOrders,
    substate => substate,
  )

const makeSelectStore = () =>
  createSelector(
    selectGlobal,
    substate => substate.store,
  )

const makeSelectMerchantEmail = () =>
  createSelector(
    selectGlobal,
    substate => substate.store.primary_email,
  )

export { makeSelectPastOrders, makeSelectStore, makeSelectMerchantEmail }
