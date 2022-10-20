import {
  GET_BANK_DETAILS,
  SET_ACCOUNT_NAME,
  SET_ACCOUNT_NO,
  SET_BANK_DETAILS,
  SET_BANK_NAME,
  SET_BRANCH,
  SET_IFSC_CODE,
} from './constants'

export const setBankName = ({ bankName }) => ({
  type: SET_BANK_NAME,
  bankName,
})

export const setAccountName = ({ accountName }) => ({
  type: SET_ACCOUNT_NAME,
  accountName,
})

export const setAccountNo = ({ accountNo }) => ({
  type: SET_ACCOUNT_NO,
  accountNo,
})

export const setIfscCode = ({ ifscCode }) => ({
  type: SET_IFSC_CODE,
  ifscCode,
})

export const setBranch = ({ branch }) => ({
  type: SET_BRANCH,
  branch,
})

export const getBankDetails = ({ storeId, merchantId }) => ({
  type: GET_BANK_DETAILS,
  storeId,
  merchantId,
})

export const setBankDetails = ({ storeId, merchantId, bankName, accountName, accountNo, ifscCode, branch }) => ({
  type: SET_BANK_DETAILS,
  storeId,
  merchantId,
  bankName,
  accountName,
  accountNo,
  ifscCode,
  branch,
})
