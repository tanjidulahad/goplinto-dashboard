import {
  GET_INTEGRATIONS,
  SET_INTEGRATIONS,
  SET_INTEGRATION_STATUS,
  SET_STORE_INTEGRATION,
  SET_ERROR,
  SET_FLAG,
} from './constants'

export const getIntegrations = storeId => ({
  type: GET_INTEGRATIONS,
  storeId,
})
export const setIntegrations = integrations => ({
  type: SET_INTEGRATIONS,
  integrations,
})
export const setIntegrationStatus = (storeId, domain, status) => ({
  type: SET_INTEGRATION_STATUS,
  storeId,
  domain,
  status,
})

export const setStoreIntegration = (storeId, merchantId, domain, integrationData) => ({
  type: SET_STORE_INTEGRATION,
  storeId,
  merchantId,
  domain,
  integrationData,
})
export const setError = ({ boolean }) => ({
  type: SET_ERROR,
  boolean,
})

export const setFlag = ({ value }) => ({
  type: SET_FLAG,
  value,
})
