import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import BinaryToggle from 'components/BinaryToggle'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { numberInputValidation, validateEmail, validateOnlyAlphabets, validateOnlyNumber, validatePhone, validatePinCode } from 'utils/validation'
import { useMediaQuery } from 'react-responsive'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeSelectContactInfo, makeSelectMerchantId, makeSelectStoreId } from './selectors'
import {
  setAddress,
  setCity,
  setEmail,
  setHasPhysicalAddress,
  setPhone,
  setPincode,
  setState,
  setCountry,
  getContactInfo,
  setContactInfo,
  setWhatsappNumber,
  setUseSameNumber,
  setWhatsappNumberCode,
  setPhoneCode,
  setPhoneISDFlag,
  setWhatsappISDFlag
} from './actions'

import saga from './saga'
import reducer from './reducer'
import { Dropdown, Menu } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import NewFooter from 'components/Footer/newFooter'
import ContactInfoX  from 'components/StoreSetting/contactInfo/contactInfo'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'

const ContactInfo = ({
  contactInfo,
  storeId,
  merchantId,
  setEmail,
  setPhone,
  setPhoneCode,
  setHasPhysicalAddress,
  setAddress,
  setCity,
  setState,
  setPincode,
  setCountry,
  getContactInfo,
  setContactInfo,
  setWhatsappNumber,
  setWhatsappNumberCode,
  setUseSameNumber,
  setPhoneISDFlag,
  setWhatsappISDFlag
}) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
  useInjectReducer({ key: 'contactInfo', reducer })
  useInjectSaga({ key: 'contactInfo', saga })
  const [edit, setEdit] = useState(false)
  const {
    email,
    phone,
    phoneCode,
    hasPhysicalAddress,
    address,
    city,
    state,
    pincode,
    country,
    whatsappNumberCode,
    whatsappNumber,
    useSameNumber,
  } = contactInfo
  useEffect(() => {
    getContactInfo({ storeId })
  }, [])

  const [errors, showErrors] = useState({
    address: false,
    invalidAddress: false,
    city: false,
    state: false,
    country: false,
    pincode: false,
    phone: false,
    phoneCode: false,
    email: false,
    invalidPhone: false,
    invalidPincode: false,
    invalidEmail: false,
    invalidWhatsapp: false,
    invalidCity: false,
    invalidState: false,
    invalidCountry: false
  })

  const saveContact = () => {
    showErrors({
      address: false,
      invalidAddress: false,
      city: false,
      state: false,
      country: false,
      pincode: false,
      phone: false,
      phoneCode: false,
      email: false,
      invalidPhone: false,
      invalidPincode: false,
      invalidEmail: false,
      invalidWhatsapp: false,
      invalidCity:false,
      invalidState:false,
      invalidCountry:false
    })

    if (!email) showErrors(prev => ({ ...prev, email: true }))
    if (!phone) showErrors(prev => ({ ...prev, phone: true }))
    if (!phoneCode) showErrors(prev => ({ ...prev, phoneCode: true }))
    if (phoneCode&&!validatePhone(phone)) showErrors(prev => ({ ...prev, invalidPhone: true }))
    if (!validateEmail(email)) showErrors(prev => ({ ...prev, invalidEmail: true }))

    if (hasPhysicalAddress) {
      if (!address) showErrors(prev => ({ ...prev, address: true }))
      if (address && validateOnlyNumber(address))  showErrors(prev => ({ ...prev, invalidAddress: true }))
      if (!city)  showErrors(prev => ({ ...prev, city: true }))
      if (!pincode)  showErrors(prev => ({ ...prev, pincode: true }))
      else if (!validatePinCode(pincode))  showErrors(prev => ({ ...prev, invalidPincode: true }))
      if (!state)  showErrors(prev => ({ ...prev, state: true }))
      if (!country) showErrors(prev => ({ ...prev, country: true }))
      if(city&&!validateOnlyAlphabets(city))
      {
        showErrors(prev => ({ ...prev, invalidCity: true }))
      }
      if(state&&!validateOnlyAlphabets(state))
      {
        showErrors(prev => ({ ...prev, invalidState: true }))
      }
      if(country&&!validateOnlyAlphabets(country))
      {
        showErrors(prev => ({ ...prev, invalidCountry: true }))
      }
      if (!address || !city || !pincode || !validatePinCode(pincode) || !state || !country || !validateOnlyAlphabets(state)|| !validateOnlyAlphabets(city)|| !validateOnlyAlphabets(country)||validateOnlyNumber(address))  return;

    }

    if (whatsappNumber && !validatePhone(whatsappNumber))  showErrors(prev => ({ ...prev, invalidWhatsapp: true }))
    if (!email || !phone || !phoneCode || !validatePhone(phone) || !validateEmail(email) || (whatsappNumber && !validatePhone(whatsappNumber))) return;

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
    })
    setEdit(prev => !prev)
  }
  const countries = Object.keys(contactInfo.allCountryDetails)

  const phoneCode_menu = (value) => {
    return (
      <Menu className='rounded-lg p-2 w-full code_menu' style={{ boxShadow: '0px 4px 12px #00000029' ,maxHeight:"95vh",overflow:"auto"}}>
  {countries.map((val)=>{
    const isd_code_List = contactInfo.allCountryDetails && contactInfo.allCountryDetails[val].isd_code;

    return isd_code_List.map((item) => {            
           return  (<Menu.Item key={val}
              onClick={() => {
            if(value === "Whatsapp") 
            { 
                  setWhatsappNumberCode(item)
                  setWhatsappISDFlag(contactInfo.allCountryDetails[val].flag_icons)
                }
                else if (useSameNumber) {
                  setWhatsappNumberCode(item)
                  setPhoneCode(item)
                  setPhoneISDFlag(contactInfo.allCountryDetails[val].flag_icons)
                  setWhatsappISDFlag( contactInfo.allCountryDetails[val].flag_icons)
                }
                else {
                  setPhoneCode(item)
                  setPhoneISDFlag(contactInfo.allCountryDetails[val].flag_icons)
                }

          }}
        >
          <span
            type="button"
            className='flex justify-between  font-semibold text-sm'
          >

            <p className='text-gray-600'>
                 <img src={contactInfo.allCountryDetails[val].flag_icons} className='inline-block mr-1 h-5 w-10' />
                  {contactInfo.allCountryDetails[val].country_name}</p>
                <b>{"+" + item}</b>
          </span>
        </Menu.Item>)
    }
        )
        }
        )}
      </Menu>
    )
  }

