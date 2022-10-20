import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router'
import { NavLink, useLocation } from 'react-router-dom'
import walletMoney from '../../images/wallet_money.svg'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { Form, Input } from 'antd'
import onBoardStoreReducer from 'containers/OnBoardStore/reducer'
import { setSubscriptionPlan, setMerchantDetails, getStoreModules, setPageIndex } from './actions'
import saga from './saga'
import reducer from './reducer'
import { makeSelectCreditDetails } from "containers/AddCreditsPage/selectors"
import {
  makeSelectMerchantAddressId,
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectStoreModules,
  makeSelectMerchantDetails,
  makeSelectPageIndex,
} from './selectors'
import { makeSelectStore } from 'containers/Dashboard/selectors'
import { useMediaQuery } from 'react-responsive'
import creditsReducer from 'containers/AddCreditsPage/reducer'
import creditsSaga from 'containers/AddCreditsPage/saga'
import backImg from '../../images/icons/back.svg'
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import { numberInputValidation, validateContainOnlyWhitespace, validateOnlyAlphabets, validatePhone, validatePinCode } from 'utils/validation'

const CheckoutPage = ({
  storeId,
  merchantId,
  merchantAddressId,
  getStoreModules,
  setPageIndex,
  merchantDetails,
  pageIndex,
  store,
  creditDetails,
}) => {
  const history = useHistory()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState(null)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState(null)

  const loc = useLocation()
  const { planAmount, planType, planNumber, planDisplayName, CurrencySymbol, CurrencyCode, Country } = loc.state
  useEffect(() => {
    setFullName(merchantDetails&&merchantDetails.full_name)
  }, [])

  useEffect(() => {
    if (merchantAddressId) {
      openCheckout()
    }
  }, [merchantAddressId])

  useEffect(() => {
    getStoreModules(storeId)
  }, [storeId])

  useEffect(() => {
    setPhone(store&&store.primary_phone)
    setAddress(store&&store.address)
    setCity(store&&store.city)
    setState(store&&store.state)
    setCountry(Country ?Country:store&&store.country)
    setZipCode(store&&store.pincode)
  }, [])
  useInjectReducer({ key: 'checkoutPage', reducer })
  useInjectReducer({ key: 'onBoardStore', reducer: onBoardStoreReducer })
  useInjectSaga({ key: 'checkoutPage', saga })
  useInjectReducer({ key: 'creditDetails', reducer: creditsReducer })
  useInjectSaga({ key: 'creditDetails', saga: creditsSaga })
  const planAvailable = creditDetails.creditNumbers[planType] && creditDetails.creditNumbers[planType].number_of_credits
  useEffect(() => {
    setPageIndex(0)
  }, [])
  const BASE_URL = process.env.DASHBOARD_SERVICE_BASE_URL

  const [errors, setErrors] = useState({
    fullName: false,
    phone: false,
    invalidPhone: false,
    address: false,
    invalidAddress: false,
    city: false,
    state: false,
    country: false,
    zipCode: false,
    invalidZipCode: false
  })

  const onCheckout = () => {
    setErrors({
      fullName: false,
      phone: false,
      invalidPhone: false,
      address: false,
      invalidAddress: false,
      city: false,
      state: false,
      country: false,
      zipCode: false,
      invalidZipCode: false
    })

    if (!fullName||validateContainOnlyWhitespace(fullName)) setErrors(prev => ({ ...prev, fullName: true }))
    if (!phone) setErrors(prev => ({ ...prev, phone: true }))
    if (phone&&!validatePhone(phone.toString())) setErrors(prev => ({ ...prev, invalidPhone: true }))
 
    if (!address || validateContainOnlyWhitespace(address)) setErrors(prev => ({ ...prev, address: true }))
    if (!city || validateContainOnlyWhitespace(city)) setErrors(prev => ({ ...prev, city: true }))
      if (!zipCode) setErrors(prev => ({ ...prev, zipCode: true }))
      else if (!validatePinCode(zipCode)) setErrors(prev => ({ ...prev, invalidZipCode: true }))
    if (!state || validateContainOnlyWhitespace(state)) setErrors(prev => ({ ...prev, state: true }))
    if (!country || validateContainOnlyWhitespace(country)) setErrors(prev => ({ ...prev, country: true }))
      if (city && !validateOnlyAlphabets(city)) {
        setErrors(prev => ({ ...prev, invalidCity: true }))
      }
      if (state && !validateOnlyAlphabets(state)) {
        setErrors(prev => ({ ...prev, invalidState: true }))
      }
      if (country && !validateOnlyAlphabets(country)) {
        setErrors(prev => ({ ...prev, invalidCountry: true }))
      }

      if (!fullName||!phone||!address || !city
         || !zipCode || !validatePinCode(zipCode) || !state || !country || !validateOnlyAlphabets(state) || !validateOnlyAlphabets(city)
        || validateContainOnlyWhitespace(address) || validateContainOnlyWhitespace(city) || validateContainOnlyWhitespace(state) || validateContainOnlyWhitespace(country) 
       ||(phone && !validatePhone(phone.toString()))
        ) return;

    
    fetch(
      `${BASE_URL}marketing/create-new-rzp-order&storeId=${storeId}&amount=${planAmount}&currency=${
      CurrencyCode
      }`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        let options = {
          key: process.env.REACT_APP_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
          amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: data.currency,
          name: merchantDetails && merchantDetails.full_name,
          description: planNumber + ' credits of type ' + planType,
          order_id: data.id,
          handler (response) {
            fetch(`${BASE_URL}marketing/confirm-payment&merchantId=${merchantId}&storeId=${storeId}`, {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify({
                credit_type: planType,
                amount: parseInt(planAmount),
                number_of_credits: parseInt(planNumber),
                transaction_id: response.razorpay_payment_id,
                address: address,
                city: city,
                zip_code: parseInt(zipCode),
                state: state,
                country: country,
                name:fullName,
                phone:parseInt(phone)
              })
            })
            .then(res=>res.json())
            .then(data=>{
  
            setPageIndex(3);
            })
            .catch(err=>{console.log(err)
            
            })
          },
          prefill: {
            name: merchantDetails && merchantDetails.full_name,
            email: store && store.primary_email,
            contact: store && store.primary_phone,
          },
          notes: {
            address: 'GoPlinto Corporate office',
          },
          theme: {
            color: '#3399cc',
          },
        }

        let rzp1 = new window.Razorpay(options)
        rzp1.on('payment.failed', function(response) {})

        rzp1.open()
      })
      .catch(err => console.log(err))
  }
  const isTablet = useMediaQuery({ minWidth: 992 })
  const PurchaseSuccessPage = () => (
      <div className={isTablet ? 'p-10 mx-10 mt-10' : 'py-10 mx-0 mt-10'}>
        <div className={isTablet?'bg-white rounded-lg shadow-md p-10 mx-10 text-center':'bg-white rounded-lg shadow-md p-4 mx-5 text-center'}>
          <img src={walletMoney} className='mx-auto my-5 mb-10' />
          {isTablet?
          <h1 className='font-semibold text-lg '>
            <span className='font-bold text-xl text-red-600'> Purchase Successful.! </span>  {planNumber} Credits added to your {planDisplayName} Wallet.!
          </h1>
          :<div>
         <h1 className='font-bold text-lg text-red-600'>Purchase Successful.!</h1>
         <span className=' font-semibold text-md'>{planNumber} Credits added to your {planDisplayName} Wallet.!</span>
          </div>}
          <p className='text-md font-bold'>
            <span className='text-gray-600'>Available balance :</span>  {parseInt(planAvailable) + parseInt(planNumber)}
          </p>
        </div>
        <NavLink to="/app/general/marketing&branding" >
          <button onClick={() => setPageIndex(0)} className='font-semibold text-white rounded-md p-1 px-4 my-5 mx-auto flex justify-center focus:outline-none' style={{ backgroundColor: "#F64B5D" }}>Done.!</button>
        </NavLink>
      </div>
    )
  const currencySymbol = CurrencySymbol;
  return (
    <div>
      <div className="sticky flex justify-between bg-white z-10 mobile-topNav">
        {pageIndex !== 3 ? (
          <div
            className={
              isTablet
                ? 'flex flex-wrap content-center px-4 pt-4 text-xl font-semibold'
                : 'flex flex-wrap content-center px-0 pt-4 text-xl font-semibold'
            }
          >
            <div
              onClick={() => history.push("/app/general/marketing&branding/addCredits")}
              className="flex mr-4 text-xl font-medium text-black hover:text-secondary cursor-pointer"
            >
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="text-muted-med ml-2 mr-2 my-1" />
            </div>
            <p className="flex text-xl font-semibold text-muted-med">Go back</p>
          </div>
        ) : (
          <div className="flex flex-wrap content-center px-4 pt-4 text-xl font-semibold">
            <p className="flex text-xl font-semibold text-muted-med">Marketing & Branding</p>
          </div>
        )}
      </div>
      {pageIndex === 3 && <div>{PurchaseSuccessPage()}</div>}
      {pageIndex !== 3 && (
        <div>
          <div className="checkoutPage-content flex px-10 pt-5 justify-between ">
            <div className="checkoutPage-left-column">
              <div className="mb-6">
                <p className="item-label-title text-lg">Checkout</p>
                <div className="checkoutPage-card p-6 bg-white rounded-md flex justify-between items-center">
                  <div>
                    <p className="item-label text-base">{planDisplayName} Credits</p>
                    <p className="text-sm text-gray-500 font-semibold mt-0">{planNumber} Credits</p>
                  </div>
                  <div className="font-bold text-lg">
                    {currencySymbol} {planAmount}
                  </div>
                </div>
              </div>
              <div>
                <p className="item-label-title text-lg">Billing Information</p>
                <div className="checkoutPage-card p-6 bg-white rounded-md flex justify-between items-center">
                  <Form className="w-full" layout="vertical">
                    <div className={isTablet ? 'flex justify-between' : 'w-full'}>
                      <Form.Item className={isTablet ? 'checkout-form-item ' : ''} label="Name *">
                        <Input
                          className={`checkout-form-input ${ !fullName ? 'input-red' : ''}`}
                          placeholder={ 'Enter Full Name'}
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                        />
                        {errors.fullName && (
                          <span className="my-2 text-sm font-semibold text-secondary">Name is mandatory</span>
                        )}
                      </Form.Item>
                      <Form.Item className={isTablet ? 'checkout-form-item' : ''} label="Phone Number *">
                        <Input
                          type="number"
                          className={`checkout-form-input ${ !phone ? 'input-red ' : ''}`}
                          placeholder={ 'Enter Phone no'}
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          onKeyDown={e => numberInputValidation(e)}
                        />
                        {errors.phone && (
                          <span className="my-2 text-sm font-semibold text-secondary">Phone Number is mandatory</span>
                        )}
                         {phone&&errors.invalidPhone && (
                          <span className="my-2 text-sm font-semibold text-secondary">Phone Number is Invalid</span>
                        )}

                      </Form.Item>
                    </div>
                    <Form.Item className={isTablet ? 'checkout-form-item' : ''} label="Address *">
                      <Input
                        className={`checkout-form-input ${ !address ? 'input-red' : ''}`}
                        placeholder={ 'Enter Address'}
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                      />
                      {errors.address && (
                        <span className="my-2 text-sm font-semibold text-secondary">Address is mandatory</span>
                      )}
                        {address&&errors.invalidAddress && (
                        <span className="my-2 text-sm font-semibold text-secondary">Address is Invalid</span>
                      )}

                    </Form.Item>
                    <div className={isTablet && 'flex justify-between'}>
                      <Form.Item className={isTablet ? 'checkout-form-item' : ''} label="City *">
                        <Input
                          className={`checkout-form-input ${ !city ? 'input-red' : ''}`}
                          placeholder={ 'Enter City'}
                          value={city}
                          onChange={e => setCity(e.target.value)}
                        />
                        {errors.city && (
                          <span className="my-2 text-sm font-semibold text-secondary">City is mandatory</span>
                        )}
                      </Form.Item>
                      <Form.Item className={isTablet ? 'checkout-form-item' : ''} label="Pincode *">
                        <Input
                          type="number"
                          className={`checkout-form-input ${ !zipCode ? 'input-red' : ''}`}
                          placeholder={ 'Enter Pin Code'}
                          value={zipCode}
                          onChange={e => setZipCode(e.target.value)}
                          onKeyDown={e=>numberInputValidation(e)}
                        />
                        {errors.zipCode && (
                          <span className="my-2 text-sm font-semibold text-secondary">PinCode is mandatory</span>
                        )}
                        {zipCode&&errors.invalidZipCode && (
                          <span className="my-2 text-sm font-semibold text-secondary">PinCode is Invalid</span>
                        )}

                      </Form.Item>
                    </div>
                    <div className={isTablet && 'flex justify-between'}>
                      <Form.Item className={isTablet ? 'checkout-form-item' : ''} label="State *">
                        <Input
                          className={`checkout-form-input ${ !state ? 'input-red' : ''}`}
                          placeholder={ 'Enter State'}
                          value={state}
                          onChange={e => setState(e.target.value)}
                        />
                        {errors.state && (
                          <span className="my-2 text-sm font-semibold text-secondary">State is mandatory</span>
                        )}
                      </Form.Item>
                      <Form.Item className={isTablet ? 'checkout-form-item' : ''} label="Country *">
                        <Input
                          className={`checkout-form-input ${ !country ? 'input-red' : ''}`}
                          placeholder={ 'Enter Country'}
                          value={country}
                          onChange={e => setCountry(e.target.value)}
                        />
                        {errors.country && (
                          <span className="my-2 text-sm font-semibold text-secondary">Country is mandatory</span>
                        )}
                      </Form.Item>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="checkoutPage-right-column relative">
              <p className="item-label-title text-lg">Invoice</p>
              <div className="checkoutPage-card p-6 bg-white rounded-md ">
                <div className="py-2 flex justify-between border-b-2 border-dashed border-gray-600 text-gray-700 font-semibold">
                  <div>
                    Item Total <span className="text-green-600 text-xs">(Tax Inclusive)</span>
                  </div>
                  <div>
                    {currencySymbol} {planAmount}
                  </div>
                </div>
                <div className="py-2 flex justify-between font-bold text-center text-lg">
                  <div>Total Amount</div>
                  <div>
                    {currencySymbol} {planAmount}
                  </div>
                </div>
              </div>
              {isTablet && (
                <button
                  onClick={() =>onCheckout()}
                  className="checkout-button text-white bg-secondary text-center font-semibold text-base w-full rounded-md py-2 mt-5"
                >
                  Proceed to Pay {currencySymbol + ' ' + planAmount}
                </button>
              )}
            </div>
          </div>
          {!isTablet && (
            <div
              className="bg-white border-none w-full flex justify-center fixed p-1 mt-5 shadow-xl"
              style={{ bottom: '0px', border: '2px solid white' }}
            >
              <button
                onClick={() =>onCheckout()}
                className="text-white bg-secondary text-center font-semibold text-base w-5/6 rounded-md py-2"
          >
                Proceed to Pay {currencySymbol + ' ' + planAmount}
          </button>
            </div>
          )}
        </div>
      )}
          <div className='sticky' style={{marginTop:"10rem"}}>
        <PaymentPromotionImages widthProp="100vw" />
          </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  store: makeSelectStore(),
  merchantId: makeSelectMerchantId(),
  merchantAddressId: makeSelectMerchantAddressId(),
  storeModules: makeSelectStoreModules(),
  merchantDetails: makeSelectMerchantDetails(),
  pageIndex: makeSelectPageIndex(),
  creditDetails: makeSelectCreditDetails(),
})

const mapDispatchToProps = dispatch => ({
  setSubscriptionPlan: (planDetails, storeId) => dispatch(setSubscriptionPlan({ planDetails, storeId })),
  setMerchantDetails: ({ merchantDetails, merchantId, storeId }) =>
    dispatch(setMerchantDetails({ merchantDetails, merchantId, storeId })),
  getStoreModules: storeId => dispatch(getStoreModules({ storeId })),
  setPageIndex: pageIndex => dispatch(setPageIndex({ pageIndex })),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckoutPage)
