import produce from 'immer'
import { SET_CREDIT_PRICING, GET_CREDIT_NUMBERS,SET_CREDIT_NUMBERS,SET_CREDIT_TYPE,SET_CREDIT_AMT,SET_NO_OF_CREDIT } from './constants'

export const initialState = {
    creditPricing: [],
    creditNumbers: [],
    creditType: "",
    creditAmount: "",
    noOfCredits: "",
}

const addCreditReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case SET_CREDIT_PRICING:
                draft.creditPricing = action.creditPricing
                break;
            case GET_CREDIT_NUMBERS:
                draft.creditNumbers = action.creditNumbersDetails
                break; 
            case SET_CREDIT_NUMBERS:
                draft.creditNumbers = action.creditNumbersDetails
                break;
            case SET_CREDIT_TYPE:
                draft.creditType = action.creditType
                break;
            case SET_CREDIT_AMT:
                draft.creditAmount = action.creditAmount
                break;
            case SET_NO_OF_CREDIT:
                draft.noOfCredits = action.noOfCredits
                break;

            default:
        }
    })

export default addCreditReducer
