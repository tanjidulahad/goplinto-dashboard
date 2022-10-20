import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { useHistory, NavLink } from 'react-router-dom'

import FormPage from 'containers/HomePage/Form'

import { connect } from 'react-redux'

import { useInjectSaga } from 'utils/injectSaga'

import { TimePicker } from 'antd'
import moment from 'moment'
import saga from './saga'
import { getStoreSettings, setStoreSettings } from './actions'

const getOperatingDaysAsArray = operatingDays => {
  const operational = [0, 0, 0]
  if (operatingDays[0] === '1') operational[0] = 1
  if (operatingDays[1] === '1') operational[1] = 1
  if (operatingDays[2] === '1') operational[2] = 1
  return operational
}

const StoreSettingsPage = ({
  storeId,
  merchantId,
  submitStoreSettings,
  pageStatus,
  firstTime,
  settings,
  apiStatus,
}) => {
  useInjectSaga({ key: 'storeSettings', saga })

  const [openHoursStartTime, setOpenHoursStartTime] = useState(
    firstTime ? null : moment(settings.store_timings.start_time, 'HHmm'),
  )
  const [openHoursEndTime, setOpenHoursEndTime] = useState(
    firstTime ? null : moment(settings.store_timings.end_time, 'HHmm'),
  )
  const [deliveryStartTime, setDeliveryStartTime] = useState(
    firstTime
      ? null
      : settings.is_delivery_available === 'Y'
        ? moment(settings.delivery_timings.start_time, 'HHmm')
        : null,
  )
  const [deliveryEndTime, setDeliveryEndTime] = useState(
    firstTime
      ? null
      : settings.is_delivery_available === 'Y'
        ? moment(settings.delivery_timings.end_time, 'HHmm')
        : null,
  )
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(
    firstTime ? false : settings.is_delivery_available === 'Y',
  )

  const [isCheckoutAvailable, setIsCheckoutAvailable] = useState(
    firstTime ? false : settings.is_checkout_enabled === 'Y',
  )
  const [isConvenienceCharge, setIsConvenienceCharge] = useState(
    firstTime ? false : settings.is_convenience_fee_charged === 'Y',
  )

  const [freeDelivery, setFreeDelivery] = useState(firstTime ? false : settings.is_delivery_fee_charged === 'Y')
  const [pickupOnly, setPickupOnly] = useState(firstTime ? false : settings.is_pick_up_only === 'Y')

  const [workWeekDays, setWorkWeekDays] = useState(
    firstTime ? false : getOperatingDaysAsArray(settings.operating_days)[0] === 1,
  )
  const [workSaturdays, setWorkSaturdays] = useState(
    firstTime ? false : getOperatingDaysAsArray(settings.operating_days)[1] === 1,
  )
  const [workSundays, setWorkSundays] = useState(
    firstTime ? false : getOperatingDaysAsArray(settings.operating_days)[2] === 1,
  )

  const [cod, setCod] = useState(firstTime ? false : settings.is_cod_accepted === 'Y')
  const [onlineTransactions, setOnlineTransactions] = useState(firstTime ? false : settings.is_payment_accepted === 'Y')
  const [showValidationError, setShowValidationError] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')

  const getOperatingDays = () => {
    const operational = [0, 0, 0]

    if (workWeekDays) operational[0] = 1
    if (workSundays) operational[2] = 1
    if (workSaturdays) operational[1] = 1

    const days = operational.join().replace(/\,/g, '')
    return days
  }

  useEffect(() => {
    if (pickupOnly) {
      setFreeDelivery(false)
      setIsDeliveryAvailable(false)
      setIsDeliveryAvailable('')
    } else {
      setIsDeliveryAvailable(true)
    }
  }, [pickupOnly])

  useEffect(() => {
    if (isDeliveryAvailable) {
      setPickupOnly(false)
    }
  }, [isDeliveryAvailable])

  const onSubmitClick = () => {
    if (!openHoursStartTime || !openHoursEndTime) {
      setValidationMessage('*Please fill store timings')
      return setShowValidationError(true)
    }
    if (isDeliveryAvailable && (!deliveryStartTime || !deliveryEndTime)) {
      setValidationMessage('*Please fill delivery timings')
      return setShowValidationError(true)
    }
    if (moment(openHoursStartTime, 'HHmm') >= moment(openHoursEndTime, 'HHmm')) {
      setValidationMessage('*Opening time should be earlier than closing time')
      return setShowValidationError(true)
    }
    if (!pickupOnly && moment(deliveryStartTime, 'HHmm') >= moment(deliveryEndTime, 'HHmm')) {
      setValidationMessage('*Starting delivery time should be earlier than ending delivery time')
      return setShowValidationError(true)
    }

    if (!onlineTransactions && !cod) {
      setValidationMessage('*Please select atleast one mode of payment')
      return setShowValidationError(true)
    }
    const storeTimings = {
      start_time: moment(openHoursStartTime).format('HHmm'),
      end_time: moment(openHoursEndTime).format('HHmm'),
    }
    const deliveryTimings = {}
    if (!pickupOnly) {
      deliveryTimings.start_time = moment(deliveryStartTime).format('HHmm')
      deliveryTimings.end_time = moment(deliveryEndTime).format('HHmm')
    }
    const storeSettings = {
      groupId: '1',
      storeTimings,
      deliveryTimings,
      operatingDays: getOperatingDays(),
      isDeliveryAvailable: isDeliveryAvailable ? 'Y' : 'N',
      isParcelAvailable: 'N',
      isCheckoutEnabled: isCheckoutAvailable ? 'Y' : 'N',
      isConvenienceFeeCharged: isConvenienceCharge ? 'Y' : 'N',
      isDeliveryFeeCharged: freeDelivery ? 'N' : 'Y',
      isPickupOnly: pickupOnly ? 'Y' : 'N',
      deliveryLeadTime: 'NEXT_DAY',
      deliveryRange: 0,
      isCODAccepted: cod ? 'Y' : 'N',
      isOnlinePaymentAccepted: onlineTransactions ? 'Y' : 'N',
      isMultiCourse: 'N',
    }

    submitStoreSettings(storeId, merchantId, storeSettings)
    setShowValidationError(false)
  }

  const history = useHistory()

  useEffect(() => {
    if (pageStatus) {
      history.push('/app')
    }
  })

  return (
    <article>
      <Helmet>
        <title>Store Settings</title>
        <meta name="description" content="Store Settings page" />
      </Helmet>

      <FormPage
        onInvalid={() => {
          setValidationMessage('*Please fill all the required details before submitting')
          setShowValidationError(true)
        }}
        onSubmit={e => {
          e.preventDefault()
          onSubmitClick()
        }}
        className="flex flex-col w-full px-10 my-10 lg:w-4/5"
      >
        {/* <!--Title--> */}
        <div className="flex">
          <h1 className="text-xl heading">Store Settings </h1>
        </div>

        {/* <!--Card--> */}
        <div className="w-full p-8 mt-5 leading-normal text-gray-800 bg-white rounded-lg lg:mt-0">
          {/* <!--Title--> */}
          <div className="my-2">
            <label id="section1" htmlFor="store" className="mb-4 item-label">
              Store Timings
            </label>

            <div className="mx-2 my-2">
              <span>Opening Hours</span>
              <TimePicker
                className="mx-2"
                format="HH:mm"
                defaultValue={openHoursStartTime}
                required
                showNow={false}
                onChange={value => {
                  setOpenHoursStartTime(value)
                }}
              />
            </div>
            <div className="mx-2 my-2">
              <span>Closing Hours</span>
              <TimePicker
                className="mx-2"
                required
                format="HH:mm"
                defaultValue={openHoursEndTime}
                showNow={false}
                onChange={value => {
                  setOpenHoursEndTime(value)
                }}
              />
            </div>
          </div>
          <div className="my-10">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              General Settings
            </label>
            <div className="">
              <div className="my-5">
                <label className="flex items-center cursor-pointer">
                  <label className="mx-6">Need Checkout?</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={e => setIsCheckoutAvailable(e.target.checked)}
                      checked={isCheckoutAvailable}
                    />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                    <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                  </div>
                </label>
              </div>
              <div className="my-5">
                <label className="flex items-center cursor-pointer">
                  <label className="mx-6">Enable Convenience Charges</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isConvenienceCharge}
                      className="hidden"
                      onChange={e => setIsConvenienceCharge(e.target.checked)}
                    />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                    <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                  </div>
                </label>
              </div>
            </div>
            <div className="my-5">
              <div className="my-5">
                <label className="flex items-center cursor-pointer">
                  <label className="mx-6">Pickup Only</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={pickupOnly}
                      onChange={e => setPickupOnly(e.target.checked)}
                    />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                    <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                  </div>
                </label>
              </div>
              <div className="my-5">
                <label className="flex items-center cursor-pointer">
                  <label className="mx-6">Free Delivery?</label>
                  <div className={`relative ${pickupOnly || !isDeliveryAvailable ? 'cursor-not-allowed' : null}`}>
                    <input
                      type="checkbox"
                      disabled={pickupOnly || !isDeliveryAvailable}
                      checked={freeDelivery}
                      className="hidden"
                      onChange={e => setFreeDelivery(e.target.checked)}
                    />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                    <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="my-10">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Delivery and Parcel Settings
            </label>
            <div className="">
              <div className="my-5">
                <label className="flex items-center cursor-pointer">
                  <label className="mx-6">Turn On Delivery</label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isDeliveryAvailable}
                      onChange={e => setIsDeliveryAvailable(e.target.checked)}
                    />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                    <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                  </div>
                </label>
              </div>
            </div>
          </div>

          {isDeliveryAvailable && (
            <div className="my-10">
              <label id="section1" htmlFor="resName" className="mb-4 item-label">
                Delivery Timings
              </label>
              <div className="mx-2">
                <span>Delivery Start Time</span>
                <TimePicker
                  disabled={pickupOnly}
                  className="mx-2"
                  format="HH:mm"
                  defaultValue={deliveryStartTime}
                  showNow={false}
                  onSelect={value => setDeliveryStartTime(value)}
                />
                <span>Delivery Closing Time</span>
                <TimePicker
                  className="mx-2"
                  disabled={pickupOnly}
                  defaultValue={deliveryEndTime}
                  format="HH:mm"
                  showNow={false}
                  onSelect={value => setDeliveryEndTime(value)}
                />
              </div>
            </div>
          )}
          <div className="my-10">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Payment Settings
            </label>
            <div className="flex">
              <label className="flex items-center cursor-pointer">
                <label className="mx-6">Is COD Available?</label>
                <div className="relative">
                  <input type="checkbox" checked={cod} className="hidden" onChange={e => setCod(e.target.checked)} />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                  <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                </div>
              </label>
              <label className="flex items-center cursor-pointer">
                <label className="mx-6">Online Transactions</label>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={onlineTransactions}
                    className="hidden"
                    onChange={e => setOnlineTransactions(e.target.checked)}
                  />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                  <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                </div>
              </label>
            </div>
          </div>

          <div className="my-10">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Choose when you operate
            </label>
            <div className="mx-2">
              <div className="mx-4">
                <span>Weekdays</span>
                <input
                  type="checkbox"
                  checked={workWeekDays}
                  className="mx-2"
                  onChange={e => setWorkWeekDays(e.target.checked)}
                />
                <span>Saturday</span>
                <input
                  type="checkbox"
                  className="mx-2"
                  checked={workSaturdays}
                  onChange={e => setWorkSaturdays(e.target.checked)}
                />
                <span>Sunday</span>
                <input
                  type="checkbox"
                  className="mx-2"
                  checked={workSundays}
                  onChange={e => setWorkSundays(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
        {showValidationError && <p className="text-red-500">{validationMessage}</p>}
        {!apiStatus && <p className="text-red-500">*Something went wrong! Please try again!</p>}

        {/* <!--/Card--> */}

        <div className="flex justify-end">
          <NavLink to="/app">
            <button
              type="button"
              className="block w-auto mx-4 px-4 py-1 my-2 mt-12 text-3xl font-bold tracking-wider text-secondary uppercase shadow-md rounded-md border border-secondary hover:border-secondary-800"
            >
              <i className="fas fa-chevron-circle-left mr-2" />
              Cancel
            </button>
          </NavLink>

          <button
            type="submit"
            className="block w-auto px-4 py-1 my-2 mt-12 text-3xl font-bold tracking-wider text-white uppercase shadow-md bg-secondary rounded-md hover:bg-secondary-700"
          >
            Submit!
          </button>
        </div>
      </FormPage>
      {/* <!--/Section container-->
       */}

    </article>
  )
}

const mapStateToProps = state => ({
  storeId: state.get('global').user.storeId,
  merchantId: state.get('global').user.merchantId,
  settings: state.get('global').storeSettings,
})

const mapDispatchToProps = dispatch => ({
  submitStoreSettings: (storeId, merchantId, storeSettings) =>
    dispatch(setStoreSettings(storeId, merchantId, storeSettings)),
  getStoreSettings: storeId => dispatch(getStoreSettings(storeId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreSettingsPage)
