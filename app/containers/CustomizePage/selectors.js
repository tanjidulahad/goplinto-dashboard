import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as globalInitialState } from 'containers/App/reducer'

/**
 * Direct selector to the customizePage state domain
 */

const selectCustomizePageDomain = state => state.get('customizePage') || initialState
const selectGlobal = state => state.get('global') || globalInitialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by CustomizePage
 */

const makeSelectApiStatus = () =>
  createSelector(
    selectGlobal,
    initState => initState.apiStatus,
  )

const makeSelectRestaurantName = () =>
  createSelector(
    selectGlobal,
    initState => initState.store.store_name,
  )

const makeSelectCustomizePage = () =>
  createSelector(
    selectCustomizePageDomain,
    substate => substate,
  )

const makePreviewState = () =>
  createSelector(
    selectCustomizePageDomain,
    substate => substate.preview,
  )

const makeSelectStoreState = () =>
  createSelector(
    selectGlobal,
    substate => substate.store,
  )

const makePageStatus = () =>
  createSelector(
    selectGlobal,
    substate => substate.pageStatus,
  )

export {
  makeSelectCustomizePage,
  makeSelectRestaurantName,
  makePreviewState,
  makeSelectStoreState,
  makeSelectApiStatus,
  makePageStatus,
}
