import { createSelector } from 'reselect'
import { initialState as initialGlobalState } from 'containers/App/reducer'
import { initialState } from './reducer'

const selectGlobalState = state => state.get('global') || initialGlobalState
const selectEmailMarketingState = state => state.get('EmailMarketing') || initialState

export const makeSelectStoreId = () =>
  createSelector(
    selectGlobalState,
    substate => substate.user.storeId,
  )
  
export const makeSelectEmailNotifications = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.EmailNotifications,
  )

export const makeSelectVerifiedEmails = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.VerifiedEmails,
  )

export const makeSelectDefaultEmailTemplates = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.DefaultEmailTemplates,
  )

export const makeSelectCustomEmailTemplates = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.CustomEmailTemplates,
  )

export const makeSelectPageIndex = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.PageIndex,
  )

export const makeSelectFormInput = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.FormInput,
  )

export const makeSelectScheduledTime = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.ScheduledTime,
  )

export const makeSelectCreateNew = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.createNew,
  )
export const makeSelectResponseErrors = () =>
  createSelector(
    selectEmailMarketingState,
    substate => substate.responseErrors,
  )