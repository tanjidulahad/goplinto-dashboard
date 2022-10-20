import { createSelector } from 'reselect'

const selectDelConfig = state => state.get('delConfig')

export const makeSelectPickUpData = () =>
    createSelector(
        selectDelConfig,
        substate => substate && substate.pickup,
    )