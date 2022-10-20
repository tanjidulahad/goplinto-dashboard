import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectInviteMemberState = state => state.get('inviteMemberInfo') || initialState
const selectGlobal = state => state.get('global')

export const makeSelectInviteMemberInfo = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate,
  )
export const makeSelectMemberName = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate.memberName,
  )
export const makeSelectMemberRole = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate.memberRole,
  )
export const makeSelectInviteVia = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate.inviteType,
  )
  export const makeSelectInviteData = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate.inviteData,
  )  
  export const makeSelectAllMembersDetails = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate.allMembersDetails,
  )
export const makeSelectGlobalUser = () =>
  createSelector(
    selectGlobal,
    substate => substate.user,
  )
export const makeSelectInviteError = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate.inviteError,
  )
  export const makeSelectInviteErrorMsg = () =>
  createSelector(
    selectInviteMemberState,
    substate => substate.inviteErrorMsg,
  )