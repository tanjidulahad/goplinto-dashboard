import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'

import saga from './saga'
import reducer from './reducer'

import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Tooltip, notification } from 'antd'

import 'assets/DeliveryConfig.css'
import 'assets/PickUpAddress.css'

import BinaryToggle from 'components/BinaryToggle'

import {
  loadDeliveryPickupData,
  toggleFlags,
  updatePickupAddress,
  startPickupAddressUpdate,
  setPickupPointError,
  updateDeliveryRates,
  setDeliveryChargeError,
  getStoreAddress,
  setIsUpdatingDeliveryCharge
} from './actions'
import {
  makeSelectDeliveryState,
  makeSelectPickUpState,
  makeSelectStoreAddress,
  makeSelectIsUpdatingAddressState,
  makeSelectPickUpPointError,
  makeSelectGlobalUser,
  makeSelectDeliveryServiceAvailability,
  makeSelectDeliveryChargeError,
  makeSelectIsUpdatingDeliveryCharge,
  makeSelectSubscribedModules,
  makeSelectStore,
  makeSelectIsDelivery,
  makeSelectIsPickup
} from './selectors'

import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import { validateAlphaNumeric,validatePinCode, validateOnlyAlphabets, validateContainOnlyWhitespace, numberInputValidation } from 'utils/validation'
import NewFooter from 'components/Footer/newFooter'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'

