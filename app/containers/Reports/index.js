import React, { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import TopNav from 'components/TopNav'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { customSelect, DropdownIndicator } from 'utils/dropdownConfig'
import { notification, DatePicker } from 'antd'
import { FaRegCalendar } from 'react-icons/fa'
import InventoryPlaceholderImage from '../../images/Img Placeholder.png'

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
import Modal from 'components/ReportsModal'
import moment from 'moment'
import MiniBox from 'components/MiniBox'
import TopProducts from 'components/TopProducts'
import BarChart from 'components/BarChart'
import LineAreaChart from 'components/LineAreaChart'
import {
  setCustomerBase,
  setErrorMessage,
  setError,
  getReportAnalytics,
  getGroupReportAnalytics,
  getTopProducts,
  getGroupTopProducts,
  setTimePeriod,
  setReportsLevel,
  sendReport,
  sendItemReport,
  setReportPopupMsg
} from './actions'
import { getStoresByGroupId } from 'containers/ManageStore/actions'

import {
  makeSelectCustomerBase,
  makeSelectStoreId,
  makeSelectMerchantEmail,
  makeSelectStoreStats,
  makeSelectMerchantId,
  makeSelectSubscribedModules,
  makeSelectLoading,
  makeSelectReportAnalytics,
  makeSelectTopProducts,
  makeSelectTimePeriod,
  makeSelectStore,
  makeSelectUser,
  makeSelectStoreGroupDetils,
  makeSelectReportPopupMsg,
} from './selectors'
import { makeSelectStores } from 'containers/ManageStore/selectors'
import saga from './saga'
import reducer from './reducer'
import manageStorePageSaga from 'containers/ManageStore/saga'
import manageStorePageReducer from 'containers/ManageStore/reducer'
import { getStoreData } from 'containers/HomePage/actions'
import newOrderTag from '../../images/cust-img.png'
import PaymentPromotionImages from 'components/PaymentPromotionImages'

const options = [
  {
    value: 'Today',
    label: <span className="item-label-dropdown">Today</span>,
    icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
  },
  {
    value: 'Yesterday',
    label: <span className="item-label-dropdown">Yesterday</span>,
    icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
  },
  {
    value: 'Last7',
    label: <span className="item-label-dropdown">Last 7 Days</span>,
    icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
  },
  {
    value: 'Last30',
    label: <span className="item-label-dropdown">Last 30 Days</span>,
    icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
  },
]

const customSingleValue = ({ data }) => (
  <div className="input-select">
    <div className="input-select__single-value">
      {data.icon && <span className="input-select__icon">{data.icon}</span>}
      <span>{data.label}</span>
    </div>
  </div>
)

const Reports = ({
  getStoresByGroupId,
  storeStats,
  storeId,
  merchantId,
  store,
  getReportAnalytics,
  getGroupReportAnalytics,
  subscribedTo,
  customerBase,
  merchantEmail,
  setCustomerBase,
  setErrorMessage,
  setError,
  loading,
  reports,
  top_products,
  getTopProducts,
  getGroupTopProducts,
  timePeriod,
  setTimePeriod,
  setReportsLevel,
  stores,
  user,
  storeGroupDetails,
  setReportPopupMsg,
  getStoreData,
  sendReport,
  sendItemReport,
  reportPopupMsg
}) => {
  const [startDate, setStartDate] = useState(null)
  const [comparativeDate, setComparativeDate] = useState(null)
  const [comparativeEndDate, setComparativeEndDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [customerBaseOption, setCustomerBaseOption] = useState('ALL_REGISTERED')
  const [showModal, setShowModal] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [mode, setMode] = useState(timePeriod)
  const [startDateEpoch, setStartDateEpoch] = useState(null)
  const [startEndDateEpoch, setStartEndDateEpoch] = useState(null)
  const [comparativeDateEpoch, setComparativeDateEpoch] = useState(null)
  const [comparedDate, setComparedDate] = useState(null)
  const [comparedCurrentDate, setComparedCurrentDate] = useState(null)
  const [storeOptions, setstoreOptions] = useState([])
  const [selectedStoreOption, setSelectedStoreOption] = useState('All Stores')
  const [showGenerateReportPopup, setshowGenerateReportPopup] = useState(false)
  const [ReportPopupTitle, setReportPopupTitle] = useState("Total Orders")

  useInjectReducer({ key: 'reportsPage', reducer })
  useInjectSaga({ key: 'reportsPage', saga })
  useInjectReducer({ key: 'manageStorePage', reducer: manageStorePageReducer })
  useInjectSaga({ key: 'manageStorePage', saga: manageStorePageSaga })
 const {currency_symbol}=store;
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 1101 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 1100 })
    return isMobile ? children : null
  }
