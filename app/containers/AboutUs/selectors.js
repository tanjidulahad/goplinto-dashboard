import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectAboutUsState = state => state.get('AboutUs') || initialState
const selectGlobalState = state => state.get('global')

export const makeSelectGlobalUserStoreId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.store.store_id,
  )
export const makeSelectGlobalUserMerchantId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user.merchantId,
  )


export const makeSelectAboutUsDetails = () =>
  createSelector(
    selectAboutUsState,
    substate => substate.AboutUsDetails,
  )


export const makeSelectAboutUsEmail = () =>
  createSelector(
    selectAboutUsState,
    substate => substate.Email,
  )

export const makeSelectAboutUsContact = () =>
  createSelector(
    selectAboutUsState,
    substate => substate.Contact,
  )



export const makeSelectAboutUsDesc = () =>
  createSelector(
    selectAboutUsState,
    substate => substate.Description,
  )


export const makeSelectAboutUsImgUrl = () =>
  createSelector(
    selectAboutUsState,
    substate => substate.AboutUsDetails.banner_img_url,
  )


export const makeSelectAboutUsStatus = () =>
  createSelector(
    selectAboutUsState,
    substate => substate.status,
  )

