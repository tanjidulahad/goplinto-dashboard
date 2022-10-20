import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectBrandingState = state => state.get('brandingReducer') || initialState
const selectGlobalState = state => state.get('global')

const makeSelectBrandingData = () =>
  createSelector(
    selectBrandingState,
    substate => substate,
  )

const makeSelectGlobalStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )

export { makeSelectBrandingData, makeSelectGlobalStore }
