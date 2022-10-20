const { GET_CREDIT_NUMBERS,SET_CREDIT_NUMBERS, SET_CREDIT_TYPE, SET_NO_OF_CREDIT,SET_CREDIT_AMT,SET_CREDIT_PRICING } = require("./constants");

export const getCreditNumbers = ({ creditNumbersDetails }) => ({
    type: GET_CREDIT_NUMBERS,
    creditNumbersDetails
})
export const setCreditNumbers = ({ storeId, merchantId }) => ({
    type: SET_CREDIT_NUMBERS,
    storeId,
    merchantId
})

export const setCreditPricing = ({creditPricing}) => ({
    type: SET_CREDIT_PRICING,
    creditPricing
})

export const setCreditType = ({ creditType }) => ({
    type: SET_CREDIT_TYPE,
    creditType
})

export const setCreditNumber = ({ noOfCredits }) => ({
    type: SET_NO_OF_CREDIT,
    noOfCredits
})

export const setCreditAmount = ({ creditAmount }) => ({
    type: SET_CREDIT_AMT,
    creditAmount
})

