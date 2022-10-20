import {
  GET_TAXES,
  SET_TAXES,
  SET_TAX_PERCENTAGE,
  SET_TAX_NAME,
  SET_TAX_DESC,
  SET_NEW_TAX,
  SET_EDIT,
  UPDATE_TAX,
} from './constants'

export const getTaxes = ({ storeId }) => ({
  type: GET_TAXES,
  storeId,
})

export const setTaxes = ({ taxes }) => ({
  type: SET_TAXES,
  taxes,
})

export const setTaxName = ({ text }) => ({
  type: SET_TAX_NAME,
  text,
})

export const setTaxPercentage = ({ text }) => ({
  type: SET_TAX_PERCENTAGE,
  text,
})

export const setTaxDesc = ({ text }) => ({
  type: SET_TAX_DESC,
  text,
})

export const setNewTax = ({ boolean }) => ({
  type: SET_NEW_TAX,
  boolean,
})

export const setEdit = ({ boolean }) => ({
  type: SET_EDIT,
  boolean,
})

export const updateTax = ({ storeId, taxCode, taxRate, taxDesc, edit }) => ({
  type: UPDATE_TAX,
  storeId,
  taxCode,
  taxRate,
  taxDesc,
  edit,
})
