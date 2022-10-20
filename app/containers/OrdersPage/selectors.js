import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectOrderState = state => state.get('orders') || initialState
const selectGlobal = state => state.get('global')

const makeSelectOrderItem = () =>
    createSelector(
        selectOrderState,
        substate => substate.order,
    )

const makeSelectStore = () =>
    createSelector(
        selectGlobal,
        substate => substate.store,
    )


export { makeSelectOrderItem, makeSelectStore }

