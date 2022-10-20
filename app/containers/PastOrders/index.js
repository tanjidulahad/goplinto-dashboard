import React, { useEffect, useState, useRef } from 'react'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { createStructuredSelector } from 'reselect'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import Select from 'react-select'
import enums from 'utils/orderStatusEnums'
import { connect } from 'react-redux'
import { notification } from 'antd'
import { customSelect } from 'utils/dropdownConfig'
import { FaRegCalendar } from 'react-icons/fa'

import Modal from 'components/ReportsModal'
import OrderSection from 'components/OrderSection'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import '../../assets/DateStyles.css'
import moment from 'moment'
import { DateRangePicker } from 'react-dates'

import reducer from './reducer'
import saga from './saga'

import hyphen from '../../images/icons/hyphen.svg'

import { getPastOrders, sendReport, hasMore } from './actions'
import { setErrorMessage, setError } from '../Reports/actions'
import { makeSelectPastOrders, makeSelectStore, makeSelectMerchantEmail } from './selectors'

const key = 'pastOrders'

const PastOrders = ({
  getOrders,
  store,
  pastOrders,
  merchantEmail,
  sendReport,
  setErrorMessage,
  setError,
  setHasMore,
}) => {
  useInjectReducer({ key: 'pastOrders', reducer })
  useInjectSaga({ key: 'pastOrders', saga })

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  // Switches between live and past orders

  const clicktb = () => {
    document.getElementById('tb-click').click()
  }

  const { deliveredOrders, cancelledOrders } = pastOrders
  const storeId = store.store_id

  const [currentPageStatus, setCurrentPageStatus] = useState(enums.ALL)
  const [currentPage, setCurrentPage] = useState(true)
  const [startDateEpoch, setStartDateEpoch] = useState(
    moment()
      .startOf('day')
      .unix(),
  )
  const [endDateEpoch, setEndDateEpoch] = useState(
    moment()
      .endOf('day')
      .unix(),
  )
  const [showMessage, setShowMessage] = useState(false)
  const [startDate, setStartDate] = useState(moment().subtract(1, 'weeks'))
  const [endDate, setEndDate] = useState(moment())
  const [focusedInput, setFocusedInput] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [datadate, setDataDate] = useState('Today')

  const [showModal, setShowModal] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [deliveredOrderpageNumber, setDeliveredOrderPageNumber] = useState(1)
  const [cancelledOrderpageNumber, setCancelledOrderPageNumber] = useState(1)

  useEffect(() => {
    if (currentPageStatus === 'ALL') {
      setPageNumber(1)
    }
    if (currentPageStatus === 'DELIVERED') {
      setPageNumber(deliveredOrderpageNumber)
    }
    if (currentPageStatus === 'CANCELLED') {
      setPageNumber(cancelledOrderpageNumber)
    }
    setHasMore(true)
  }, [currentPageStatus])

  useEffect(() => {
    if (currentPageStatus === 'ALL') getOrders(storeId, currentPageStatus, startDateEpoch, endDateEpoch, pageNumber)
    if (currentPageStatus === 'DELIVERED') {
      getOrders(storeId, currentPageStatus, startDateEpoch, endDateEpoch, pageNumber)
      setDeliveredOrderPageNumber(pageNumber)
    }
    if (currentPageStatus === 'CANCELLED') {
      getOrders(storeId, currentPageStatus, startDateEpoch, endDateEpoch, pageNumber)
      setCancelledOrderPageNumber(pageNumber)
    }
  }, [pageNumber])
  const openNotification = placement => {
    notification.success({
      message: `Email Sent Successfully!`,
      description: 'Please Check your inbox.',
      placement,
    })
  }

  const { error, errorMessage } = pastOrders

  useEffect(() => {
    if (error === false) {
      setShowModal(false)
    }
  }, [error])

  useEffect(() => {
    if (!firstLoad && !showModal) {
      openNotification('bottomRight')
      setError('')
      setErrorMessage('')
    }
  }, [showModal])

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
  }

  const handleOnClose = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
    const tempStartDate = startDate.startOf('day').unix()
    const tempEndDate = endDate.endOf('day').unix()
    setStartDateEpoch(tempStartDate)
    setEndDateEpoch(tempEndDate)
    setShowPopup(true)
  }

  const handleFocusChange = focusedInput => {
    setFocusedInput(focusedInput)
  }

  const today = String(moment().format('MMM DD, YYYY'))
  const yesterday = String(
    moment()
      .subtract(1, 'day')
      .format('MMM DD, YYYY'),
  )
  let customStartDate = ''
  let customEndDate = ''

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
      value: 'Custom',
      label: <span className="item-label-dropdown">Custom</span>,
      icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
    },
  ]

  const customDateSpan = useRef(0)

  const eventhandler = data => {
    customStartDate = data.startDate.format('MMM DD, YYYY')
    customEndDate = data.endDate.format('MMM DD, YYYY')
    customDateSpan.current.innerHTML = `From ${customStartDate} To ${customEndDate}`
  }

  return (
    <div className="ordersPage-ordersCategory-container min-h-screen" style={{ paddingBottom: '100px' }}>
      <Desktop>
        <MediaQuery minDeviceWidth={1025}>
          <div className="z-30 fixed pr-2" style={{ width: '77.5%', background: '#f2f2f2' }}>
            <div className="ordersPage-ordersCategory-list-past flex flex-row mx-6 justify-between items-center">
              {datadate !== 'Custom' && (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={() => setCurrentPageStatus(enums.ALL)}
                      className={`ordersPage-ordersCategory focus:outline-none w-auto mr-2 h-10 px-5 my-4 font-semibold rounded-md bg-white ${
                        currentPageStatus === enums.ALL ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                      }`}
                    >
                      All Orders
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPageStatus(enums.DELIVERED)}
                      className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${
                        currentPageStatus === enums.DELIVERED
                          ? 'border-2 border-secondary text-secondary'
                          : 'text-gray-500'
                      }`}
                    >
                      Delivered
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPageStatus(enums.CANCELLED)}
                      className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${
                        currentPageStatus === enums.CANCELLED
                          ? 'border-2 border-secondary text-secondary'
                          : 'text-gray-500'
                      }`}
                    >
                      Cancelled
                    </button>
                  </div>
                </>
              )}

              <div className="flex flex-row items-center font-semibold">
                {datadate === 'Custom' && (
                  <div style={{ marginRight: 17 }}>
                    <DateRangePicker
                      endDate={endDate}
                      endDateId="endDate"
                      focusedInput={focusedInput}
                      isOutsideRange={day => day.isAfter(moment()) || day.isBefore(moment().subtract(180, 'days'))}
                      onDatesChange={handleDateChange}
                      onFocusChange={handleFocusChange}
                      startDate={startDate}
                      startDateId="startDate"
                      customArrowIcon={<img src={hyphen} style={{ height: '12px', width: '12px' }} alt="-" />}
                      displayFormat="DD MMM"
                      customInputIcon={<FaRegCalendar />}
                      inputIconPosition="after"
                      hideKeyboardShortcutsPanel
                      navPrev={<i className="px-4 fas fa-chevron-left" />}
                      navNext={<i className="px-4 fas fa-chevron-right" />}
                      dayPickerNavigationInlineStyles={{ display: 'flex', justifyContent: 'space-between' }}
                      onClose={handleOnClose}
                    />
                  </div>
                )}
                <Select
                  className="bg-white w-48 ml-2.5 rounded-md border border-gray-400 rounded-lg focus:outline-none"
                  options={options}
                  styles={customSelect}
                  isSearchable={false}
                  components={{}}
                  value={{
                    value: datadate,
                    label: (
                      <span className="item-label flex flex-row items-center">
                        <span className="mr-4">
                          <FaRegCalendar />
                        </span>
                        {datadate}
                      </span>
                    ),
                    icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
                  }}
                  defaultValue={options[0]}
                  onChange={e => {
                    setDataDate(e.value)
                    if (e.value === 'Today' || e.value === 'Yesterday') {
                      setShowPopup(false)

                      if (e.value === 'Yesterday') {
                        setStartDateEpoch(
                          moment()
                            .add(-1, 'days')
                            .startOf('day')
                            .unix(),
                        )
                        setEndDateEpoch(
                          moment()
                            .add(-1, 'days')
                            .endOf('day')
                            .unix(),
                        )
                        const tempStartDate = moment()
                          .add(-1, 'days')
                          .startOf('day')
                          .unix()
                        const tempEndDate = moment()
                          .add(-1, 'days')
                          .endOf('day')
                          .unix()
                        getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                      } else {
                        setStartDateEpoch(
                          moment()
                            .startOf('day')
                            .unix(),
                        )
                        setEndDateEpoch(
                          moment()
                            .endOf('day')
                            .unix(),
                        )
                        const tempStartDate = moment()
                          .startOf('day')
                          .unix()
                        const tempEndDate = moment()
                          .endOf('day')
                          .unix()
                        getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                      }
                    } else if (e.value === 'Custom') {
                      setShowPopup(true)
                    }
                  }}
                />
                <MediaQuery minDeviceWidth={1100}>
                  <div className=" w-auto">
                    <div className="flex justify-end ">
                      <button
                        onClick={clicktb}
                        className="w-auto py-2 px-4 mx-5 my-4 font-light text-white rounded-lg ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
                      >
                        Live Orders
                      </button>
                    </div>
                  </div>
                </MediaQuery>
              </div>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1025}>
          <div className="z-50 sticky pr-2" style={{ width: '100%', background: '#f2f2f2', top: '54px', left: '0' }}>
            <div className="ordersPage-ordersCategory-list-past flex flex-row mx-6 justify-between items-center">
              {datadate !== 'Custom' && (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={() => setCurrentPageStatus(enums.ALL)}
                      className={`ordersPage-ordersCategory focus:outline-none w-auto mr-2 h-10 px-5 my-4 font-semibold rounded-md bg-white ${
                        currentPageStatus === enums.ALL ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                      }`}
                    >
                      All Orders
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPageStatus(enums.DELIVERED)}
                      className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${
                        currentPageStatus === enums.DELIVERED
                          ? 'border-2 border-secondary text-secondary'
                          : 'text-gray-500'
                      }`}
                    >
                      Delivered
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPageStatus(enums.CANCELLED)}
                      className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 my-4 font-semibold rounded-md bg-white ${
                        currentPageStatus === enums.CANCELLED
                          ? 'border-2 border-secondary text-secondary'
                          : 'text-gray-500'
                      }`}
                    >
                      Cancelled
                    </button>
                  </div>
                </>
              )}

              <div className="flex flex-row items-center font-semibold">
                {datadate === 'Custom' && (
                  <div style={{ marginRight: 17 }}>
                    <DateRangePicker
                      endDate={endDate}
                      endDateId="endDate"
                      focusedInput={focusedInput}
                      isOutsideRange={day => day.isAfter(moment()) || day.isBefore(moment().subtract(180, 'days'))}
                      onDatesChange={handleDateChange}
                      onFocusChange={handleFocusChange}
                      startDate={startDate}
                      startDateId="startDate"
                      customArrowIcon={<img src={hyphen} style={{ height: '12px', width: '12px' }} alt="-" />}
                      displayFormat="DD MMM"
                      customInputIcon={<FaRegCalendar />}
                      inputIconPosition="after"
                      hideKeyboardShortcutsPanel
                      navPrev={<i className="px-4 fas fa-chevron-left" />}
                      navNext={<i className="px-4 fas fa-chevron-right" />}
                      dayPickerNavigationInlineStyles={{ display: 'flex', justifyContent: 'space-between' }}
                      onClose={handleOnClose}
                    />
                  </div>
                )}
                <Select
                  className="bg-white w-48 ml-2.5 rounded-md border border-gray-400 rounded-lg focus:outline-none"
                  options={options}
                  styles={customSelect}
                  isSearchable={false}
                  components={{}}
                  value={{
                    value: datadate,
                    label: (
                      <span className="item-label flex flex-row items-center">
                        <span className="mr-4">
                          <FaRegCalendar />
                        </span>
                        {datadate}
                      </span>
                    ),
                    icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
                  }}
                  defaultValue={options[0]}
                  onChange={e => {
                    setDataDate(e.value)
                    if (e.value === 'Today' || e.value === 'Yesterday') {
                      setShowPopup(false)

                      if (e.value === 'Yesterday') {
                        setStartDateEpoch(
                          moment()
                            .add(-1, 'days')
                            .startOf('day')
                            .unix(),
                        )
                        setEndDateEpoch(
                          moment()
                            .add(-1, 'days')
                            .endOf('day')
                            .unix(),
                        )
                        const tempStartDate = moment()
                          .add(-1, 'days')
                          .startOf('day')
                          .unix()
                        const tempEndDate = moment()
                          .add(-1, 'days')
                          .endOf('day')
                          .unix()
                        getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                      } else {
                        setStartDateEpoch(
                          moment()
                            .startOf('day')
                            .unix(),
                        )
                        setEndDateEpoch(
                          moment()
                            .endOf('day')
                            .unix(),
                        )
                        const tempStartDate = moment()
                          .startOf('day')
                          .unix()
                        const tempEndDate = moment()
                          .endOf('day')
                          .unix()
                        getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                      }
                    } else if (e.value === 'Custom') {
                      setShowPopup(true)
                    }
                  }}
                />
                <MediaQuery minDeviceWidth={1100}>
                  <div className=" w-auto">
                    <div className="flex justify-end ">
                      <button
                        onClick={clicktb}
                        className="w-auto py-2 px-4 mx-5 my-4 font-light text-white rounded-lg ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
                      >
                        Live Orders
                      </button>
                    </div>
                  </div>
                </MediaQuery>
              </div>
            </div>
          </div>
        </MediaQuery>
      </Desktop>

      <MediaQuery maxDeviceWidth={769}>
        <div
          className="flex font-semibold flex-row-reverse justify-between items-center md:px-4 z-10"
          style={{ marginBottom: '5px', zIndex: '10', padding: '0 8px' }}
        >
          <Select
            className="bg-white ml-2.5 rounded-md pastOrderDropdown z-10 border border-gray-400 rounded-lg focus:outline-none"
            options={options}
            styles={customSelect}
            isSearchable={false}
            components={{}}
            value={{
              value: datadate,
              label: (
                <span className="item-label flex flex-row items-center">
                  <span className="mr-2">
                    <FaRegCalendar />
                  </span>
                  {datadate}
                </span>
              ),
              icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
            }}
            defaultValue={options[0]}
            onChange={e => {
              setDataDate(e.value)
              if (e.value === 'Today' || e.value === 'Yesterday') {
                setShowPopup(false)

                if (e.value === 'Yesterday') {
                  setStartDateEpoch(
                    moment()
                      .add(-1, 'days')
                      .startOf('day')
                      .unix(),
                  )
                  setEndDateEpoch(
                    moment()
                      .add(-1, 'days')
                      .endOf('day')
                      .unix(),
                  )
                  const tempStartDate = moment()
                    .add(-1, 'days')
                    .startOf('day')
                    .unix()
                  const tempEndDate = moment()
                    .add(-1, 'days')
                    .endOf('day')
                    .unix()
                  getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                  setPageNumber(1)
                } else {
                  setStartDateEpoch(
                    moment()
                      .startOf('day')
                      .unix(),
                  )
                  setEndDateEpoch(
                    moment()
                      .endOf('day')
                      .unix(),
                  )
                  const tempStartDate = moment()
                    .startOf('day')
                    .unix()
                  const tempEndDate = moment()
                    .endOf('day')
                    .unix()
                  getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                }
              } else if (e.value === 'Custom') {
                setShowPopup(true)
              }
            }}
          />

          {datadate === 'Custom' && (
            <div style={{ width: '70%', zIndex: '10' }}>
              <DateRangePicker
                endDate={endDate}
                orientation="vertical"
                endDateId="endDate"
                focusedInput={focusedInput}
                isOutsideRange={day => day.isAfter(moment()) || day.isBefore(moment().subtract(180, 'days'))}
                onDatesChange={handleDateChange}
                onFocusChange={handleFocusChange}
                startDate={startDate}
                startDateId="startDate"
                customArrowIcon={<img src={hyphen} style={{ height: '12px', width: '12px' }} alt="-" />}
                displayFormat="DD MMM"
                customInputIcon={<FaRegCalendar />}
                inputIconPosition="after"
                hideKeyboardShortcutsPanel
                navPrev={<i className="px-4 pt-5 fas fa-chevron-left" />}
                navNext={<i className="px-4 pt-5 fas fa-chevron-right" />}
                dayPickerNavigationInlineStyles={{
                  display: 'flex',
                  justifyContent: 'justify-between',
                }}
                onClose={handleOnClose}
              />
            </div>
          )}
        </div>
      </MediaQuery>

      <Mobile>
        <div
          className="sticky px-6"
          style={{
            width: '100%',
            background: '#f2f2f2',
            padding: '10px 10px 10px 0px',
            top: '54px',
            left: '0',
          }}
        >
          <div className="ordersPage-ordersCategory-list-past flex flex-col px-2" style={{ marginLeft: '0' }}>
            <MediaQuery minDeviceWidth={769}>
              <div
                className="flex font-semibold flex-row-reverse justify-between items-center md:px-4"
                style={{ marginBottom: '16px' }}
              >
                <Select
                  className="bg-white ml-2.5 rounded-md pastOrderDropdown border border-gray-400 rounded-lg focus:outline-none"
                  options={options}
                  styles={customSelect}
                  isSearchable={false}
                  components={{}}
                  value={{
                    value: datadate,
                    label: (
                      <span className="item-label flex flex-row items-center">
                        <span className="mr-2">
                          <FaRegCalendar />
                        </span>
                        {datadate}
                      </span>
                    ),
                    icon: <FaRegCalendar className="inline-block my-2 item-label mx-2" />,
                  }}
                  defaultValue={options[0]}
                  onChange={e => {
                    setDataDate(e.value)
                    if (e.value === 'Today' || e.value === 'Yesterday') {
                      setShowPopup(false)

                      if (e.value === 'Yesterday') {
                        setStartDateEpoch(
                          moment()
                            .add(-1, 'days')
                            .startOf('day')
                            .unix(),
                        )
                        setEndDateEpoch(
                          moment()
                            .add(-1, 'days')
                            .endOf('day')
                            .unix(),
                        )
                        const tempStartDate = moment()
                          .add(-1, 'days')
                          .startOf('day')
                          .unix()
                        const tempEndDate = moment()
                          .add(-1, 'days')
                          .endOf('day')
                          .unix()
                        getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                      } else {
                        setStartDateEpoch(
                          moment()
                            .startOf('day')
                            .unix(),
                        )
                        setEndDateEpoch(
                          moment()
                            .endOf('day')
                            .unix(),
                        )
                        const tempStartDate = moment()
                          .startOf('day')
                          .unix()
                        const tempEndDate = moment()
                          .endOf('day')
                          .unix()
                        getOrders(storeId, currentPageStatus, tempStartDate, tempEndDate, 1)
                      }
                    } else if (e.value === 'Custom') {
                      setShowPopup(true)
                    }
                  }}
                />

                {datadate === 'Custom' && (
                  <div style={{ width: '70%' }}>
                    <DateRangePicker
                      endDate={endDate}
                      orientation="vertical"
                      endDateId="endDate"
                      focusedInput={focusedInput}
                      isOutsideRange={day => day.isAfter(moment()) || day.isBefore(moment().subtract(180, 'days'))}
                      onDatesChange={handleDateChange}
                      onFocusChange={handleFocusChange}
                      startDate={startDate}
                      startDateId="startDate"
                      customArrowIcon={<img src={hyphen} style={{ height: '12px', width: '12px' }} alt="-" />}
                      displayFormat="DD MMM"
                      customInputIcon={<FaRegCalendar />}
                      inputIconPosition="after"
                      hideKeyboardShortcutsPanel
                      navPrev={<i className="px-4 pt-5 fas fa-chevron-left" />}
                      navNext={<i className="px-4 pt-5 fas fa-chevron-right" />}
                      dayPickerNavigationInlineStyles={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                      onClose={handleOnClose}
                    />
                  </div>
                )}
              </div>
            </MediaQuery>
            {datadate !== 'Custom' && (
              <div className="ordersPage-ordersCategory-list flex items-center mx-6 py-2" style={{ marginLeft: 0 }}>
                <button
                  type="button"
                  onClick={() => setCurrentPageStatus(enums.ALL)}
                  className={`ordersPage-ordersCategory focus:outline-none w-auto mr-2 h-10 px-5 font-semibold rounded-md bg-white ${
                    currentPageStatus === enums.ALL ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                  }`}
                >
                  All Orders
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPageStatus(enums.DELIVERED)}
                  className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 font-semibold rounded-md bg-white ${
                    currentPageStatus === enums.DELIVERED ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                  }`}
                >
                  Delivered
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPageStatus(enums.CANCELLED)}
                  className={`ordersPage-ordersCategory focus:outline-none mx-2 w-auto h-10 px-5 font-semibold rounded-md bg-white ${
                    currentPageStatus === enums.CANCELLED ? 'border-2 border-secondary text-secondary' : 'text-gray-500'
                  }`}
                >
                  Cancelled
                </button>
              </div>
            )}
            <MediaQuery minDeviceWidth={1100}>
              <div className=" w-auto">
                <div className="flex justify-end ">
                  <button
                    onClick={clicktb}
                    className="w-auto py-2 px-4 mx-5 my-4 font-light text-white rounded-lg ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
                  >
                    Live Orders
                  </button>
                </div>
              </div>
            </MediaQuery>
          </div>
        </div>
      </Mobile>

      {!showPopup ? (
        <div className="px-3 past_orders_upperSpace">
          <div>
            {currentPageStatus === enums.ALL && (
              <div className="ordersPage-orders-container flex flex-col">
                <div className="mb-6">
                  <OrderSection
                    type={enums.PAST_DELIVERED}
                    orders={deliveredOrders}
                    max={10}
                    setCurrentPageStatus={setCurrentPageStatus}
                  />
                </div>
                <div className="mb-6">
                  <OrderSection
                    type={enums.PAST_CANCELLED}
                    orders={cancelledOrders}
                    max={10}
                    setCurrentPageStatus={setCurrentPageStatus}
                  />
                </div>
              </div>
            )}
            {currentPageStatus === enums.CANCELLED && (
              <div className="ordersPage-orders-container flex flex-col">
                <div className="mb-6">
                  <OrderSection type={enums.PAST_CANCELLED} orders={cancelledOrders} />
                </div>
              </div>
            )}
            {currentPageStatus === enums.DELIVERED && (
              <div className="ordersPage-orders-container flex flex-col">
                <div className="mb-6">
                  <OrderSection type={enums.PAST_DELIVERED} orders={deliveredOrders} />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col justify-center items-center past_ordersReports_upperSpace">
          <div className="w-full md:w-2/4 px-4" style={{ textAlign: 'center' }}>
            <p className="text-xs md:text-lg font-medium" style={{ color: '#242424' }}>
              Orders in that time range cannot be viewed here.
              <br /> You can generate the reports and get it as mail.!
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-auto h-12 px-4 mx-5 my-4 font-semibold text-white rounded-lg ordersPage-orderButton hover:bg-secondary-600 focus:outline-none bg-secondary"
          >
            Generate Reports
          </button>
        </div>
      )}
      {currentPageStatus !== 'ALL' && (
        <div className="flex justify-around absolute bottom-2	right-2.5 w-25" style={{ bottom: '70px', right: '50px' }}>
          {pageNumber > 1 ? (
            <button
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <button
              disabled
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2"
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {pastOrders.hasMore ? (
            <button
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              disabled
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {showModal && (
        <Modal
          title="Generate Report"
          disableButton={error}
          closeModal={() => {
            setFirstLoad(true)
            setShowModal(false)
            setError('')
            setErrorMessage('')
          }}
          onCreateAttribute={() => {}}
          submit={() => {
            sendReport(storeId, enums, startDateEpoch, endDateEpoch)

            setFirstLoad(false)
          }}
          proceedTitle="Generate"
        >
          <div className="containter">
            <p className="text-base">
              Generate{' '}
              <span className="font-medium" style={{ color: 'black' }}>
                {' '}
                'Past Orders'
              </span>{' '}
              Reports.
            </p>
            <p className="text-base">
              Report will be Generated as a CSV (comma separated values) file and sent to mail id -{' '}
              <span className="font-medium" style={{ color: 'black' }}>
                {merchantEmail}
              </span>
            </p>
            {error ? (
              <p
                className="flex flex-row-reverse w-full md:w-3/4 mx-auto mt-6 text-red-500"
                style={{ marginRight: '1rem' }}
              >
                {errorMessage}
              </p>
            ) : null}
          </div>
        </Modal>
      )}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  store: makeSelectStore(),
  pastOrders: makeSelectPastOrders(),
  merchantEmail: makeSelectMerchantEmail(),
})

const mapDispatchToProps = dispatch => ({
  getOrders: (storeId, status, startDateEpoch, endDateEpoch, pageNumber) =>
    dispatch(getPastOrders({ storeId, status, startDateEpoch, endDateEpoch, pageNumber })),
  sendReport: (storeId, status, startDateEpoch, endDateEpoch) =>
    dispatch(sendReport(storeId, status, startDateEpoch, endDateEpoch)),
  setErrorMessage: text => dispatch(setErrorMessage(text)),
  setError: text => dispatch(setError({ boolean: text })),
  setHasMore: boolean => dispatch(hasMore(boolean)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PastOrders)
