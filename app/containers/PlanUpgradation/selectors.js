import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectStore = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store,
  )
