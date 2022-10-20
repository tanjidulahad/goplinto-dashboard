import produce from 'immer'
import {
  UPDATE_CUSTOMER_BASE_TYPE,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_REPORT_ANALYTICS,
  SET_TOP_PRODUCTS,
  SET_TIME_PERIOD,
  SET_REPORTS_LEVEL,
  SET_REPORT_MSG,
} from './constants'
import { SET_STORE_STATS } from '../Dashboard/constants'
import { RiTreasureMapFill } from 'react-icons/ri'

// The initial state of the App
export const initialState = {
  storeStats: null,
  customerBase: null,
  error: '',
  errorMessage: '',
  loading: false,
  reports: null,
  top_products: [],
  timePeriod: 'Last7',
  levelDetails: {},
  reportPopupMsg:''
}

/* eslint-disable default-case, no-param-reassign */
const reportsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_STORE_STATS: {
        return { ...state, loading: false, storeStats: action.storeStats }
      }
      case UPDATE_CUSTOMER_BASE_TYPE:
        return { ...state, customerBase: action.customerBase }
      case SET_ERROR:
        return { ...state, error: action.boolean }
      case SET_ERROR_MESSAGE:
        return { ...state, errorMessage: action.val }
      case SET_LOADING:
        return { ...state, loading: true }
      case SET_REPORT_ANALYTICS:
        return { ...state, reports: action.val, loading: false }
      case SET_TOP_PRODUCTS:
        return { ...state, top_products: action.val }
      case SET_TIME_PERIOD:
        return { ...state, timePeriod: action.timePeriod }
      case SET_REPORTS_LEVEL:
        return { ...state, levelDetails: action.levelDetails }      
      case SET_REPORT_MSG:
        return { ...state, reportPopupMsg: action.msg }
      default:
        return state
    }
  })

export default reportsReducer
