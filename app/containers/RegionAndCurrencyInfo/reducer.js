import produce from 'immer'
import { SET_LOADING, SET_STORE_TIMEZONE, SET_STORE_CURRENCY, SET_STORE_COUNTRY, SET_ALL_COUNTRY_DETAILS, SET_STORE_CURRENCY_SYMBOL } from './constants'

export const initialState = {
    storeCountry: '',
    storeCurrencyCode: '',
    storeTimezone: '',
    loading: false,
    allCountryDetails: [],  
    currency_symbol:''
}

const storeRegionDetailsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_STORE_COUNTRY:
                draft.storeCountry = action.storeCountry
                break
            case SET_STORE_CURRENCY:
                draft.storeCurrencyCode = action.storeCurrencyCode
                break
            case SET_STORE_TIMEZONE:
                draft.storeTimezone = action.storeTimezone
                break
            case SET_ALL_COUNTRY_DETAILS:
                draft.allCountryDetails = action.allCountryDetails
                break       
            case SET_STORE_CURRENCY_SYMBOL:
                draft.currency_symbol = action.currency_symbol
                break
            case SET_LOADING:
                draft.allCountryDetails = action.allCountryDetails
                break
            default:
        }
    })
    
export default storeRegionDetailsReducer
