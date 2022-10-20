import { SET_STORE_COUNTRY, SET_STORE_CURRENCY, SET_STORE_TIMEZONE, GET_STORE_REGION_DETAILS, SET_STORE_REGION_DETAILS, SET_LOADING, GET_ALL_COUNTRY_DETAILS,SET_ALL_COUNTRY_DETAILS, SET_STORE_CURRENCY_SYMBOL} from "./constants"

export const setStoreCountry = ({ storeCountry }) => ({
    type: SET_STORE_COUNTRY,
    storeCountry,
})
export const setStoreCurrency = ({ storeCurrencyCode }) => ({
    type: SET_STORE_CURRENCY,
    storeCurrencyCode,
})
export const setStoreTimezone = ({ storeTimezone }) => ({
    type: SET_STORE_TIMEZONE,
    storeTimezone,
})

export const getStoreRegionDetails = ({ storeId }) => ({
    type: GET_STORE_REGION_DETAILS,
    storeId,
})

export const setStoreRegionDetails = ({ storeId, storeCountry, storeCurrencyCode, storeTimezone, currency_symbol }) => ({
    type: SET_STORE_REGION_DETAILS,
    storeId,
    storeCountry, 
    storeCurrencyCode, 
    storeTimezone,
    currency_symbol
})
export const getAllCountryDetails = () => ({
    type: GET_ALL_COUNTRY_DETAILS,
})
export const setAllCountryDetails = ({ allCountryDetails}) => ({
    type: SET_ALL_COUNTRY_DETAILS,
    allCountryDetails
})
export const setStoreCurrencySymbol = ({ currency_symbol}) => ({
    type: SET_STORE_CURRENCY_SYMBOL,
    currency_symbol
})
export const setLoading = ({ boolean }) => ({
    type: SET_LOADING,
    boolean,
})