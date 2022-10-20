import produce from 'immer'
import {
  SET_MEMBER_NAME,
  SET_INVITE_TYPE,
  SET_MEMBER_ROLE,
  SET_INVITE_DATA,
  SET_ALL_MEMBER_DETAILS,
  SET_MEMBER_USER_ID,
  SET_INVITE_ERROR,
  SET_INVITE_ERROR_MSG
} from './constants'


export const initialState = {
  memberName:'',
  inviteType: '',
  inviteData: '',
  memberRole:{roleName:"",roleId:""},
  allMembersDetails:[],
  userId:'',
  inviteError:"",
  inviteErrorMsg:"",
}

/* eslint-disable default-case, no-param-reassign */
const InviteMemberReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_MEMBER_NAME:
        draft.memberName = action.val
        break
       case SET_INVITE_TYPE:
        draft.inviteType = action.val
        break      
        case SET_INVITE_DATA:
        draft.inviteData = action.val
        break
       case SET_MEMBER_ROLE:
        draft.memberRole = { roleName: action.roleName, roleId: action.roleId } 
        break
        case SET_ALL_MEMBER_DETAILS:
        draft.allMembersDetails = action.val
        break
       case SET_MEMBER_USER_ID:
        draft.userId = action.val
        break
       case SET_INVITE_ERROR:
        draft.inviteError = action.val
        break
       case SET_INVITE_ERROR_MSG:
        draft.inviteErrorMsg = action.val
        break
     
      default:
    }
  })

export default InviteMemberReducer
