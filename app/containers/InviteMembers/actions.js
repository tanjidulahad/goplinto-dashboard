import {
SET_MEMBER_NAME,
SET_INVITE_TYPE,
SET_MEMBER_ROLE,
GET_MEMBER_DETAILS,
SET_MEMBER_DETAILS,
SET_INVITE_DATA,
SET_ALL_MEMBER_DETAILS,
SET_MEMBER_USER_ID,
SET_INVITE_ERROR,
SET_INVITE_ERROR_MSG
} from './constants'

export const setMemberName = val => ({
  type: SET_MEMBER_NAME,
  val,
})
export const setInviteType = val => ({
  type: SET_INVITE_TYPE,
  val,
})
export const setInviteData = val => ({
  type: SET_INVITE_DATA,
  val,
})
export const setMemberRole = (roleName, roleId) => ({
  type: SET_MEMBER_ROLE,
  roleName, 
    roleId
})
export const setMemberUserId= (val) => ({
  type: SET_MEMBER_USER_ID,
  val
})
export const getMemberDetails = ({storeId}) => ({
  type: GET_MEMBER_DETAILS,
  storeId,
})
export const setMemberDetails = ({ storeId, merchantId, MemberName, InviteData, MemberRole, InviteType, userId, edit, resending }) => ({
  type: SET_MEMBER_DETAILS,
  storeId,
  merchantId,
  MemberName,
  InviteData,
  MemberRole,
  InviteType,
  userId,
  edit,
  resending
})
export const setAllMemberDetails = (val) => ({
  type: SET_ALL_MEMBER_DETAILS,
  val
})
export const setInviteError = val => ({
  type: SET_INVITE_ERROR,
  val
})
export const setInviteErrorMsg = val => ({
  type: SET_INVITE_ERROR_MSG,
  val
})
