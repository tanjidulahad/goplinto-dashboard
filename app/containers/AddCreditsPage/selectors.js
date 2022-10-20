import { createSelector } from 'reselect'
import { initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectCreditDetails = state => state.get('creditDetails') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectCreditDetails = () =>
    createSelector(
        selectCreditDetails,
        substate => substate,
    )

export const makeSelectCountryDetails = () =>
    createSelector(
        selectAllCountryDetails,
        substate => substate,
    )

export const makeSelectStoreId = () =>
    createSelector(
        selectGlobalState,
        substate => substate.user.storeId,
    )

export const makeSelectMerchantId = () =>
    createSelector(
        selectGlobalState,
        substate => substate.user.merchantId,
    )

const selectStoreRegionDetails = state => state.get('storeRegionInfo') 

export const makeSelectStoreRegionInfo = () =>
    createSelector(
        selectStoreRegionDetails,
        substate => substate,
    )