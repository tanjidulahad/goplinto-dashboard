import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectGlobal = state => state.get('global')
const selectSocialAccounts = state => state.get('socialAccounts')||initialState


const makeSelectSocial = () =>
  createSelector(
    selectSocialAccounts,
    substate => substate.social,
  )

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

const makeSelectSubscribedModules = () =>
  createSelector(
    selectGlobal,
    substate => substate.subscription_details,
  )

export { makeSelectSocial, makeSelectStoreId, makeSelectMerchantId, makeSelectSubscribedModules }
