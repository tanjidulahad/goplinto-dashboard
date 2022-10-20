import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { useHistory, NavLink } from 'react-router-dom'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { setPageSubmissionStatus, getStoreTypes } from 'containers/App/actions'
import homePageSaga from 'containers/HomePage/saga'
import homePageReducer from 'containers/HomePage/reducer'
import appReducer from 'containers/App/reducer'
import { createStore, updateStore, getStoreData } from 'containers/HomePage/actions'
import { createStructuredSelector } from 'reselect'
import './styles.css'
import storeDetailsSaga from 'containers/StoreDetails/saga'
import contactInfoSaga from 'containers/ContactInfo/saga'
import planCheckoutSaga from 'containers/CheckoutPage/saga'
import { makeSelectAvailableStoreTypes } from 'containers/StoreDetails/selectors'
import { makeSelectClientDetails } from '../Auth/selectors'
import { setStoreDetails } from 'containers/StoreDetails/actions'
import { getContactInfo, setContactInfo } from 'containers/ContactInfo/actions'
import { getSubscribedModules } from 'containers/App/actions'
import { setShowFeaturesCarousel } from 'containers/Auth/actions'
import { convertToFLUpperCase, validateAlphaNumeric, validateContainOnlyWhitespace, validateEmail, validateOnlyNumber, validatePhone, validatePinCode } from 'utils/validation'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import RingLoader from 'react-spinners/RingLoader'
import onlineImg from '../../images/isonline.svg'

import TopNav from 'components/TopNav'

