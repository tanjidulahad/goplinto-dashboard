import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'

import { initialState } from './reducer'

const selectOnBoardStore = state => state.get('onBoardStore') || initialState
const selectContactInfo = state => state.get('contactInfo') 

const selectGlobal = state => state.get('global') || initialGlobalState

const makeSelectStoreId = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.storeId,
  )

const makeSelectMerchantId = () =>
  createSelector(
    selectGlobal,
    substate => substate.user.merchantId,
  )

const makeSelectStore = () =>
  createSelector(
    selectGlobal,
    substate => substate.store,
  )


const makeSelectStoreInfoStates = () =>
  createSelector(
    selectGlobal,
    substate => substate.storeInfoLoad,
  )

const getPageIndex = () =>
  createSelector(
    selectOnBoardStore,
    substate => substate.pageIndex,
  )


const getPageStatus = () =>
  createSelector(
    selectGlobal,
    substate => substate.pageStatus,
  )
const makeSelectStoreOnboardStatus = () =>
  createSelector(
    selectGlobal,
    substate => substate.store.onboard_status,
  )
export const makeSelectContactInfo = () =>
  createSelector(
    selectContactInfo,
    substate => substate,
  )
export {
  makeSelectStoreId,
  makeSelectMerchantId,
  makeSelectStore,
  makeSelectStoreInfoStates,
  getPageIndex,
  getPageStatus,
  makeSelectStoreOnboardStatus
}