const history=useHistory();
  return (
    <div>
      <ExtendedNavBar text="Contact Details" onBack={() => history.goBack()} noHelp/>
      {!edit ? <ContactInfoX data={contactInfo} handleButtonClick={()=>setEdit(prev=>!prev)}/>
        : (
        <div className="h-full mx-4 mt-4 mb-20 pb-10 md:mt-16 px-4 md:px-10">
          <div className="w-full  mx-auto mt-6">
            <p className="my-4 text-lg md:text-xl item-label-title">Contact Details</p>
          </div>
          <div className="w-full mx-auto mt-4 bg-white rounded-lg ">
            <div className="inline-block w-full px-4 py-8 st-form">
              <div className="flex flex-wrap w-full mb-4 ">
                <div className="w-full mb-2 md:w-1/2 md:px-2">
                  <p className="mb-2 item-label">Email Id *</p>
                  <input
                    type="email"
                    placeholder="yourmail@domain.com"
                    className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                    value={email}
                    onKeyDown={e=>e.key===" "&&e.preventDefault()}
                    onChange={e => {
                      setEmail(e.target.value)
                      showErrors({...errors,email:false,invalidEmail:false,})
                    } }
                  />
                  {errors.email && (
                    <span className="my-2 text-sm font-semibold text-secondary">Email is mandatory</span>
                  )}
                  {errors.invalidEmail &&!errors.email&& (
                    <span className="my-2 text-sm font-semibold text-secondary">Email is invalid</span>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <p className="mb-2 item-label">Phone Number *</p>
                  <div className='flex bg-white rounded-lg font-semibold shadow-sm' >
                    <Dropdown
                      trigger={['click']}
                      overlay={phoneCode_menu}
                      className="flex justify-between cursor-pointer capitalize focus:outline-none"
                      placement="bottomCenter"
                      arrow
                    >                        
                        <div                          
                         className="flex font-medium px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary justify-around border-radius-r-0"
                         style={{ border: "1px solid #DDD",width:isTablet?"28%":"40%",marginRight:isTablet&&!phoneCode?"-25px":""}}
                        >
                          {!phoneCode && <p className='text-sm my-auto'>ISD Code</p>}
                          {contactInfo.phoneIsdFlag ?<img src={contactInfo.phoneIsdFlag} className={isTablet?'h-8 w-10 my-auto':'h-5 w-5 my-auto'} />
                          :
                          phoneCode && contactInfo.phoneIsdFlag.length > 0 && contactInfo.phoneIsdFlag[0].flag_icons  &&<img src={contactInfo.phoneIsdFlag && contactInfo.phoneIsdFlag[0] && contactInfo.phoneIsdFlag[0].flag_icons} className={isTablet?'h-8 w-10 my-auto':'h-5 w-5 my-auto'} />}
                         {phoneCode &&  <p className='my-auto mx-auto'>+{phoneCode}</p>}
                        <DownOutlined className='my-auto' style={{fontSize: '0.6em' }} />
                        </div>                        
                        </Dropdown>
                  <input
                    type="number"
                    placeholder="9876543210"
                        className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary border-radius-l-0 input_Width"
                    value={phone}
                    onKeyDown={e =>numberInputValidation(e)}
                    onChange={e => {
                      if (useSameNumber) {
                        setWhatsappNumber(e.target.value)
                        setPhone(e.target.value)
                        showErrors({...errors,phone:false,invalidPhone:false,invalidWhatsapp:false,})
                      } else {
                        setPhone(e.target.value)
                        showErrors({...errors,phone:false,invalidPhone:false,})
                      }
                    }}
                  />
                      </div>
                  {errors.phoneCode && (
                    <span className="my-2 text-sm font-semibold text-secondary">Phone Code is mandatory</span>
                  )}
                  {(!errors.phoneCode&&errors.phone) && (
                    <span className="my-2 text-sm font-semibold text-secondary">Phone Number is mandatory</span>
                  )}
                  {errors.invalidPhone && !errors.phone && (
                    <span className="my-2 text-sm font-semibold text-secondary">Phone Number is Invalid</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap w-full mb-4 ">
                <div className="w-full mb-2 md:w-1/2 md:px-2">
                  <p className="mb-2 item-label">
                    <IoLogoWhatsapp color="#4CAF50" className="inline-block mr-1" size={25} /> Whatsapp Number
                  </p>
                  <div className='flex bg-white rounded-lg font-semibold shadow-sm' >
                  <Dropdown
                    trigger={['click']}
                    overlay={phoneCode_menu("Whatsapp")}
                    className="flex justify-between capitalize focus:outline-none"                    
                    placement="bottomCenter"
                    arrow
                    disabled={useSameNumber}
                  >
                        <div
                          className="flex font-medium px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary border-radius-r-0"
                          style={{ border: "1px solid #DDD", cursor: useSameNumber ? "not-allowed" : "pointer", background: useSameNumber && "#fbfbfb", justifyContent: whatsappNumberCode ? "space-between" : "space-around", width: isTablet ? "28%" : "40%" }}

                        >
                          {!whatsappNumberCode&&<p className='text-sm my-auto'>ISD Code</p>}
                          {
                            contactInfo.whatsappIsdFlag ? <img src={contactInfo.whatsappIsdFlag} className={isTablet ? 'h-8 w-10 my-auto' : 'h-5 w-5 my-auto'} />
                              :
                            whatsappNumberCode && contactInfo.whatsappIsdFlag.length > 0 && contactInfo.whatsappIsdFlag[0].flag_icons && <img src={contactInfo.whatsappIsdFlag && contactInfo.whatsappIsdFlag[0] && contactInfo.whatsappIsdFlag[0].flag_icons} className={isTablet ? 'h-8 w-10 my-auto' : 'h-5 w-5 my-auto'}  />}
                          {whatsappNumberCode && <p className='my-auto mx-auto'>+{whatsappNumberCode}</p>}
                          <DownOutlined className='my-auto' style={{ fontSize: useSameNumber?'0':'0.6em'}} />
                        </div>      
                        </Dropdown>

                  <input
                    type="number"
                    placeholder="9876543210"
                        className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary border-radius-l-0 input_Width"
                    value={whatsappNumber}
                    disabled={useSameNumber}
                    onKeyDown={e => numberInputValidation(e)}
                    onChange={e => {
                      if (!useSameNumber) {
                        setWhatsappNumber(e.target.value)
                        showErrors({...errors,invalidWhatsapp:false,})
                      }
                    }}
                  />
              </div>
                  {errors.invalidWhatsapp && (
                    <span className="my-2 text-sm font-semibold text-secondary">Whatsapp Number is invalid</span>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <input
                    type="checkbox"
                    className="mt-12 mr-1"
                    checked={useSameNumber}
                    onChange={e => {
                      setUseSameNumber(e.target.checked)
                      setWhatsappNumber(phone)
                      setWhatsappNumberCode(phoneCode)
                      setWhatsappISDFlag(contactInfo.phoneIsdFlag)
                    }}
                  />
                  <span
                    className="text-muted-light md:mr-2 font-semibold text-sm"
                  >
                    Use Same as Phone Number
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex w-full px-4 py-4 text-muted-light">
              <AiOutlineInfoCircle className="mr-4" size={25} />

              <span className="mt-1 text-xs font-semibold text-muted-med">
                Goplinto and your customers will use this information to contact you.{' '}
              </span>
            </div>
          </div>
          <div className="w-full  mx-auto mt-6">
            <p className="my-4 text-lg md:text-xl item-label-title">Address</p>
          </div>

          <div className="w-full mx-auto bg-white rounded-lg  st-form">
            <div className="flex px-6 py-8 ml-2">
              <BinaryToggle
                inactiveColor="rgba(36,36,36,0.3)"
                activeColor="#F64B5D"
                toggle={hasPhysicalAddress}
                toggleCallback={() => {
                  setHasPhysicalAddress(!hasPhysicalAddress)
                }}
              />
              <p className="ml-4 text-sm item-label font-medium md:text-base ">My business has a physical address</p>
            </div>
            {hasPhysicalAddress && (
              <div className="px-6 pb-4">
                <div className="mb-2 px-2">
                  <p className="mb-2 item-label">Store Address *</p>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                    value={address}
                    onChange={e => {
                      setAddress(e.target.value)
                      showErrors({...errors,address:false,invalidAddress:false})
                    }}
                  />
                  {errors.address && (
                    <span className="my-2 text-sm font-semibold text-secondary">Address is mandatory</span>
                  )} 
                  {errors.invalidAddress && (
                    <span className="my-2 text-sm font-semibold text-secondary">Invalid Address</span>
                  )}
                </div>

                <div className="flex-row md:flex justify-items-stretch">
                  <div className="w-full mb-2 md:w-1/2 lg:w-1/2 md:px-2 ">
                    <label id="section1" htmlFor="resName" className="mb-2 item-label">
                      City *
                    </label>
                    <input
                      placeholder="Chennai"
                      onKeyDown={e => e.key === " " && e.preventDefault()}
                      className="block w-full my-1 form-input focus:bg-white"
                      name="storeCity"
                      type="text"
                      required
                      value={city}
                      onChange={e => {
                        setCity(e.target.value)
                        showErrors({...errors,city:false,invalidCity:false})
                      }}
                    />
                    {errors.city && (
                      <span className="my-2 text-sm font-semibold text-secondary">City is mandatory</span>
                    )}
                      {errors.invalidCity && (
                      <span className="my-2 text-sm font-semibold text-secondary">Invalid City</span>
                    )}

                  </div>

                  <div className="w-full mb-2 md:w-1/2 lg:w-1/2 md:px-2 ">
                    <label id="section1" htmlFor="resName" className="mb-2 item-label">
                      Pincode *
                    </label>
                    <input
                      placeholder="401202"
                      onKeyDown={e =>numberInputValidation(e)}
                      className="block w-full my-1 form-input focus:bg-white"
                      name="storePin"
                      type="number"
                      required
                      value={pincode}
                      onChange={e => {
                        setPincode(e.target.value)
                        showErrors({...errors,pincode:false,invalidPincode:false,})
                      }}
                    />
                    {errors.pincode && (
                      <span className="my-2 text-sm font-semibold text-secondary">Pincode is mandatory</span>
                    )}
                    {errors.invalidPincode && (
                      <span className="my-2 text-sm font-semibold text-secondary">Pincode is invalid</span>
                    )}
                  </div>
                </div>

                <div className="flex-row md:flex justify-items-stretch">
                  <div className="w-full mb-2 md:w-1/2 md:px-2 ">
                    <label id="section1" htmlFor="resName" className="mb-2 item-label">
                      State *
                    </label>
                    <input
                      placeholder="Tamilnadu"
                      onKeyDown={e => e.key === " " && e.preventDefault()}
                      className="block w-full my-1 form-input focus:bg-white"
                      name="storeState"
                      type="text"
                      required
                      onChange={e => {
                        setState(e.target.value)
                        showErrors({...errors,state:false,invalidState:false})
                      }}
                      value={state}
                    />
                    {errors.state && (
                      <span className="my-2 text-sm font-semibold text-secondary">State is mandatory</span>
                    )}
                      {errors.invalidState && (
                        <span className="my-2 text-sm font-semibold text-secondary">Invalid State</span>
                      )}
                  </div>

                  <div className="w-full mb-2 md:w-1/2 lg:w-1/2 md:px-2">
                    <label id="section1" htmlFor="resName" className="mb-2 item-label">
                      Country *
                    </label>
                    <input
                      placeholder="India"
                      onKeyDown={e => e.key === " " && e.preventDefault()}
                      className="block w-full my-1 form-input focus:bg-white"
                      name="storeCountry"
                      type="text"
                      required
                      onChange={e => {
                        setCountry(e.target.value)
                        showErrors({...errors,country:false,invalidCountry:false})
                      }}
                      value={country}
                    />
                    {errors.country && (
                      <span className="my-2 text-sm font-semibold text-secondary">Country is mandatory</span>
                    )}
                      {errors.invalidCountry && (
                        <span className="my-2 text-sm font-semibold text-secondary">Invalid Country</span>
                      )}
                  </div>
                </div>
              </div>
            )}
            <hr />
            <div className="flex w-full px-4 py-4 text-muted-light">
              <AiOutlineInfoCircle className="mr-4" size={25} />

              <span className="mt-1 text-xs font-semibold text-muted-med">
                Enter your location, like a store or office, so people can find you.
              </span>
            </div>
          </div>

          <div className="bg-mob mt-10 py-2">
            <button onClick={saveContact} className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
              Save Changes
            </button>
          </div>
        </div>
      )}
     {!edit&&<NewFooter />}
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  contactInfo: makeSelectContactInfo(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId()
})
const mapDispatchToProps = dispatch => ({
  setEmail: email => dispatch(setEmail({ email })),
  setPhone: phone => dispatch(setPhone({ phone })),
  setPhoneCode: phoneCode => dispatch(setPhoneCode({ phoneCode })),
  setHasPhysicalAddress: boolean => dispatch(setHasPhysicalAddress({ boolean })),
  setAddress: address => dispatch(setAddress({ address })),
  setCity: city => dispatch(setCity({ city })),
  setState: state => dispatch(setState({ state })),
  setPincode: pincode => dispatch(setPincode({ pincode })),
  setCountry: country => dispatch(setCountry({ country })),
  getContactInfo: ({ storeId }) => dispatch(getContactInfo({ storeId })),
  setPhoneISDFlag: flagIcon => dispatch(setPhoneISDFlag(flagIcon)),
  setWhatsappISDFlag: flagIcon => dispatch(setWhatsappISDFlag(flagIcon)),
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
    whatsappNumberCode,
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
  setWhatsappNumber: whatsappNumber => dispatch(setWhatsappNumber({ whatsappNumber })),
  setWhatsappNumberCode: whatsappNumberCode => dispatch(setWhatsappNumberCode({ whatsappNumberCode })),
  setUseSameNumber: boolean => dispatch(setUseSameNumber({ boolean })),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactInfo)
