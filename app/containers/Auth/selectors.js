import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectAuthState = state => state.get('authReducer') || initialState
const selectGlobalState = state => state.get('global')

const makeSelectAuthState = () =>
  createSelector(
    selectAuthState,
    substate => substate,
  )

const makeSelectClientDetails = () =>
  createSelector(
    selectAuthState,
    substate => substate.clientDetails,
  )

const makeSelectLoginState = () =>
  createSelector(
    selectAuthState,
    substate => substate.isLoggedIn,
  )

const makeSelectShowFeaturesCarousel = () =>
  createSelector(
    selectAuthState,
    substate => substate.showFeaturesCarousel,
  )

const makeSelectGlobalUser = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user,
  )
const makeSelectCountryDetails = () =>
  createSelector(
    selectAuthState,
    substate => substate.allCountryDetails,
  )
const makeSelectShowScreen = () =>
  createSelector(
    selectAuthState,
    substate => substate.showScreen,
  )
const makeSelectAuthMode = () =>
  createSelector(
    selectAuthState,
    substate => substate.authMode,
  )
const makeSelectVerificationType = () =>
  createSelector(
    selectAuthState,
    substate => substate.verificationType,
  )
const makeSelectLoading = () =>
  createSelector(
    selectAuthState,
    substate => substate.loading,
  )

export {
  makeSelectAuthState,
  makeSelectLoginState,
  makeSelectGlobalUser,
  makeSelectClientDetails,
  makeSelectShowFeaturesCarousel,
  makeSelectCountryDetails,
  makeSelectShowScreen,
  makeSelectAuthMode,
  makeSelectVerificationType,
  makeSelectLoading,
}
