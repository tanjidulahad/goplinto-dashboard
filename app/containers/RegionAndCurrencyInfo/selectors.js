import { createSelector } from 'reselect'
import {  initialState } from './reducer'
import { initialState as initialGlobalState } from 'containers/App/reducer'

const selectStoreRegionDetails = state => state.get('storeRegionDetails') || initialState
const selectGlobalState = state => state.get('global') || initialGlobalState

export const makeSelectStoreRegionDetails = () =>
    createSelector(
        selectStoreRegionDetails,
        substate => substate,
    )

export const makeSelectStoreId = () =>
    createSelector(
        selectGlobalState,
        substate => substate.user.storeId,
    )