import { SUBMIT_BANK_INFO, GET_BANK_INFO } from './constants'

export const submitBankData = (merchantId, storeId, { bankName, accountName, accountNumber, ifscCode, branch }) => ({
  type: SUBMIT_BANK_INFO,
  bankName,
  accountName,
  accountNumber,
  ifscCode,
  branch,
  storeId,
  merchantId,
})

export function getBankData(storeId, merchantId) {
  return {
    type: GET_BANK_INFO,
    storeId,
    merchantId,
  }
}