const DeliveryConfiguration = ({
  delivery,
  pickup,
  isUpdatingPickupPoint,
  pickUpPointError,
  user,
  loadInitialConfig,
  toggleDeliveryPickupFlags,
  startAddressUpdate,
  updateAddress,
  setAddressSubmitError,
  deliveryServiceAvailability,
  updateDeliveryCharges,
  changeDeliveryChargeError,
  clearDeliveryChargeError,
  fetchStoreAddress,
  storeAddress,
  isUpdatingDeliveryCharge,
  clearIsUpdatingDeliveryCharges,
  subscribedTo,
  store
}) => {
  useInjectReducer({ key: 'deliveryPickupReducer', reducer })
  useInjectSaga({ key: 'deliveryPickupSaga', saga })

  const [deliverServiceAvailable, setDeliverServiceAvailable] = useState(deliveryServiceAvailability === 'Y')

  /* Delivery Charges Data */
  const [isDeliveryCharge, setisDeliveryCharge] = useState(false)
  const [deliveryCharge, setdeliveryCharge] = useState('')

  /* Delivery Charges Errors data */
  const [deliveryChargeError, setdeliveryChargeError] = useState('')

  /* PickUp Address data */
  const [pickup_point_name, setPickupPointName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zip_code, setZipCode] = useState('')

  /* PickUp Address Errors data */
  const [pickupNameError, setPickupNameError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')
  const [countryError, setCountryError] = useState('')
  const [zipcodeError, setZipCodeError] = useState('')

  const [addressUpdateError, setAddressUpdateError] = useState('')

  const history = useHistory()

  const [stateType, setstateType] = useState('default')

  useEffect(() => {
    if (deliveryServiceAvailability === 'Y') setDeliverServiceAvailable(true)
    loadInitialConfig('Delivery', user.storeId, user.merchantId)
    loadInitialConfig('Pickup', user.storeId, user.merchantId)
  }, [])

  useEffect(() => {
    setisDeliveryCharge(delivery.is_delivery_fee_charged === 'Y')
    if (delivery.delivery_details) {
      setdeliveryCharge(parseFloat(delivery.delivery_details.delivery_charge))
    }
  }, [delivery])

  useEffect(() => {
    if (stateType === 'edit_address') {
      if (delivery.is_delivery_fee_charged === 'N') setisDeliveryCharge(false)
      if (delivery.delivery_details && delivery.delivery_details.delivery_charge)
        setdeliveryCharge(parseFloat(delivery.delivery_details.delivery_charge))
      setdeliveryChargeError('')
    }
  })

  useEffect(() => {
    if (changeDeliveryChargeError) {
      openNotification('error', 'bottomRight', 'An error occured. Please try again later!')
      clearIsUpdatingDeliveryCharges(false)
    } else if (isUpdatingDeliveryCharge) {
      openNotification('success', 'bottomRight', 'Shipping rates updated successfully!')
      clearIsUpdatingDeliveryCharges(false)
    }
  }, [changeDeliveryChargeError, isUpdatingDeliveryCharge])

  useEffect(() => {
    if (isUpdatingPickupPoint) {
      if (pickUpPointError) {
        openNotification('error', 'bottomRight', 'An error occured. Please try again later!')
        startAddressUpdate(false)
        setAddressSubmitError(false)
      } else {
        startAddressUpdate(false)
        openNotification('success', 'bottomRight', 'Pickup address updated successfully!')
        setstateType('default')
      }
    }
  }, [isUpdatingPickupPoint, pickUpPointError])

  useEffect(() => {
    setPickupPointName(storeAddress.store_name)
    setAddress(storeAddress.address)
    setCity(storeAddress.city)
    setState(storeAddress.state)
    setCountry(storeAddress.country)
    setZipCode(storeAddress.pincode)
  }, [storeAddress])

  const openNotification = (type, placement, message) => {
    notification[type]({
      message: `${message}`,
      placement,
    })
  }

  const changeDeliveryCharges = e => {
    e.preventDefault()
    if (deliveryCharge === 0 || deliveryCharge.toString().length === 0)
      setdeliveryChargeError('Enter an amount greater than 0 INR')
    else updateDeliveryCharges(user.storeId, user.merchantId, deliveryCharge)
  }

  const checkValidity = () => {
    let flag = false
    
    if (pickup_point_name === '' || validateContainOnlyWhitespace(pickup_point_name)) {
      flag = true
      setPickupNameError('This field is required!')
    }

    if (address === '') {
      flag = true
      setAddressError('This field is required!')
    }else if (validateContainOnlyWhitespace(address)){
      flag = true
      setAddressError('This field is required!')
    }

    if (city === '') {
      flag = true
      setCityError('This field is required!')
    }else if (!validateOnlyAlphabets(city)){
      flag = true
      setCityError('Invalid City Name')
    }

    if (state === '') {
      flag = true
      setStateError('This field is required!')
    }else if (!validateOnlyAlphabets(state)){
      flag = true
      setStateError('Invalid State Name')
    }

    if (country === '') {
      flag = true
      setCountryError('This field is required!')
    }else if (!validateOnlyAlphabets(country)){
      flag = true
      setCountryError('Invalid Country Name')
    }

    if (zip_code.toString().length === 0) {
      flag = true
      setZipCodeError('This field is required!')
    } else if (!validatePinCode(zip_code)) {
      flag = true
      setZipCodeError('Enter a valid zip code!')
    }

    return flag
  }

  const saveChangesToPickupAddress = e => {
    e.preventDefault()
    if (!checkValidity()) {
      const updatedAddress = { pickup_point_name, address, city, state, country, zip_code }
      const pickupPointId =
        pickup.pickupPoints && pickup.pickupPoints.length > 0 ? pickup.pickupPoints[0].pickup_point_id : ''
      updateAddress(user.storeId, user.merchantId, pickupPointId, updatedAddress)
    }
  }

  const onChangeCleanup = () => {
    setPickupNameError('')
    setCityError('')
    setStateError('')
    setCountryError('')
    setAddressError('')
    setZipCodeError('')
    setAddressUpdateError('')
    setDeliveryChargeError('')
  }

  const preAddressEdit = type => {
    switch (type) {
      case 'edit':
        setPickupPointName(pickup.pickupPoints[0].pickup_point_name)
        setAddress(pickup.pickupPoints[0].address)
        setCity(pickup.pickupPoints[0].city)
        setState(pickup.pickupPoints[0].state)
        setCountry(pickup.pickupPoints[0].country)
        setZipCode(pickup.pickupPoints[0].zip_code)
        break
      case 'add':
        fetchStoreAddress(user.storeId)
      default:
        break
    }
  }

  return (
    <>
      <Helmet>
        <title>{stateType === 'edit_address' ? `Edit Pick Up Address` : `Edit Delivery Configuration`}</title>
        <meta
          name="description"
          content={`Edit ${stateType === 'edit_address' ? `Edit Pick Up Address` : `Edit Delivery Configuration`} `}
        />
      </Helmet>
      <ExtendedNavBar text={stateType === 'edit_address' ? `Edit Pick Up Address` : `Delivery & Shipping Configuration`} onBack={() => { history.goBack() }} />
      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.SHIPPING}>
        {stateType === 'default' ? (
          <div className="delivery_config__main_container">
            <h1>Delivery & Pickup Options</h1>
            {!deliverServiceAvailable ? (
              <div className="card__container">
                <div className="delivery__container">
                  <h1>Your store isn't delivering products at the moment</h1>
                  <button onClick={() => setDeliverServiceAvailable(true)}>Start Delivering</button>
                </div>
                <div className="card__container__info">
                  <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light flex-none" size={18} />
                  <span>
                    Create shipping rates for your city and your country. Customers can see their shipping costs at
                    checkout.
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="card__container__configured">
                  <div className="delivery__row">
                    <div className="delivery__details">
                      <h1>Delivery</h1>
                      <span>
                        Start shipping products to your customers, they can see the shipping costs at checkout.
                      </span>
                    </div>
                    <div className="delivery__toggle">
                      <BinaryToggle
                        activeColor="#f64b5d"
                        inactiveColor="#2424243f"
                          toggle={delivery.is_delivery_available === 'Y'}
                        toggleCallback={() => {
                          toggleDeliveryPickupFlags(
                            user.storeId,
                            user.merchantId,
                            'DELIVERY',
                            delivery.is_delivery_available === 'Y' ? 'N' : 'Y',
                          )
                        }}
                      />
                    </div>
                  </div>
                    {delivery.is_delivery_available === 'Y' && (
                    <>
                      <div className="shipping__toggle">
                        {isDeliveryCharge ? (
                          <MdCheckBox
                            className="checked"
                            size={30}
                            onClick={() => {
                              setisDeliveryCharge(false)
                              updateDeliveryCharges(user.storeId, user.merchantId, 0)
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            className="unchecked"
                            size={30}
                            onClick={() => {
                              setisDeliveryCharge(true)
                            }}
                            style={{ cursor: 'pointer' }}
                          />
                        )}
                        Charge Shipping Cost
                        <Tooltip
                          title={`Delivery charge is the amount you will be charging the customer for delivering the entire order they have placed. You can set a flat amount in ${store.currency_code}.`}
                          arrowPointAtCenter
                          color={'#242424'}
                        >
                          <AiOutlineInfoCircle
                            className="mr-2 ml-2 text-muted-light hover:text-black flex-none"
                            size={20}
                          />
                        </Tooltip>
                      </div>
                      {isDeliveryCharge && (
                        <div className="shipping__rate">
                          <h1>Shipping Rate</h1>
                          <div>
                            <b className="rupee_sign">{store.currency_symbol}</b>
                            <input
                              type="number"
                              step="any"
                              value={deliveryCharge}
                              onChange={e => {
                                setdeliveryChargeError('')
                                setdeliveryCharge(parseFloat(e.target.value))
                              }}
                              min={0}
                              onKeyDown={e => numberInputValidation(e)}
                              placeholder="Enter Rate"
                            />
                            <button onClick={changeDeliveryCharges}>Apply</button>
                          </div>
                          {deliveryChargeError !== '' && <p className="errorTxt">{deliveryChargeError}</p>}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="card__container__configured">
                  <div className="delivery__row">
                    <div className="delivery__details">
                      <h1>Self Pick-Up</h1>
                      <span>
                        Enable Self Pick-up option at checkout. Let customers pick up their orders in person, from the
                        location you give.
                      </span>
                    </div>
                    <div className="delivery__toggle">
                      <BinaryToggle
                        activeColor="#f64b5d"
                        inactiveColor="#2424243f"
                          toggle={(pickup.is_pickup_available === 'Y') }
                        toggleCallback={() => {
                          toggleDeliveryPickupFlags(
                            user.storeId,
                            user.merchantId,
                            'PICKUP',
                            (pickup.is_pickup_available === 'Y') ? 'N' : 'Y',
                          )
                        }}
                      />
                    </div>
                  </div>
                    {(pickup.is_pickup_available === 'Y') && (
                    <div className="address__row">
                      {pickup.pickupPoints && pickup.pickupPoints.length > 0 ? (
                        <>
                          <div className="address__row_left">
                            <h1>{pickup.pickupPoints[0].pickup_point_name}</h1>
                            <span>
                              {pickup.pickupPoints[0].address}, {pickup.pickupPoints[0].city}
                            </span>
                          </div>
                          <div className="address__row_right">
                            <button
                              onClick={e => {
                                e.preventDefault()
                                preAddressEdit('edit')
                                setstateType('edit_address')
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </>
                      ) : (
                        <span
                          onClick={e => {
                            e.preventDefault()
                            preAddressEdit('add')
                            setstateType('edit_address')
                          }}
                        >
                          Add Pick-Up Address
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="delivery_config__main_container">
            <h1>Pick-Up Address</h1>
            <div className="card__container">
              <form className="pickup__address_form">
                <div className="pickup__address__field">
                  <h1 className="pickup__address__fieldname">Pick Up Name *</h1>
                  <input
                    type="text"
                    value={pickup_point_name}
                    onChange={e => {
                      onChangeCleanup()
                      setPickupPointName(e.target.value)
                    }}
                    placeholder="Store Pick Up"
                    id="pickup__name"
                    className="pickup__address__input"
                  />
                  {pickupNameError !== '' && <p className="errorTxt">{pickupNameError}</p>}
                </div>
                <div className="pickup__address__field">
                  <h1 className="pickup__address__fieldname">Address *</h1>
                  <input
                    type="text"
                    value={address}
                    onChange={e => {
                      onChangeCleanup()
                      setAddress(e.target.value)
                    }}
                    placeholder="Enter full address"
                    className="pickup__address__input"
                  />
                  {addressError !== '' && <p className="errorTxt">{addressError}</p>}
                </div>
                <div className="inline__pickup__fields">
                  <div className="pickup__address__field" id="left__inline__field">
                    <h1 className="pickup__address__fieldname">City *</h1>
                    <input
                      type="text"
                      value={city}
                      onChange={e => {
                        onChangeCleanup()
                        setCity(e.target.value)
                      }}
                      placeholder="Enter City name"
                      className="pickup__address__input"
                    />
                    {cityError !== '' && <p className="errorTxt">{cityError}</p>}
                  </div>
                  <div className="pickup__address__field">
                    <h1 className="pickup__address__fieldname">Pincode *</h1>
                    <input
                      type="number"
                      value={zip_code}
                      onChange={e => {
                        onChangeCleanup()
                        setZipCode(e.target.value)
                      }}
                      min={0}
                      onKeyDown={e => numberInputValidation(e)}
                      placeholder="Enter pincode"
                      className="pickup__address__input"
                    />
                    {zipcodeError !== '' && <p className="errorTxt">{zipcodeError}</p>}
                  </div>
                </div>
                <div className="inline__pickup__fields">
                  <div className="pickup__address__field" id="left__inline__field">
                    <h1 className="pickup__address__fieldname">State *</h1>
                    <input
                      type="text"
                      value={state}
                      onChange={e => {
                        onChangeCleanup()
                        setState(e.target.value)
                      }}
                      placeholder="Enter State name"
                      className="pickup__address__input"
                    />
                    {stateError !== '' && <p className="errorTxt">{stateError}</p>}
                  </div>
                  <div className="pickup__address__field">
                    <h1 className="pickup__address__fieldname">Country *</h1>
                    <input
                      type="text"
                      value={country}
                      onChange={e => {
                        onChangeCleanup()
                        setCountry(e.target.value)
                      }}
                      placeholder="Enter Country name"
                      className="pickup__address__input"
                    />
                    {countryError !== '' && <p className="errorTxt">{countryError}</p>}
                  </div>
                </div>
              </form>
              <div className="card__container__info">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light flex-none" size={18} />
                <span>Let customers pick up their orders in person, from the location you give.</span>
              </div>
            </div>
            {addressUpdateError !== '' && <p className="errorTxt">{addressUpdateError}</p>}
            <button onClick={saveChangesToPickupAddress}>Save Changes</button>
          </div>
        )}
      </IsFeatureSubscribed>
 
      {/* footer */}
      <NewFooter/>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  delivery: makeSelectDeliveryState(),
  pickup: makeSelectPickUpState(),
  isUpdatingPickupPoint: makeSelectIsUpdatingAddressState(),
  pickUpPointError: makeSelectPickUpPointError(),
  user: makeSelectGlobalUser(),
  deliveryServiceAvailability: makeSelectDeliveryServiceAvailability(),
  changeDeliveryChargeError: makeSelectDeliveryChargeError(),
  storeAddress: makeSelectStoreAddress(),
  isUpdatingDeliveryCharge: makeSelectIsUpdatingDeliveryCharge(),
  subscribedTo: makeSelectSubscribedModules(),
  store: makeSelectStore(),
  isDelivery: makeSelectIsDelivery(),
  isPickup: makeSelectIsPickup(),
})

const mapDispatchToProps = dispatch => {
  return {
    loadInitialConfig: (kind, storeId, merchantId) => dispatch(loadDeliveryPickupData(kind, storeId, merchantId)),
    toggleDeliveryPickupFlags: (storeId, merchantId, flagType, flagValue) =>
      dispatch(toggleFlags(storeId, merchantId, flagType, flagValue)),
    updateAddress: (storeId, merchantId, pickupPointId, updatedAddress) =>
      dispatch(updatePickupAddress(storeId, merchantId, pickupPointId, updatedAddress)),
    startAddressUpdate: val => dispatch(startPickupAddressUpdate(val)),
    setAddressSubmitError: val => dispatch(setPickupPointError(val)),
    updateDeliveryCharges: (storeId, merchantId, deliveryFee) =>
      dispatch(updateDeliveryRates(storeId, merchantId, deliveryFee)),
    clearDeliveryChargeError: val => dispatch(setDeliveryChargeError(val)),
    fetchStoreAddress: storeId => dispatch(getStoreAddress(storeId)),
    clearIsUpdatingDeliveryCharges: val => dispatch(setIsUpdatingDeliveryCharge(val)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeliveryConfiguration)
