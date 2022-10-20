import {
  UPDATE_CUSTOMER_BASE_TYPE,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  GET_REPORT_ANALYTICS,
  GET_GROUP_REPORT_ANALYTICS,
  SET_REPORT_ANALYTICS,
  GET_TOP_PRODUCTS,
  GET_GROUP_TOP_PRODUCTS,
  SET_TOP_PRODUCTS,
  SET_TIME_PERIOD,
  SET_REPORTS_LEVEL,
  SEND_REPORTS,
  SET_REPORT_MSG,
  SEND_ITEM_REPORTS
} from './constants'

export const setCustomerBase = (storeId, customerBase) => ({ type: UPDATE_CUSTOMER_BASE_TYPE, storeId, customerBase })

export const setError = ({ boolean }) => ({
  type: SET_ERROR,
  boolean,
})

export const setErrorMessage = val => ({
  type: SET_ERROR_MESSAGE,
  val,
})

export const setLoading = ({ boolean }) => ({
  type: SET_LOADING,
  boolean,
})

export const getReportAnalytics = (storeId, period, startDateEpoch, endDateEpoch) => ({
  type: GET_REPORT_ANALYTICS,
  storeId,
  period,
  startDateEpoch,
  endDateEpoch,
})
export const getGroupReportAnalytics = (groupId, timePeriodString, startDate, endDate) => ({
  type: GET_GROUP_REPORT_ANALYTICS,
  groupId,
  timePeriodString,
  startDate,
  endDate,
})

export const getTopProducts = (storeId, period) => ({
  type: GET_TOP_PRODUCTS,
  storeId,
  period,
})
export const getGroupTopProducts = (groupId, timePeriodString, startDate, endDate) => ({
  type: GET_GROUP_TOP_PRODUCTS,
  groupId,
  timePeriodString,
  startDate,
  endDate,
})

export const setReportAnalytics = val => ({
  type: SET_REPORT_ANALYTICS,
  val,
})

export const setTopProducts = val => ({
  type: SET_TOP_PRODUCTS,
  val,
})
export const setTimePeriod = timePeriod => ({
  type: SET_TIME_PERIOD,
  timePeriod,
})
export const setReportsLevel = levelDetails => ({
  type: SET_REPORTS_LEVEL,
  levelDetails,
})
export const sendReport = ({period,storeId,merchantId}) => ({
  type: SEND_REPORTS,
  period, 
  storeId, 
  merchantId,
})
export const sendItemReport = ({period,storeId,merchantId}) => ({
  type: SEND_ITEM_REPORTS,
  period, 
  storeId, 
  merchantId,
})
export const setReportPopupMsg = ({msg}) => ({
  type: SET_REPORT_MSG,
  msg,
})
