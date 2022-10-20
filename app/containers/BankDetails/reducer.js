import produce from 'immer'
import { SET_ACCOUNT_NAME, SET_ACCOUNT_NO, SET_BANK_NAME, SET_BRANCH, SET_IFSC_CODE } from './constants'

// The initial state of the App
export const initialState = {
  bankName: '',
  accountName: '',
  accountNo: '',
  ifscCode: '',
  branch: '',
}

/* eslint-disable default-case, no-param-reassign */
const contactInfoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BANK_NAME:
        draft.bankName = action.bankName
        break
      case SET_ACCOUNT_NAME:
        draft.accountName = action.accountName
        break
      case SET_ACCOUNT_NO:
        draft.accountNo = action.accountNo
        break
      case SET_IFSC_CODE:
        draft.ifscCode = action.ifscCode
        break
      case SET_BRANCH:
        draft.branch = action.branch
        break
      default:
    }
  })

export default contactInfoReducer
