import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectCurrentOrders = state => state.get('currentOrders') || initialState
const selectstoreRegionInfo = state => state.get('storeRegionInfo') || initialState
const selectGlobal = state => state.get('global')

const makeSelectCurrentOrders = () =>
  createSelector(
    selectCurrentOrders,
    substate => substate,
  )

const makeSelectStore = () =>
  createSelector(
    selectGlobal,
    substate => substate.store,
  )

const makeSelectOrders = () =>
  createSelector(
    selectCurrentOrders,
    substate => substate,
  )
  const makeSelectLoaderCard = () =>
  createSelector(
    selectCurrentOrders,
    substate => substate.loaderCard,
  )
const makeSelectRegionInfo = () =>
  createSelector(
    selectstoreRegionInfo,
    substate => substate.currency_symbol,
  )

export { selectCurrentOrders, makeSelectCurrentOrders, makeSelectStore, makeSelectOrders, makeSelectRegionInfo, makeSelectLoaderCard }
