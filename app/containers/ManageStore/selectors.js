import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectManageStorePage = state => state.get('manageStorePage') || initialState
const selectGlobal = state => state.get('global') || initialGlobalState

const makeSelectStore = () =>
  createSelector(
    selectGlobal,
    substate => substate.store,
  )
const makeSelectStores = () =>
  createSelector(
    selectManageStorePage,
    substate => substate.stores,
  )

export { makeSelectStore, makeSelectStores }