import StoreDetailsUpdate from './StoreDetailsUpdate'
import RegionAndCurrencyInfo from "../RegionAndCurrencyInfo/index"
import CreateStore from './CreateStore'
import reducer from './reducer'
import { makeSelectMerchantId, makeSelectStore, makeSelectStoreId, getPageIndex, getPageStatus, makeSelectStoreOnboardStatus, makeSelectContactInfo } from './selectors'
import { makeSelectSubscribedModules } from 'containers/StoreInfoPage/selectors'
import { makeSelectGlobalUser } from 'containers/Auth/selectors'
import saga from './saga'
import { setPageIndex, setOnBoardProgress } from './actions'
import makeStoreUrl from 'utils/makeStoreUrl'
import { getAllCountryDetails } from 'containers/RegionAndCurrencyInfo/actions'
import contactInfoReducer from 'containers/ContactInfo/reducer'
const OnBoardStore = ({
  merchantId,
  storeId,
  createStoreForMerchant,
  store,
  setPageStatus,
  pageIndex,
  setPageIndexFlow,
  pageStatus,
  getStoreTypes,
  storeTypes,
  setStoreDetails,
  setContactInfo,
  setOnBoardProgress,
  getStoreData,
  clientDetails,
  setShowFeatures,
  subscribedTo,
  getSubscriptionDetails,
  user,
  storeOnboardStatus, 
  getContactInfo,
  getAllCountryDetails,
  contactInfo
}) => {
  useInjectReducer({ key: 'home', reducer: homePageReducer })
  useInjectReducer({ key: 'onBoardStore', reducer })
  useInjectReducer({ key: 'app', reducer: appReducer })
  useInjectSaga({ key: 'home', saga: homePageSaga })
  useInjectSaga({ key: 'onBoardStore', saga })
  useInjectSaga({ key: 'storeDetails', saga: storeDetailsSaga })
  useInjectSaga({ key: 'contactInfo', saga: contactInfoSaga })
  useInjectReducer({ key: 'contactInfo', reducer: contactInfoReducer })
  useInjectSaga({ key: 'planCheckout', saga: planCheckoutSaga })
  const history = useHistory()
  const [storeOpen, setStoreOpen] = useState(!!(store && store.is_open_today === 'Y'))
  const [isContact, showContactInput] = useState(false)
  const [loading, setLoading] = useState(true)
  const [storeType, setStoreType] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [errorName, setErrorName] = useState('')
  const [errorDesc, setErrorDesc] = useState('')
  const [errorStoreType, setErrorStoreType] = useState('')
  const [errorAddress, setErrorAddress] = useState('')
  const [errorCity, setErrorCity] = useState('')
  const [errorState, setErrorState] = useState('')
  const [errorPin, setErrorPin] = useState('')
  const [errorCountry, setErrorCountry] = useState('')
  const [errorWhatsapp, setErrorWhatsapp] = useState('')
  const [formInput, setFormInput] = useState({
    storeName: '',
    storeDesc: '',
    storeEmail: '',
    storePhone: '',
    storePhoneCode: '',
    storePhoneFlag: '',
    storeAddress: '',
    storeCity: '',
    storeState: '',
    storePin: '',
    storeCountry: '',
    storeIsContactAvailable: '',
    whatsappNumber: '',
    whatsappNumberCode: '',
    whatsappNumberFlag: '',
    storeCurrencySymbol:'',
    storeTimezone:'',
    storeCurrencyCode:'',
  })
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 992 })

  const navigatePageIndex = React.useCallback(
    value => {
      setPageIndexFlow(value)
    },
    [pageIndex],
  )
  const toggleContactInput = e => showContactInput(!isContact)

  const onCreateStore = () => {
    const { storeName, storeDesc } = formInput
    const store_type = storeType ? storeType.value.toUpperCase() : ''

    let issue=false;

    if (!storeName || storeName === '' || validateContainOnlyWhitespace(storeName)) {
      setErrorName('Field is mandatory')
      issue=true;
    }
    if (!storeType || Object.keys(storeType).length === 0) {
      setErrorStoreType('Field is mandatory')
      issue = true;
    }
    if (!storeDesc || storeDesc === '' || validateContainOnlyWhitespace(storeDesc)) {
      setErrorDesc('Field is mandatory')
      issue = true;
    }
    if (issue) return;

    if (!storeId) {
      createStoreForMerchant(storeName, store_type, storeDesc, merchantId, clientDetails && clientDetails.partner)
    } else {
      const { storeName, storeDesc } = formInput
      setStoreDetails({
        storeId,
        merchantId,
        storeName,
        storeType,
        storeDesc,
      })
    }

    storeId && setOnBoardProgress('IN_PROGRESS_2', storeId, merchantId)
    setErrorName('')
    setErrorStoreType('')
    setErrorDesc('')
    navigatePageIndex(2)
  }

  const onUpdateStore = () => {
    const {
      storeEmail,
      storePhone,
      storePhoneCode,
      storeAddress,
      storeCity,
      storeState,
      storePin,
      storeCountry,
      whatsappNumber,
      whatsappNumberCode,
    } = formInput
    let issue = false;
    if (!storeEmail || storeEmail === '') {
      setErrorEmail('Field is mandatory')
      issue = true;
    }
    if (!validateEmail(storeEmail)) {
      setErrorEmail('Email is not valid')
      issue = true;
    }
    if (!storePhone || storePhone === '') {
      setErrorPhone('Field is mandatory')
      issue = true;
    }
    if (!validatePhone(storePhone.toString())) {
      setErrorPhone('Phone number is not valid')
      issue = true;
    }

    if (whatsappNumber && !validatePhone(whatsappNumber.toString())) {
      setErrorWhatsapp('Whatsapp number is not valid')
      issue = true;
    }

    if (isContact && (!storeAddress || storeAddress === '' || validateContainOnlyWhitespace(storeAddress))) {
      setErrorAddress('Field is mandatory')
      issue = true;
    }
    if (isContact && (!storeCity || storeCity === '' || validateContainOnlyWhitespace(storeCity))) {
      setErrorCity('Field is mandatory')
      issue = true;
    }
    if (isContact && (!storeState || storeState === '' || validateContainOnlyWhitespace(storeState))) {
      setErrorState('Field is mandatory')
      issue = true;
    }
    if (isContact && (!storePin || storePin === '')) {
      setErrorPin('Field is mandatory')
      issue = true;

    }
    if (isContact && !storePin) {
      setErrorPin("Field is mandatory")
      issue = true;
    }
    else if (isContact && !validatePinCode(storePin)) {
      setErrorPin("Pin Code isn't valid")
      issue = true;
    }
    if (isContact && (!storeCountry || storeCountry === '')) {
      setErrorCountry('Field is mandatory')
      issue = true;

    }
    if (issue) return;
    setErrorAddress('')
    setErrorCity('')
    setErrorState('')
    setErrorCountry('')
    setErrorPin('')
    setErrorEmail('')
    setErrorPhone('')
    setContactInfo({
      storeId,
      merchantId,
      email: storeEmail,
      phone: storePhone,
      address: storeAddress,
      city: storeCity,
      pincode: storePin,
      state: storeState,
      country: storeCountry,
      hasPhysicalAddress: isContact,
      whatsappNumber,
      phoneCode: storePhoneCode ,
      whatsappNumberCode: whatsappNumberCode
    })
    setOnBoardProgress('COMPLETED', storeId, merchantId)
    setShowFeatures(false)
    navigatePageIndex(4)
    setTimeout(() => {
      getStoreData(storeId)
    }, 500)
    getSubscriptionDetails(storeId, user.role_id)
  }

  useEffect(() => {
    getAllCountryDetails();
  }, [])
  useEffect(() => {
    // Page DidMount API Call
    if (storeId) {
      getStoreData(storeId)
    }
    setTimeout(() => {
      setLoading(false)
    }, 300)
    getStoreTypes()
    if (storeOnboardStatus==="COMPLETED")
    {
      navigatePageIndex(4)
    }
    getContactInfo(storeId);
  }, [])

  useEffect(() => {
    if (store) {
      if (store.onboard_status == 'IN_PROGRESS_2') navigatePageIndex(2)
      setStoreType(
        store && store.store_type
          ? { label: convertToFLUpperCase(store.store_type), value: store.store_type.toUpperCase() }
          : '',
      )
      const existStoreInfo = { ...formInput }
      existStoreInfo.storeName = store.store_name
      existStoreInfo.storeDesc = store.store_desc
      existStoreInfo.storeEmail = store.primary_email
      existStoreInfo.storePhone = store.primary_phone
        ? store.primary_phone.toString().length >= 12
          ? store.primary_phone.toString().substr(2)
          : store.primary_phone
        : ''
      existStoreInfo.storeAddress = store.address
      existStoreInfo.storeCity = store.city
      existStoreInfo.storeState = store.state
      existStoreInfo.storePin = store.pincode
      existStoreInfo.storeCountry = store.country
      existStoreInfo.storeIsContactAvailable = store.is_address_available
      existStoreInfo.whatsappNumber = store.whatsapp_number
        ? store.whatsapp_number.toString().length >= 12
          ? store.whatsapp_number.toString().substring(2)
          : store.whatsapp_number
        : ''
      setFormInput(existStoreInfo)
    }
    if (store && store.is_address_available == 'Y') showContactInput(true)
  }, [store])

  const onInputChangeHandler = e => {
    setErrorName('')
    setErrorStoreType('')
    setErrorDesc('')
    setErrorAddress('')
    setErrorCity('')
    setErrorState('')
    setErrorCountry('')
    setErrorPin('')
    const { value } = e.target
    return setFormInput({ ...formInput, [e.target.name]: value })
  }

  const onPageDoneHandler = React.useCallback(() => {
    setPageStatus(true)
    history.push('/app')
  }, [setPageStatus])

  const onSelectHandler = React.useCallback(value => {
    setStoreType(value)
  }, [])

  if (loading) {
    return (
      <div className="fixed bg-black opacity-25 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <RingLoader color="#F64C5D" size={150} />
      </div>
    )
  }

  return (
    <article>
      <Helmet>
        <title>Store Info</title>
        <meta name="description" content="Store Info page" />
      </Helmet>

      {pageIndex !== 4 ? (
        <div>
          <div className="sticky bg-white">
            <div className="flex justify-between px-4 pt-4 text-xl font-semibold border-b">
              <p className="text-heavy">
                {!isDesktopOrLaptop ? 'Hi There,' : pageIndex != 0 ? ' Create a New Store' : 'Hi there,'}
              </p>

              <TopNav />
            </div>
          </div>
        </div>
      ) : null}
      <div className="container">
        {pageIndex == 0 && (
          <div className="h-screen px-10 sm:px-10 justify-center text-center ">
            <MediaQuery minDeviceWidth={1100}>
              <div className="btnRed sm:px-4 align-middle">
                <p className="text-muted-med font-semibold text-lg" style={{ paddingTop: '25%' }}>
                  You don't have a store yet. Let's create one. It's very simple!
                </p>
                <span className="flex items-center mx-auto justify-center font-normal " style={{ fontSize: "14px", color: "#2424247F" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> Learn how to <NavLink to="/helpcenter/create-store" className="ml-2" style={{ color: "#F64B5D", textDecorationLine: 'underline' }}> Create Store</NavLink></span>
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1100}>
              <div className="btnRed sm:px-4 align-middle">
                <p className="text-muted-med font-semibold text-lg" style={{ paddingTop: '55%' }}>
                  You don't have a store yet. Let's create one. It's very simple!
                </p>
                <span className="flex items-center mx-auto justify-center font-normal " style={{ fontSize: "14px", color: "#2424247F" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> Learn how to <NavLink to="/helpcenter/create-store" className="ml-2" style={{ color: "#F64B5D", textDecorationLine: 'underline' }}> Create Store</NavLink></span>
              </div>
            </MediaQuery>
            <br />
            <button
              type="button"
              className="object-center shadow-lg focus:outline-none border-secondary cta-btn mt-6"
              onClick={() => navigatePageIndex(1)}
            >
              <i className="mr-2 fas fa-plus" />
              Create Store
            </button>
          </div>
        )}

        {pageIndex == 1 && (
          <CreateStore
            formInput={formInput}
            onInputChangeHandler={onInputChangeHandler}
            onCreateStore={onCreateStore}
            storeType={storeType}
            storeTypeOptions={storeTypes}
            onSelectHandler={onSelectHandler}
            errorName={errorName}
            errorDesc={errorDesc}
            errorStoreType={errorStoreType}
            isDesktop={isDesktopOrLaptop}
            desktop={Desktop}
            mobile={Mobile}
          />
        )}

        {pageIndex == 2 && (
          <RegionAndCurrencyInfo
            setFormInput={setFormInput}
            formInput={formInput}
            navigatePageIndex={navigatePageIndex}
            setOnBoardProgress={setOnBoardProgress}
            merchantId={merchantId}
      />
            )}
        {pageIndex == 3 && (
          <StoreDetailsUpdate
            setFormInput={setFormInput}
            formInput={formInput}
            contactInfo={contactInfo}
            onInputChangeHandler={onInputChangeHandler}
            navigatePageIndex={navigatePageIndex}
            onUpdateStore={onUpdateStore}
            isContact={isContact}
            ToggleContactInput={toggleContactInput}
            errorEmail={errorEmail}
            errorPhone={errorPhone}
            errorAddress={errorAddress}
            errorCity={errorCity}
            errorState={errorState}
            errorCountry={errorCountry}
            errorPin={errorPin}
            errorWhatsapp={errorWhatsapp}
            isDesktop={isDesktopOrLaptop}
            desktop={Desktop}
            mobile={Mobile}
          />
        )}
        {pageIndex == 4 && (
          <div className="">
            <div className="flex flex-col justify-center items-center ">
              <div className="w-full md:w-3/4 leading-normal text-gray-800 px-4">
                <div>
                  <br />
                  <br />
                </div>
                <div className="bg-white rounded-lg shadow-lg">
                  <div className=" px-2 py-2 md:px-3 md:py-4 text-center">
                    <img src={onlineImg} style={{ width: '50%', height: '50%', margin: '0 auto' }} />
                    <br />
                    <p className="font-semibold text-base text-secondary">
                      Congrats! Your online store has been created!
                    </p>
                    <br />
                    <p className="font-semibold text-base text-black-pl">
                      Your store
                      <br />
                      <a
                        className="text-sm font-semibold px-1 text-black-pl"
                        target="_blank"
                        href={`${makeStoreUrl(store.store_name, store.store_id)}`}
                      >
                        {`${makeStoreUrl(store.store_name, store.store_id).slice(8)}`}
                      </a>{' '}
                      <br />
                      is live!
                    </p>
                  </div>
                </div>
                <MediaQuery maxDeviceWidth={1100}>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </MediaQuery>
              </div>
              <MediaQuery minDeviceWidth={1025}>
                <div className="flex flex-row-reverse justify-center mt-4 mb-4">
                  <button onClick={onPageDoneHandler} className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
                    {' '}
                    Done
                  </button>
                </div>
              </MediaQuery>
              <MediaQuery maxDeviceWidth={1025}>
                <div className="w-full bottomButtons bg-white items-center place-items-center text-center">
                  <button onClick={onPageDoneHandler} style={{ background: '#F64C5D' }}>
                    Done
                  </button>
                </div>
              </MediaQuery>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  store: makeSelectStore(),
  pageIndex: getPageIndex(),
  pageStatus: getPageStatus(),
  storeTypes: makeSelectAvailableStoreTypes(),
  clientDetails: makeSelectClientDetails(),
  subscribedTo: makeSelectSubscribedModules(),
  user: makeSelectGlobalUser(),
  storeOnboardStatus: makeSelectStoreOnboardStatus(),
  contactInfo: makeSelectContactInfo(),
})

const mapDispatchToProps = dispatch => ({
  setShowFeatures: val => dispatch(setShowFeaturesCarousel(val)),
  setPageStatus: value => dispatch(setPageSubmissionStatus(value)),
  setPageIndexFlow: value => dispatch(setPageIndex(value)),
  getStoreData: storeId => dispatch(getStoreData(storeId)),
  createStoreForMerchant: (storeName, storeType, storeDesc, merchantId, clientId) =>
    dispatch(createStore(storeName, storeType, storeDesc, merchantId, clientId)),
  updateStoreForMerchant: (options, storeId, merchantId) => dispatch(updateStore(options, storeId, merchantId)),
  getStoreTypes: () => dispatch(getStoreTypes()),
  setOnBoardProgress: (progress, storeId, merchantId) => dispatch(setOnBoardProgress(progress, storeId, merchantId)),
  setStoreDetails: ({ storeId, merchantId, storeName, storeType, storeDesc }) =>
    dispatch(setStoreDetails({ storeId, merchantId, storeName, storeType, storeDesc })),
  getContactInfo: (storeId) => dispatch(getContactInfo({ storeId })),
  getAllCountryDetails: () => dispatch(getAllCountryDetails()),
  setContactInfo: ({
    storeId,
    merchantId,
    email,
    phone,
    address,
    city,
    pincode,
    state,
    country,
    hasPhysicalAddress,
    whatsappNumber,
    phoneCode,
    whatsappNumberCode
  }) =>
    dispatch(
      setContactInfo({
        storeId,
        merchantId,
        email,
        phone,
        address,
        city,
        pincode,
        state,
        country,
        hasPhysicalAddress,
        whatsappNumber,
        phoneCode,
        whatsappNumberCode
      }),
    ),
  getSubscriptionDetails: (storeId, roleId) => dispatch(getSubscribedModules(storeId, roleId)),

})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnBoardStore)
