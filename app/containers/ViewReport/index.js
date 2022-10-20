import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import TopNav from 'components/TopNav'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'

import { useInjectReducer } from 'utils/injectReducer'

import { useInjectSaga } from 'utils/injectSaga'

import { createStructuredSelector } from 'reselect'

import IsFeatureSubscribed from 'components/IsFeatureSubscribed'

import globalEnums from 'utils/globalEnums'

import '../../assets/DateStyles.css'

// Date Picker Section

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import moment from 'moment'
import BarChart from 'components/BarChart'
import LineAreaChart from 'components/LineAreaChart'
import {
  getReportAnalytics,
  getTopProducts,
  getGroupReportAnalytics,
  getGroupTopProducts,
} from 'containers/Reports/actions'

import {
  makeSelectStoreId,
  makeSelectSubscribedModules,
  makeSelectLoading,
  makeSelectReportAnalytics,
  makeSelectLevelDetails,
  makeSelectStore,
  makeSelectUser,
} from 'containers/Reports/selectors'
import reportsSaga from 'containers/Reports/saga'
import reportsReducer from 'containers/Reports/reducer'
import backImg from '../../images/icons/back.svg'

const ViewReport = ({
  storeId,
  store,
  getReportAnalytics,
  subscribedTo,
  loading,
  reports,
  getTopProducts,
  levelDetails,
  user,
  getGroupReportAnalytics,
  getGroupTopProducts,
}) => {
  const location = useLocation()
  const currentPage = location.state ? location.state.currentPage : ''
  const timePeriod = location.state ? location.state.timePeriod : ''
  const [startDate, setStartDate] = useState(null)
  const [comparativeDate, setComparativeDate] = useState(null)
  const [comparativeEndDate, setComparativeEndDate] = useState(null)
  const [mode, setMode] = useState(timePeriod)
  const [startDateEpoch, setStartDateEpoch] = useState(null)
  const [startEndDateEpoch, setStartEndDateEpoch] = useState(null)
  const [comparativeDateEpoch, setComparativeDateEpoch] = useState(null)
  const [comparedDate, setComparedDate] = useState(null)
  const [comparedCurrentDate, setComparedCurrentDate] = useState(null)

  useInjectReducer({ key: 'reportsPage', reducer: reportsReducer })
  useInjectSaga({ key: 'reportsPage', saga: reportsSaga })
  useEffect(() => {
    if (!reports) {
      if (user.role_id === 2) getData('Today', 'group', store.group_id)
      else getData('Today', 'store', storeId)
    }
  }, [])
  useEffect(() => {
    if (reports && reports.currentTimeRange && reports.comparativeTimeRange) {
      setStartDate(null)
      setComparativeDate(null)
      let current = parseInt(reports.currentTimeRange.startTime.toString().concat('000'))
      let currentEnd = parseInt(reports.currentTimeRange.endTime.toString().concat('000'))
      let comparative = parseInt(reports.comparativeTimeRange.startTime.toString().concat('000'))
      let comparativeEnd = parseInt(reports.comparativeTimeRange.endTime.toString().concat('000'))

      setStartDateEpoch(current)
      setStartEndDateEpoch(currentEnd)
      setComparativeDateEpoch(comparative)
      setComparativeEndDate(comparativeEnd)

      setStartDate(
        moment(current)
          .utc(true)
          .format('D MMM YYYY'),
      )
      setComparativeDate(
        moment(comparative)
          .utc(true)
          .format('D MMM YYYY'),
      )

      if (mode === 'Last7' || mode === 'Last30') {
        let currentCompare =
          moment(current)
            .utc(true)
            .format('MMM DD') +
          ' - ' +
          moment(currentEnd)
            .utc(true)
            .format('MMM DD, YYYY')
        let pastCompare =
          moment(comparative)
            .utc(true)
            .format('MMM DD') +
          ' - ' +
          moment(comparativeEnd)
            .utc(true)
            .format('MMM DD, YYYY')
        setComparedDate(pastCompare)
        setComparedCurrentDate(currentCompare)
      }
    }
  }, [reports, mode])

  const getData = (period, level, id) => {
    setMode(period)
    setStartDate(null)
    setComparativeDate(null)
    var startDateEpoch = null
    var endDateEpoch = moment().unix()
    var timePeriodString = ''
    if (period === 'Today') {
      startDateEpoch = moment()
        .startOf('day')
        .unix()
      timePeriodString = 'TODAY'
    }
    if (period === 'Yesterday') {
      startDateEpoch = moment()
        .subtract(1, 'days')
        .startOf('day')
        .unix()
      timePeriodString = 'YESTERDAY'
    }
    if (period === 'Last7') {
      startDateEpoch = moment()
        .subtract(7, 'days')
        .startOf('day')
        .unix()
      timePeriodString = 'SEVEN_DAYS'
    }
    if (period === 'Last30') {
      startDateEpoch = moment()
        .subtract(30, 'days')
        .startOf('day')
        .unix()
      timePeriodString = 'THIRTY_DAYS'
    }
    if (level === 'store') {
      getReportAnalytics(id, timePeriodString, startDateEpoch, endDateEpoch)
      getTopProducts(id, timePeriodString)
    } else if (level === 'group') {
      getGroupReportAnalytics(id, timePeriodString, startDateEpoch, endDateEpoch)
      getGroupTopProducts(id, timePeriodString, startDateEpoch, endDateEpoch)
    }
  }

  const currencySymbol = location.state.currency_symbol;
  return (
    <>
      {/* HELMET AREA */}
      <Helmet>
        <title>GoPlinto Reports &amp; Analytics</title>
        <meta name="description" content="Reports and Analytics Page" />
      </Helmet>
      {/* NAVBAR */}
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between px-4 pt-4 text-xl">
          <p className="flex mr-4 text-xl font-medium text-heavy">
            <NavLink className="mr-4" to="/app/reports">
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1" />
            </NavLink>
            {currentPage} report
          </p>
          <TopNav />
        </div>
      </div>
      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.REPORTS}>
        <section className="p-4 md:px-8" style={{ paddingBottom: 100 }}>
          {currentPage === 'Total Sales' && (
            <BarChart
              noOptions={true}
              currency_symbol={location.state.currency_symbol}
              title="Total Sales"
              value={(reports != null && reports.totalSales.salesAmount) || '0'}
              subValue={reports != null && reports.totalSales.relativeChange}
              data={reports && reports.reportDetails}
              currentDate={
                mode === 'Last7' || mode === 'Last30'
                  ? comparedCurrentDate
                  : moment(startDateEpoch)
                      .utc(true)
                      .format('MMM DD, YYYY')
              }
              comparativeDate={
                mode === 'Last7' || mode === 'Last30'
                  ? comparedDate
                  : moment(comparativeDateEpoch)
                      .utc(true)
                      .format('MMM DD, YYYY')
              }
              loading={loading}
              mode={mode}
            />
          )}
          {currentPage === 'Total Orders' && (
            <LineAreaChart
              noOptions={true}
              currency_symbol={location.state.currency_symbol}
              title="Total Orders"
              value={reports && reports.totalOrders.ordersCount}
              subValue={(reports != null && reports.totalOrders.relativeChange) || '0'}
              data={reports && reports.reportDetails}
              currentDate={
                mode === 'Last7' || mode === 'Last30'
                  ? comparedCurrentDate
                  : moment(startDateEpoch)
                      .utc(true)
                      .format('MMM DD, YYYY')
              }
              comparativeDate={
                mode === 'Last7' || mode === 'Last30'
                  ? comparedDate
                  : moment(comparativeDateEpoch)
                      .utc(true)
                      .format('MMM DD, YYYY')
              }
              loading={loading}
              mode={mode}
            />
          )}
          <div className="bg-white rounded-md ">
            <div className="report-table">
              <table className="w-full text-black">
                <tr style={{ background: '#1A24551A', whiteSpace: 'nowrap' }}>
                  <th className="report-table-left-col item-label text-left flex items-center pr-2 py-4">
                    Date / Time
                  </th>
                  <th className="item-label text-left px-2 py-4">Orders</th>
                  <th className="item-label text-left px-2 py-4">Gross Sales</th>
                  <th className="item-label text-left px-2 py-4">Discounts</th>
                  <th className="item-label text-left px-2 py-4">Tax</th>
                  <th className="item-label text-left px-2 py-4">Parcel Charge</th>
                  <th className="item-label text-left px-2 py-4">Delivery Charge</th>
                  <th className="item-label text-left px-2 py-4">Convenience Fee</th>
                  <th className="report-table-right-col item-label text-left px-2 flex items-center pl-2 py-4 ">
                    Total Sales
                  </th>
                </tr>
                {reports &&
                  reports.reportDetails.map(reportDetail => {
                    return (
                      <tr style={{ borderBottom: '.5px solid #2424243F', whiteSpace: 'nowrap' }}>
                        <td className="report-table-left-col pr-2 py-4 md:py-6">{reportDetail.name}</td>
                        <td className="px-2 md:px-2 py-4">
                          {reportDetail.currentOrderCount ? reportDetail.currentOrderCount : '0'}
                        </td>
                        <td className="px-2 md:px-2 py-4">
                         {currencySymbol}{reportDetail.totalOrderAmount ? reportDetail.totalOrderAmount : '0'}
                        </td>
                        <td className="px-2 md:px-2 py-4">
                          {currencySymbol}{reportDetail.totalSavingsAmount ? reportDetail.totalSavingsAmount : '0'}
                        </td>
                        <td className="px-2 md:px-2 py-4">
                          {currencySymbol}{reportDetail.totalTaxAmount ? reportDetail.totalTaxAmount : '0'}
                        </td>
                        <td className="px-2 md:px-2 py-4">
                          {currencySymbol}{reportDetail.totalTaxAmount ? reportDetail.totalParcelAmount : '0'}
                        </td>
                        <td className="px-2 md:px-2 py-4">
                          {currencySymbol}{reportDetail.totalTaxAmount ? reportDetail.totalDeliveryAmount : '0'}
                        </td>
                        <td className="px-2 md:px-2 py-4">
                          {currencySymbol}{reportDetail.totalTaxAmount ? reportDetail.totalConvenienceFee : '0'}
                        </td>
                        <td className="report-table-right-col pl-2 py-4 md:py-6 ">{currencySymbol}{reportDetail.currentSales}</td>
                      </tr>
                    )
                  })}
              </table>
            </div>
          </div>
        </section>
      </IsFeatureSubscribed>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  subscribedTo: makeSelectSubscribedModules(),
  loading: makeSelectLoading(),
  reports: makeSelectReportAnalytics(),
  levelDetails: makeSelectLevelDetails(),
  store: makeSelectStore(),
  user: makeSelectUser(),
})

const mapDispatchToProps = dispatch => ({
  getReportAnalytics: (storeId, period, startDate, endDate) => {
    dispatch(getReportAnalytics(storeId, period, startDate, endDate))
  },
  getTopProducts: (storeId, period) => {
    dispatch(getTopProducts(storeId, period))
  },
  getGroupReportAnalytics: (groupId, timePeriodString, startDate, endDate) => {
    dispatch(getGroupReportAnalytics(groupId, timePeriodString, startDate, endDate))
  },
  getGroupTopProducts: (groupId, timePeriodString, startDate, endDate) => {
    dispatch(getGroupTopProducts(groupId, timePeriodString, startDate, endDate))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewReport)
