import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectStoreTemplates = state => state.get('templatesPage') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectStoreTemplates = () =>
  createSelector(
    selectStoreTemplates,
    substate => substate.templates,
  )

export const makeSelectStoreId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user.storeId,
  )
  
export const makeSelectPlanId = () =>
  createSelector(
    selectGlobalState,
    substate => substate,
  )