useEffect(() => {
  getStoreData(storeId)
}, []) 
 const customDateSpan = useRef(0)
  const getStoreOptions = () => {
    var storeArray = [
      {
        value: 'All Stores',
        label: (
          <div>
            <img
              src={
                storeGroupDetails && storeGroupDetails.logo_img_url
                  ? storeGroupDetails.logo_img_url
                  : InventoryPlaceholderImage
              }
              class="rounded-md"
              style={{ width: '40px', height: '40px', display: 'inline-block', margin: '5px 5px 5px 0px' }}
            />
            <span className="item-label-dropdown">All Stores</span>
          </div>
        ),
      },
    ]
    stores.map(store => {
      storeArray.push({
        value: store.store_id,
        label: (
          <div>
            <img
              src={store.logo_img_url ? store.logo_img_url : InventoryPlaceholderImage}
              class="rounded-md"
              style={{ width: '40px', height: '40px', display: 'inline-block', margin: '5px 5px 5px 0px' }}
            />
            <span className="item-label-dropdown">{store.store_name}</span>
          </div>
        ),
      })
    })
    setstoreOptions(storeArray)
  }
  useEffect(() => {
    if (user.role_id === 2) getData(timePeriod, 'group', store.group_id)
    else getData(timePeriod, 'store', storeId)
    getStoresByGroupId(store.group_id)
  }, [])
  useEffect(() => {
    getStoreOptions()
  }, [stores])

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

  const openNotification = placement => {
    notification.success({
      message: `Email Sent Successfully!`,
      description: 'Please Check your inbox.',
      placement,
    })
  }

  const { error, errorMessage } = customerBase

  useEffect(() => {
    if (error === false) {
      setShowModal(false)
    }
  }, [error])

  useEffect(() => {
    setError('')
    setErrorMessage('')
  }, [customerBaseOption])

  useEffect(() => {
    if (!firstLoad && !showModal) {
      openNotification('bottomRight')
      setError('')
      setErrorMessage('')
    }
  }, [showModal])

  const getData = (period, level, id) => {
    setMode(period)
    setStartDate(null)
    setTimePeriod(period)
    setReportsLevel({ level, id })
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
  const [period, setperiod] = useState("TODAY")
  useEffect(() => {
    if (timePeriod === "Today") {
      setperiod("TODAY")
    }
    else if (timePeriod === "Yesterday") {
      setperiod("YESTERDAY")
    }
    else if (timePeriod === "Last7") {
      setperiod("SEVEN_DAYS")
    }
    else if (timePeriod === "Last30") {
      setperiod("THIRTY_DAYS")
    }    
  }, [timePeriod])


  function generateReportFunction(val){
    if(val==="Item")
    {
      sendItemReport({ period, storeId, merchantId })
    }
    else{
   sendReport({period,storeId,merchantId})
    }
}
useEffect(() => {
  setReportPopupMsg("")
}, []);

  const GenerateReportPopup = ({ children})=>{
    const isTablet = useMediaQuery({ minWidth: 1101 })
    return (<div className="fixed inset-0 overflow-y-auto h-full w-full z-10"
      style={{ backdropFilter: "brightness(0.4)" }}>
      <div
        className="font-medium p-5 opacity-100 bg-white mx-auto rounded-lg shadow-lg absolute top-0 bottom-0 left-0 my-auto right-0  w-1/2 h-1/2"
        style={{ height: isTablet?"280px":"350px", width:isTablet? "500px":"300px", opacity: "100%" }}
        id="my-modal"
      >

        <div className='flex justify-between'>
          <p className='font-bold text-md'>Export Report</p>
          <button className='text-lg font-semibold focus:outline-none' onClick={() => {setshowGenerateReportPopup(false);setReportPopupMsg("");setreportMsg("")}}>X</button>
        </div>
        <hr />
       <div>

        <p className='mt-5'>Generate <b>'{ReportPopupTitle}'</b> Reports.</p>
        <p >This report is for<b> {
          timePeriod==="Last7"?"Last Seven Days":
          timePeriod==="Last30"?"Last 30 Days":timePeriod          
        }</b></p>
        <p>Report will be Generated as a CSV (comma separated values) file and sent to mail id - <b>{user.email ? user.email : store.primary_email ? store.primary_email : "No Email Id available"}</b></p>
<p className='text-red-500 font-bold'>{children}</p>
        <div className='font-bold flex justify-end'>
          <button className='text-red-500 border-2 border-red-500 px-5 py-1 rounded-md mx-2 focus:outline-none' onClick={() => { setshowGenerateReportPopup(false); setReportPopupMsg("");setreportMsg("")}}>Cancel</button>
          <button className='bg-red-500 text-white px-5 py-1 rounded-md  focus:outline-none' style={{ background: "#F64B5D" }} onClick={() => { ReportPopupTitle === "Item Sales" ? generateReportFunction("Item"): generateReportFunction("")}}>
            Generate
          </button>
        </div>
        </div>
      </div>
    </div>)
  }
  const [reportMsg, setreportMsg] = useState("");
  useEffect(() => {
    setreportMsg(reportPopupMsg)
  }, [reportPopupMsg]);
  return (
    <>
      {/* HELMET AREA */}
      <Helmet>
        <title>GoPlinto Reports &amp; Analytics</title>
        <meta name="description" content="Reports and Analytics Page" />
      </Helmet>
      {/* NAVBAR */}
        {showGenerateReportPopup &&
        <GenerateReportPopup>
<p>{reportMsg}</p>
          </GenerateReportPopup>}
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between px-4 pt-4">
          <Desktop>
            <p className="flex text-sm md:text-lg text-black font-semibold text-muted-med">
              Reports & Analytics
              <NavLink to="/helpcenter/reports-analytics" className="ml-2" style={{ lineHeight: '31px' }}>
                {' '}
                <span className="flex items-center ml-4 font-normal " style={{ fontSize: '14px', color: '#2424247F' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>{' '}
                  Learn how to Use
                </span>
              </NavLink>
            </p>
            <TopNav />
          </Desktop>
          <Mobile>
            <p className="flex text-sm md:text-lg text-black font-semibold text-muted-med">Reports & Analytics</p>
            <NavLink to="/helpcenter/reports-analytics" className="ml-2" style={{ lineHeight: '31px' }}>
              {' '}
              <span className="flex items-center ml-4 font-normal " style={{ fontSize: '10px', color: '#2424247F' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>{' '}
                Learn how to Use
              </span>
            </NavLink>
          </Mobile>
        </div>
      </div>

      {(user.role_id !== 4)&& <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.REPORTS}>
        {/* MAIN SECTION */}

        <section className="p-4 md:px-8" style={{ paddingBottom: 100 }}>
          <div className=" pb-2 pt-2">
            <h3 className="item-label text-base md:text-lg" style={{ fontWeight: '900' }}>
              Store Reports
            </h3>
            {/* Date Selection Area */}
            <div className="md:flex gap-4 my-4 justify-between">
              <div className="md:flex gap-4 my-4">
                <div className="w-48  dd-magic mb-4">
                  <Select
                    className="bg-white border border-gray-400 rounded-lg "
                    options={options}
                    styles={customSelect}
                    isSearchable={false}
                    components={{ SingleValue: customSingleValue, IndicatorSeparator: () => null, DropdownIndicator }}
                    defaultValue={options.find(option => option.value === timePeriod)}
                    onChange={e => {
                      if (selectedStoreOption === 'All Stores') {
                        if (user.role_id === 2) getData(e.value, 'group', store.group_id)
                        else getData(e.value, 'store', storeId)
                      } else getData(e.value, 'store', selectedStoreOption)
                    }}
                  />
                </div>

                <br className="mobileVersion" />

                {reports && reports.currentTimeRange && reports.comparativeTimeRange && !loading && (
                  <small className="text-muted-light text-xs font-normal mt-2 px-2" ref={customDateSpan}>
                    {mode === 'Last7' || mode === 'Last30'
                      ? comparedCurrentDate
                      : moment(startDateEpoch)
                          .utc(true)
                          .format('MMM DD, YYYY')}{' '}
                    compared to{' '}
                    {mode === 'Last7' || mode === 'Last30'
                      ? comparedDate
                      : moment(comparativeDateEpoch)
                          .utc(true)
                          .format('MMM DD, YYYY')}
                  </small>
                )}
              </div>
              {storeOptions && storeOptions.length > 1 && user.role_id === 2 && (
                <div className="w-56 dd-magic mb-4">
                  <Select
                    className="bg-white border border-gray-400 rounded-lg "
                    options={storeOptions}
                    styles={customSelect}
                    isSearchable={false}
                    components={{
                      SingleValue: customSingleValue,
                      IndicatorSeparator: () => null,
                      DropdownIndicator,
                    }}
                    defaultValue={storeOptions[0]}
                    onChange={e => {
                      setSelectedStoreOption(e.value)
                      if (e.value === 'All Stores') getData(timePeriod, 'group', store.group_id)
                      else getData(timePeriod, 'store', e.value)
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <BarChart
            currency_symbol={currency_symbol}
            setshowGenerateReportPopup={setshowGenerateReportPopup}
            setReportPopupTitle={setReportPopupTitle}
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

          <LineAreaChart
            currency_symbol={currency_symbol}
            setshowGenerateReportPopup={setshowGenerateReportPopup}
            setReportPopupTitle={setReportPopupTitle}
            timePeriod={timePeriod}
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
          <div className="flex flex-row gap-6 flex-wrap md:flex-no-wrap">
            <Desktop>
              <div className="w-1/3">
                <div>
                <MiniBox
                  currency_symbol={currency_symbol}
                  title="Avg. Order Value"
                  value={reports && reports.averageOrderSales.averageSalesAmount}
                  subValue={(reports && reports.totalSales.relativeChange) || '0'}
                  toggleText="Total sales divided by the number of orders"
                />
              </div>
                  <div>
                  <MiniBox
                    currency_symbol=""
                    title="Total Site Visits"
                    value={reports && reports.averageOrderSales.averageSalesAmount}
                    subValue={(reports && reports.totalSales.relativeChange) || '0'}
                    toggleText="No. of site visits on your online store"
                  />
                  </div>
              </div>
              <div className="w-2/3">
                <TopProducts setReportPopupTitle={setReportPopupTitle} setshowGenerateReportPopup={setshowGenerateReportPopup} storeCurrency={store.currency_symbol} title="Top Products" data={top_products || []} />
              </div>
            </Desktop>
            <Mobile>
              <div className="w-full">
                <MiniBox
                  currency_symbol={currency_symbol}
                  title="Avg. Order Value"
                  value={reports && reports.averageOrderSales.averageSalesAmount||'0'}
                  subValue={(reports && reports.totalSales.relativeChange) || '0'}
                  toggleText="Total sales divided by the number of orders"
                />
                <MiniBox
                  currency_symbol=""
                  title="Total Site Visits"
                  value={reports && reports.averageOrderSales.averageSalesAmount}
                  subValue={(reports && reports.totalSales.relativeChange) || '0'}
                  toggleText="No. of site visits on your online store"
                />
                <TopProducts setReportPopupTitle={setReportPopupTitle} storeCurrency={store.currency_symbol} setshowGenerateReportPopup={setshowGenerateReportPopup} title="Top Products" data={top_products || []} />
              </div>
            </Mobile>
          </div>

          <Desktop>
            <div className="mt-8 pb-2">
              <h3 className="item-label text-base md:text-lg mb-8" style={{ fontWeight: '900' }}>
                Customer Reports
              </h3>
              <div className="w-1/3 bg-white rounded-lg" style={{ padding: '2rem' }}>
                <label className="item-label text-sm md:text-base font-semibold capitalize">Customer Details</label>
                <div className="mt-8 flex flex-col items-center">
                  <p className="item-label text-sm font-medium capitalize" style={{ textAlign: 'center' }}>
                    Get your customer information and their purchase history.
                  </p>
                  <img src={newOrderTag} />
                  <button
                    className="font-semibold text-base mt-6"
                    style={{ color: '#F64B5D' }}
                    onClick={() => {
                      setShowModal(true)
                    }}
                  >
                    Export Customer Details
                  </button>
                </div>
              </div>
            </div>
          </Desktop>
          <Mobile>
            <div className="mt-8 pb-2">
              <h3 className="item-label text-base md:text-lg mb-8" style={{ fontWeight: '900' }}>
                Customer Reports
              </h3>
              <div className="w-full bg-white rounded-lg" style={{ padding: '2rem' }}>
                <label className="item-label text-sm md:text-base font-semibold capitalize">Customer Details</label>
                <div className="mt-8 flex flex-col items-center">
                  <p className="item-label text-sm font-medium capitalize" style={{ textAlign: 'center' }}>
                    Get your customer information and their purchase history.
                  </p>
                  <img src={newOrderTag} />
                  <button
                    className="font-semibold text-base mt-6"
                    style={{ color: '#F64B5D' }}
                    onClick={() => {
                      setShowModal(true)
                    }}
                  >
                    Export Customer Details
                  </button>
                </div>
              </div>
            </div>
          </Mobile>
        </section>
      </IsFeatureSubscribed>}

      {showModal && (
        <Modal
          title="Export Customers"
          disableButton={error}
          closeModal={() => {
            setFirstLoad(true)
            setShowModal(false)
            setError('')
            setErrorMessage('')
          }}
          onCreateAttribute={() => {}}
          proceedTitle="Export"
          submit={() => {
            if (customerBaseOption !== '') {
              setCustomerBase(storeId, customerBaseOption)
              // setButtonPressed(!buttonPressed);
              setFirstLoad(false)
            }
          }}
        >
          <div className="containter">
            <p className="text-base font-medium">Choose which customer details you want to export:</p>

            <div className="flex flex-col">
              <div className="radioItem">
                <input
                  onClick={() => {
                    setCustomerBaseOption('ALL_REGISTERED')
                  }}
                  type="radio"
                  name="op1"
                  id="rb1"
                  defaultChecked={customerBaseOption === 'ALL_REGISTERED' || customerBaseOption === ''}
                />
                <label htmlFor="rb1" className="text-sm">
                  Registered Browsers/ All customers
                  <br />
                  <span className="text-xs">List of all the users who have created an account in your store.</span>
                </label>
              </div>

              <div className="radioItem">
                <input
                  onClick={() => {
                    setCustomerBaseOption('INACTIVE_CUSTOMERS')
                  }}
                  type="radio"
                  name="op1"
                  id="rb2"
                  defaultChecked={customerBaseOption === 'INACTIVE_CUSTOMERS'}
                />
                <label htmlFor="rb2" className="text-sm">
                  Idle/ Inactive Customers
                  <br />
                  <span className="text-xs">
                    List of users who have not visited or placed an order in the past 6 months span.
                  </span>
                </label>
              </div>

              <div className="radioItem">
                <input
                  onClick={() => {
                    setCustomerBaseOption('ABANDONED_CART_CUSTOMERS')
                  }}
                  type="radio"
                  name="op1"
                  id="rb3"
                  defaultChecked={customerBaseOption === 'ABANDONED_CART_CUSTOMERS'}
                />
                <label htmlFor="rb3" className="text-sm">
                  Cart Abandoners
                  <br />
                  <span className="text-xs">
                    List of users who have added items in the cart but haven't placed an order in the past 6 months
                    span.
                  </span>
                </label>
              </div>

              <div className="radioItem">
                <input
                  onClick={() => {
                    setCustomerBaseOption('ORDERED_CUSTOMERS')
                  }}
                  type="radio"
                  name="op1"
                  id="rb4"
                  defaultChecked={customerBaseOption === 'ORDERED_CUSTOMERS'}
                />
                <label htmlFor="rb4" className="text-sm">
                  Loyal customers
                  <br />
                  <span className="text-xs">
                    List of all the users who have placed one or more orders in the past 6 months span.
                  </span>
                </label>
              </div>

              <p className="text-sm" style={{ color: '#242424BF' }}>
                Details will be Exported as a CSV (comma separated values) file and sent to mail id -
                <span className="font-medium" style={{ color: '#242424' }}>
                  {' '}
                  {merchantEmail}
                </span>
              </p>

              {error ? (
                <p className="flex flex-row-reverse w-full md:w-3/4 mx-auto mt-6 text-red-500">{errorMessage}</p>
              ) : null}
            </div>
          </div>
        </Modal>
      )}
      <div className='sticky' style={{ paddingTop: "10rem" }}>
        <PaymentPromotionImages />
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  storeStats: makeSelectStoreStats(),
  customerBase: makeSelectCustomerBase(),
  merchantEmail: makeSelectMerchantEmail(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  subscribedTo: makeSelectSubscribedModules(),
  loading: makeSelectLoading(),
  reports: makeSelectReportAnalytics(),
  top_products: makeSelectTopProducts(),
  timePeriod: makeSelectTimePeriod(),
  store: makeSelectStore(),
  stores: makeSelectStores(),
  user: makeSelectUser(),
  storeGroupDetails: makeSelectStoreGroupDetils(),
  reportPopupMsg: makeSelectReportPopupMsg(),
})

const mapDispatchToProps = dispatch => ({
  setCustomerBase: (storeId, customerBaseOption) => dispatch(setCustomerBase(storeId, customerBaseOption)),
  setErrorMessage: text => dispatch(setErrorMessage(text)),
  setError: text => dispatch(setError({ boolean: text })),
  getReportAnalytics: (storeId, period, startDate, endDate) => {
    dispatch(getReportAnalytics(storeId, period, startDate, endDate))
  },
  getGroupReportAnalytics: (groupId, timePeriodString, startDate, endDate) => {
    dispatch(getGroupReportAnalytics(groupId, timePeriodString, startDate, endDate))
  },
  getTopProducts: (storeId, period) => {
    dispatch(getTopProducts(storeId, period))
  },
  getGroupTopProducts: (groupId, timePeriodString, startDate, endDate) => {
    dispatch(getGroupTopProducts(groupId, timePeriodString, startDate, endDate))
  },
  setTimePeriod: timePeriod => {
    dispatch(setTimePeriod(timePeriod))
  },
  setReportsLevel: levelDetails => {
    dispatch(setReportsLevel(levelDetails))
  },
  getStoresByGroupId: groupId => {
    dispatch(getStoresByGroupId(groupId))
  },
  getStoreData: storeId => {
    dispatch(getStoreData(storeId))
  }, 
  sendReport: ({ period, storeId, merchantId}) => {
    dispatch(sendReport({period,storeId,merchantId}))
  },  
  sendItemReport: ({ period, storeId, merchantId}) => {
    dispatch(sendItemReport({period,storeId,merchantId}))
  },
  setReportPopupMsg: (msg) => { dispatch(setReportPopupMsg(msg))}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reports)
