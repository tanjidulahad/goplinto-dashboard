import React, { useState, useEffect } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { Dropdown, Menu, Tooltip } from 'antd'
import EyeOutlined from "../../images/icons/eye_icon.png"
import EyeInvisibleOutlined from "../../images/icons/eye_not.png"
import '../../assets/Auth.css'

import { Carousel } from 'react-responsive-carousel'
import OtpInput from 'react-otp-input'

import websiteLogo from 'images/plinto-site-logo.png'
import FirstSlideImage from 'images/Design inspiration-amico.png'
import SecondSlideImage from 'images/customization.png'
import ThirdSlideImage from 'images/Reports.png'
import FourthSlideImage from 'images/Email campaign-amico.png'

import saga from './saga'
import reducer from './reducer'
import queryString from 'query-string'

import { makeSelectAuthState, makeSelectClientDetails, makeSelectCountryDetails, makeSelectGlobalUser, makeSelectShowScreen,makeSelectAuthMode,makeSelectVerificationType, makeSelectLoading } from './selectors'
import {
  authenticate,
  setAuthStatus,
  setError,
  setErrorMessage,
  verifyOTP,
  setOtpError,
  getClientdetails,
  setShowFeaturesCarousel,
  getCountryDetails,
  setShowScreen,
  forgotPassword,
  createPassword,
  setVerificationType,
  setAuthMode,
} from './actions'
import { numberInputValidation,validateEmail } from 'utils/validation'
import { DownOutlined } from '@ant-design/icons'
import ErrorLine from 'components/ErrorLine'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { DeviceUUID } from "device-uuid"

const indicatorStyles = {
  height: '10px',
  width: '10px',
  borderRadius: '50%',
  background: '#242424BF 0% 0% no-repeat padding-box',
  display: 'inline-block',
  margin: '0 5px',
}

const Auth = ({
  authState,
  startAuth,
  setAuthState,
  clearError,
  OtpVerify,
  clearOtpError,
  getClientdetails,
  clientDetails,
  user,
  setShowFeatures,
  getCountryDetails,
  setShowScreen,
  forgotPassword,
  countryDetails, 
  showScreen,
  authMode,
  verificationType,
  PasswordCreate,
  setErrorMessage,
  setAuthMode,
  setVerificationType,
  loading,
}) => {
  useInjectReducer({ key: 'authReducer', reducer })
  useInjectSaga({ key: 'authSaga', saga })

  const history = useHistory()
  var deviceId = new DeviceUUID().get();

    useEffect(() => {
    setShowScreen("Login")
    setAuthMode("Login")
    setErrorMessage("")
    RemoveAllErrors()
    clearAllInputs()
    }, [])
  const {
    full_name,
    primary_store_name,
    isLoggingIn,
    error,
    errorMessage,
    isLoggedIn,
    merchant_id,
    otpVerifyError,
  } = authState
  const [currAuthMode, setCurrAuthMode] = useState('Login')
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [number, setNumber] = useState('')
  const [numberError, setNumberError] = useState(false)
  const [otp, setOTP] = useState('')
  const [seconds, setSeconds] = useState(30)
const [enableResend, setEnableResend] = useState(true)
  const [authenticateError, setAuthenticateError] = useState('')
  const [isdCode, setIsdCode] = useState("")
  const [IsdCodeError, setIsdCodeError] = useState(false)
  const [isdFlag, setIsdFlag] = useState("")
  const [EmailError, setEmailError] = useState(false)
  const [email, setEmail] = useState("")
const [p1Type, setp1Type] = useState(true)
const [p2Type, setp2Type] = useState(true)
  useEffect(() => {
    const values = queryString.parse(location.search)
    if (values.clientId) {
      getClientdetails(values.clientId)
    }
    getCountryDetails();
  }, [])
  useEffect(() => {
    if (isLoggedIn) {
      setShowFeatures(true)
      history.push('/app')
    }
  }, [isLoggedIn])

  useEffect(() => {
    clearError(false)
    clearOtpError(false)
    setAuthState(false)
  }, [])

  useEffect(() => {
    if (isLoggingIn) {
      if (error) {
        setAuthenticateError(authMode)
        setAuthState(false)
      }
    } else if (error) {
      setAuthenticateError(authMode)
    }
  }, [isLoggingIn, error, authMode])

  useEffect(() => {
    if (seconds !== 30 || seconds === 0) {
      resendTimer()
    }
  }, [seconds])

  const resendTimer = () => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000)
    } else {
      setEnableResend(true)
      setSeconds(30)
    }
  }

  const checkValidityAndAuthenticate = event => {
    event.preventDefault()

    let foundErr=false;
    if (authMode === 'SignUp')
    {
      if (!name){
       setNameError("The name cannot be empty")
       foundErr=true;
      }
      else if(name.length<3)
      {
      setNameError("Name length should be between 3 - 50")
        foundErr = true;
      }
      if(password1.length<8)
      {
      setPasswordError("Password length should be between 8 - 30")
        foundErr = true;
      }
      if (password2.length < 8)
      {
      setPasswordError("Password length should be between 8 - 30")
        foundErr = true;
      }
    }     
    if ((verificationType==="PHONE")&&(number.length !== 10))
    {
    setNumberError(true)
      foundErr = true;
    }
    if (!(verificationType === "PHONE") && !validateEmail(email)) 
    {
    setEmailError("Invalid Email")
      foundErr = true;
    }
    
    if (foundErr)
    {
      return;
    }
 startAuth(authMode, name, number,isdCode, password1, password2, verificationType,user,merchant_id,email,deviceId)
  
    }
  const createPassword = event => {

    event.preventDefault();

    setIsdCodeError(false)
    setNumberError(false)    
    setAuthenticateError('')
    setEmailError("")

    if((verificationType==="PHONE"))
    {
      if (!isdCode) return setIsdCodeError(true)
    else if (!number) return setNumberError(true)
  }
    else if (!email) return setEmailError("Email is Mandatory")
    else if (!(verificationType==="PHONE") && !validateEmail(email)) return setEmailError("Invalid Email") 

    forgotPassword(authMode, name, number, isdCode, password1, password2, verificationType, user, merchant_id, email)
  }
  const preSwitchCleanup = () => {
    clearOtpError(false)
    clearError(false)
    setAuthenticateError('')
  }

  useEffect(() => {
    window.onpopstate = e => {
      setAuthState(false)
      setAuthMode('Login')
      setName('')
      setNameError(false)
      setNumber('')
      setNumberError(false)
      setOTP('')
      setSeconds(30)
      setEnableResend(true)
      setAuthenticateError('')
    }
  })
  const isTablet = useMediaQuery({ minWidth: 992 })
  const phoneCode_menu = () => {
    const countries = Object.keys(countryDetails)
    return (
      <Menu className='rounded-lg p-2 w-full' style={{ boxShadow: '0px 4px 12px #00000029', maxHeight: "95vh", overflow: "auto" }}>
         {countries.map((val) => {
          const isd_code_List = countryDetails && countryDetails[val].isd_code;
          return isd_code_List.map((item) => <Menu.Item key={val}
          onClick={() => { setIsdCode(item); setIsdFlag(countryDetails[val].flag_icons)}}>
          <span
            type="button"
            className='flex justify-between  font-semibold text-sm'
          >
            <p className='text-gray-600'>
              <img src={countryDetails[val].flag_icons} className='inline-block mr-1 h-5 w-10' />
              {countryDetails[val].country_name}</p>
            <b>{"+" + item}</b>
          </span>
        </Menu.Item>
       )}
        )
        }

      </Menu>
    )
  }
  const popupToggleHandler = (e) => {
    let x = e.target
    if (x.id === "phone") {
      setVerificationType("PHONE")
    }
    else {
      setVerificationType("EMAIL")
    }
    RemoveAllErrors(e);
  }
  const RemoveAllErrors=(e)=>{
    e&&e.preventDefault();
    setNumberError(false)
    setEmailError(false)
    setIsdCodeError(false)
    setNameError("")
    setErrorMessage("")
    setNumberError(false)
    setPasswordError("")
  }
  function clearAllInputs(e){  
    setName("")
    setEmail("")
    setNumber("")
    setPassword1("")
    setPassword2("")
    setIsdCode("")
    setIsdFlag("")
    RemoveAllErrors(e)
  }
  
  const createPasswordFunction=(e)=>{
    e.preventDefault();
    if (password1.length < 8 || password2.length < 8)
    {
        setPasswordError("Password length should be between 8 - 30")
        return;
    }
    PasswordCreate(password1, password2, merchant_id)
  }
function Screens(){
  return(
    <div className="login_signup_container invisible-scrollbar">
      <MediaQuery minDeviceWidth={768}>
      {queryString.parse(location.search).clientId && clientDetails ? (
        <div
          className="flex justify-center w-full items-center text-3xl font-semibold flex-none"
          style={{ marginBottom: '20px' }}
        >
          <img
            style={{ width: '40%', height: '100px', objectFit: 'contain' }}
            src={websiteLogo}
            alt="plinto-logo"
          />
          <div className="mx-3">X</div>
          <img
            style={{ width: '40%', height: '100px', objectFit: 'contain' }}
            src={clientDetails.img_url}
            alt="client-logo"
          />
        </div>
      ) : (
        <div
          className="flex items-center text-3xl w-full font-semibold flex-none mb-5"          
        >
          <img
            style={{ width: '200px', height: '100px', objectFit: 'contain' }}
            src={websiteLogo}
            alt="plinto-logo"
          />
        </div>
      )}
        </MediaQuery>
      <MediaQuery maxDeviceWidth={768}>
         {
    queryString.parse(location.search).clientId && clientDetails ? (
      <div
        className="flex justify-start items-center text-lg mb-5 w-full font-bold flex-none"
      >
        <div className="mr-4">Partnered with</div>
        <img
          style={{ width: '200px', height: '100px', objectFit: 'contain' }}
          src={clientDetails.img_url}
          alt="client-logo"
        />
      </div>
    ) : (
    <div
      className="flex justify-start items-center mb-4 text-3xl w-full font-semibold flex-none"
    >
      <img
        style={{ width: '200px', height: '100px', objectFit: 'contain' }}
        src={websiteLogo}
        alt="plinto-logo"
      />
    </div>
  )
  }
        </MediaQuery>


      {showScreen !== 'verifyOtp' ? (
        <>
          <h1>{showScreen === 'Login' ? 'Login' : showScreen === "createPassword" ? "Create Password" : 'Create an Account'}</h1>
          <h6>
            {showScreen === 'Login' ? `New user? ` : showScreen === "createPassword" ? "Create a Strong Password by Using Special Characters e.g # $ @!" : `Already have an account? `}
            {showScreen === 'Login' ? (
              <span
                onClick={(e) => {
                  preSwitchCleanup()
                  setAuthMode('SignUp')
                  setCurrAuthMode('SignUp')
                  setShowScreen('SignUp')
                  clearAllInputs(e)
                }}
              >
                Create an account
              </span>
            ) :
              showScreen !== "createPassword" &&
              (
                <span
                  onClick={(e) => {
                    preSwitchCleanup()
                    setAuthMode('Login')
                    setCurrAuthMode('Login')
                    setShowScreen('Login')
                    clearAllInputs(e)
                  }}
                >
                  Login
                </span>
              )}
          </h6>



          {authMode === 'SignUp' ? (
            <>
              <h3>Name</h3>
              <input
                type="text"
                placeholder="Enter Full Name"
                className='input_field'
                value={name.slice(0,50)}
                onChange={e => {
                  setNameError(false)
                  setName(e.target.value)
                  RemoveAllErrors(e)
                }}
              />
              {nameError ? <p className="errorTxt">{nameError}</p> : null}
            </>
          ) : null}

          {showScreen !== "createPassword" && <div className="flex justify-between border-2 rounded-md border-secondary cursor-pointer mt-5 mb-2">
            <span className={(verificationType==="PHONE") ? "selectedToggle border-radius-r-0" :"nonSelectedToggle"} id="phone" onClick={e => { popupToggleHandler(e);}} >Phone Number</span>
            <span className={(verificationType==="PHONE") ? "nonSelectedToggle border-radius-l-0" :"selectedToggle border-radius-l-0"} id="email" onClick={e => { popupToggleHandler(e);}} >Email Id</span>
          </div>}

          {showScreen !== "createPassword" && (verificationType==="PHONE") ? <div className='flex h-12 bg-white rounded-lg font-semibold shadow-sm w-full' >
            <Dropdown
              trigger={['click']}
              overlay={phoneCode_menu}
              className="flex justify-between capitalize focus:outline-none "
              placement="bottomCenter"
              arrow
            >
              <div
                className="flex font-medium px-2 cursor-pointer border border-gray-400 rounded-lg focus:outline-none focus:border-secondary border-radius-r-0"
                style={{ width: isTablet ? "28%" : "40%"}}
              >
                {!isdCode && <p className='text-gray-400 text-xs mx-2 my-auto'>Country</p>}    
                {isdFlag && <img src={isdFlag} className={isTablet ? 'h-8 w-10 my-auto' : 'h-5 w-5 my-auto'} />}
                {isdCode && <p className='my-auto mx-auto text-xs'>+{isdCode}</p>}
                <DownOutlined className='my-auto' style={{ fontSize: '0.5em' }} />
              </div>
            </Dropdown>
            <input
              type="number"
              placeholder="Enter Phone Number"
              onKeyDown={e => numberInputValidation(e)}
              value={number}
              autoFocus
              onChange={e => {
                setAuthenticateError('')
                setNumberError(false)
                setNumber(e.target.value)
                RemoveAllErrors(e)
              }}
              className="px-2 w-3/4 border-radius-l-0 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
            />
          </div> :
            showScreen !== "createPassword" && <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={e => {
                setEmailError(false)
                setEmail(e.target.value)
                RemoveAllErrors(e)
              }}
              className='input_field'
              onKeyDown={(e)=>e.key===" "&&e.preventDefault()}
            />
          }
          <ErrorLine value={EmailError} type={EmailError} />
          <ErrorLine value="ISD Code is mandatory" type={IsdCodeError} />
          {numberError ? <p className="errorTxt">Phone number should be of 10 digits</p> : null}
          {authMode !=='verifyOtp' && (
            <>
              <div className='flex mt-5'>
                <h3>Password</h3>
                {showScreen !== "createPassword" &&authMode!="SignUp"&& <Tooltip
                  title="To Reset or Create new password, click on Forgot password."
                  arrowPointAtCenter
                  color={'#242424'}
                >
                  <AiOutlineInfoCircle
                    className="mx-1 mt-1 text-muted-light hover:text-black flex-none"
                    size={15}
                  />
                </Tooltip>}
              </div>
              <span className='flex w-full'>
              <input
                type={p1Type?"password":"text"}
                placeholder="Enter Your Password"
                className='input_field'
                value={password1.slice(0,30)}
                onCopy={(e)=>e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onSelect={(e) => e.preventDefault()}
                onChange={e => {
                  setPasswordError(false)
                  setPassword1(e.target.value)
                  RemoveAllErrors(e)
                }}
                onKeyDown={e=>e.key===" "&&e.preventDefault()}
              />

              <span className='eye_icon'  onClick={()=>setp1Type(!p1Type)}>
                <img src={p1Type ? EyeOutlined : EyeInvisibleOutlined} className="h-6 w-5 mt-1"/>
              </span> 
                </span>             
              {passwordError &&(!password1||password1.length<8)? <p className="errorTxt">{passwordError}</p> : null}
              {showScreen !== "createPassword" && authMode !== "SignUp" &&  <div className='flex w-full justify-end mt-5'>
                <p className='text-secondary font-semibold float-right cursor-pointer' onClick={(e) => { createPassword(e) }}>Forgot Password?</p>
              </div>}
            </>
          )}
          {(showScreen === 'createPassword'||authMode==="SignUp") && (
            <>              
            <div className='mt-5'>
              <h3>Confirm Password</h3>
            </div>
              <span className='flex w-full'>
              <input
                type={p2Type?"password":"text"}
                placeholder="Confirm Your Password"
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onSelect={(e) => e.preventDefault()}
                value={password2.slice(0,30)}
                  onKeyDown={e => e.key === " " && e.preventDefault()}
                  className="input_field"
                onChange={e => {
                  setPasswordError(false)
                  setPassword2(e.target.value)
                    RemoveAllErrors(e)
                }}
              />
                <span className='eye_icon' onClick={() => setp2Type(!p2Type)}>
                  <img src={p2Type ? EyeOutlined : EyeInvisibleOutlined} className="h-6 w-5 mt-1" />
                </span> 
                </span>
              {passwordError && (!password2 || password2.length < 8) ? <p className="errorTxt">{passwordError}</p> : null}
            </>
          )}
          {(authMode === 'SignUp' || authMode === 'Login' )&&  <p className="errorTxt">{errorMessage}</p> }        
          
          {authMode==="Login"&&showScreen==="createPassword"&&<button
            type="button"
            className="flex-none"
            onClick={e =>{ createPasswordFunction(e)}}
            disabled={(!password1||!password2)}
          >
            {authMode}
          </button>}
          {showScreen !== "createPassword" &&<button
            type="button"
            className="flex-none"
            onClick={e => checkValidityAndAuthenticate(e)}
            disabled={(authMode === 'SignUp' && (name.length === 0 || !password2)) || (number.length !== 10 && (!email)) || !password1||loading}
          >
            Proceed
          </button>}
              { authMode==="SignUp"&&<p className="flex items-center justify-start">    <span className="flex items-center font-normal " style={{ fontSize: "14px", color: "#2424247F" }}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>&nbsp; Learn how to <NavLink to="/helpcenter/create-account" className="ml-2 text-secondary" > Create Account</NavLink></span></p>}
      
          {authMode === 'SignUp' && (
            <span className="auth__note flex-none">
              <strong>NOTE</strong> : By signing up, you agree to our{' '}
              <a
                className="auth__terms"
                href="https://www.goplinto.com/terms-of-use.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Use
              </a>{' '}
              and our
              <a
                className="auth__terms"
                href="https://www.goplinto.com/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Privacy Policy
              </a>
              .
            </span>
          )}
        </>
      ) : (
        <>
          <h1>Verify OTP</h1>
          {(verificationType==="PHONE")?<h6>OTP sent to number ending in {number.substring(8, 10)}</h6>:<h6>OTP sent to {email}</h6>}
                  {/* Avatar with photo and name */}
                  <div className="merchant__info">
                    <div className="merchant__avatar">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="#2424243F"
                        height="30px"
                        width="30px"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="merchant__details">
                      {full_name && <span className="merchant__name">{full_name}</span>}
                      {primary_store_name && <span className="merchant__storeName">{primary_store_name}</span>}
                    </div>
                  </div>
                  {/* OTP Box */}
                  <OtpInput
                    value={otp}
                    onChange={otp => {
                      clearOtpError(false)
                      setOTP(otp)
                    }}
                    numInputs={5}
                    separator=""
                    containerStyle="otp__container"
                    inputStyle="otp__input"
                  />
                  {otpVerifyError && <p className="errorTxt">Invalid OTP, please try again.</p>}
          <div className="buttons">
                      {enableResend ? (
                        <span
                          className="resend__otp"
                          onClick={e => {
                            clearOtpError(false)
                            setOTP('')
                            createPassword(e)
                            setEnableResend(false)
                            resendTimer()
                          }}
                        >
                          Resend Code
                        </span>
                      ) : (
                        <span className="resend__otp">{seconds}s left</span>
                      )}

                    <span
                      type="button"
                      className="verify__otp"
                      style={{
                        opacity: otp.length < 5 ? '0.5' : '1',
                        cursor: otp.length < 5 ? 'not-allowed' : 'pointer',
                      }}
                      onClick={e => {
                        e.preventDefault()
                        OtpVerify(merchant_id, otp, user, authMode,authMode!=="VerifyAccount"&&true,verificationType)
                      }}
                    >
                      Verify OTP
                    </span>
                  </div>
                  <div className="flex items-center my-4 mb-8 w-full align-middle justify-evenly">
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#242424bf', opacity: '0.5' }} />
                  </div>
                  <h6>
                    <span
                      onClick={(e) => {
                        setName('')
                        setNumber('')
                        setOTP('')        
                if (currAuthMode === "Login") {
                  setAuthMode('Login')
                }
                else {
                  setAuthMode('SignUp')
                }
                setShowScreen(currAuthMode === "Login" ? "Login" : "SignUp")
                clearOtpError(false)
                setAuthState(false)
                RemoveAllErrors(e)
                clearAllInputs(e)
              }}
            >
              {currAuthMode === "Login" ? "Log in to a " : "Sign Up with "}different account
            </span>
          </h6>
        </>
      )}
    </div>
  )
}
  return (
    <div className="w-screen h-screen">
      {/* TitleBar */}
      <Helmet>
        <title>{authMode === 'verifyOtp' ? 'Verify OTP' : authMode}</title>
        <meta name="description" content={`${authMode} page`} />
      </Helmet>

      <div className="w-screen h-screen">
        {/* Desktop View */}
        <MediaQuery minDeviceWidth={769}>
          <div className="flex flex-row">
            {/* Left Container */}
            <div className="auth__left__container">
              <Carousel
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                swipeable
                infiniteLoop
                autoPlay
                interval={5000}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  if (isSelected) {
                    return (
                      <li
                        style={{
                          ...indicatorStyles,
                          background:
                            'transparent linear-gradient(121deg, #F64B5D 0%, #FF818E 100%) 0% 0% no-repeat padding-box',
                          borderRadius: '5px',
                          width: '15px',
                        }}
                        aria-label={`Selected: ${label} ${index + 1}`}
                        title={`Selected: ${label} ${index + 1}`}
                      />
                    )
                  }
                  return (
                    <li
                      style={indicatorStyles}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      value={index}
                      key={index}
                      role="button"
                      tabIndex={0}
                      title={`${label} ${index + 1}`}
                      aria-label={`${label} ${index + 1}`}
                    />
                  )
                }}
              >
                <div className="carouser__inner__slides unselectable">
                  <div>
                    <img src={FirstSlideImage} />
                    <span className="slide__title">Create store in a jiffy</span>
                    <span className="slide__desc">
                      No coding knowledge mojo required, Set up your store online in a matter of a few minutes!
                    </span>
                  </div>
                </div>
                <div className="carouser__inner__slides unselectable">
                  <div>
                    <img src={SecondSlideImage} />
                    <span className="slide__title">Customize Your Website In Style</span>
                    <span className="slide__desc">
                      Throw in some colour, choose the layout of your website. Maybe, add your logo and some banners.
                      See all your changes get updated instantly!
                    </span>
                  </div>
                </div>
                <div className="carouser__inner__slides unselectable">
                  <div>
                    <img src={ThirdSlideImage} />
                    <span className="slide__title">Numbers, Numbers... Here they are!</span>
                    <span className="slide__desc">
                      Check out our reports, learn and analyse your sales. Want to integrate your website with other
                      analytics tools? We made it super easy for you to do that!
                    </span>
                  </div>
                </div>
                <div className="carouser__inner__slides unselectable">
                  <div>
                    <img src={FourthSlideImage} />
                    <span className="slide__title">Marketing is the key</span>
                    <span className="slide__desc">
                      Engage with your customers as you like, try sending push notifications on the offer you are
                      running or download posters and share them across.
                    </span>
                  </div>
                </div>
              </Carousel>
            </div>
            {/* Right Container */}
            <div className="flex flex-col justify-center items-center auth__rightContainer">
              {Screens()}
            </div>
          </div>
        </MediaQuery>

        {/* Mobile/Tablet View */}
        <MediaQuery maxDeviceWidth={768}>
          <div className="auth__mobile_bottom_container">
            {Screens()}            
          </div>
        </MediaQuery>

      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  authState: makeSelectAuthState(),
  clientDetails: makeSelectClientDetails(),
  user: makeSelectGlobalUser(),
  countryDetails: makeSelectCountryDetails(),
  showScreen: makeSelectShowScreen(),
  authMode: makeSelectAuthMode(),
  verificationType: makeSelectVerificationType(),
  loading: makeSelectLoading(),
})

const mapDispatchToProps = dispatch => {
  return {
    startAuth: (authType, name, number, isdCode, password1, password2, verificationType, user, merchant_id, email, deviceId) => dispatch(authenticate(authType, name, number, isdCode, password1, password2, verificationType, user, merchant_id, email, deviceId)),
    setAuthState: val => dispatch(setAuthStatus(val)),
    getClientdetails: clientId => dispatch(getClientdetails({ clientId })),
    OtpVerify: (merchant_id, otp, user, authMode, isForgotPass, verificationType) => dispatch(verifyOTP(merchant_id, otp, user, authMode, isForgotPass, verificationType)),
    clearError: val => dispatch(setError(val)),
    clearOtpError: val => dispatch(setOtpError(val)),
    setShowFeatures: val => dispatch(setShowFeaturesCarousel(val)),
    getCountryDetails: () => dispatch(getCountryDetails()),
    setShowScreen: (value) => dispatch(setShowScreen(value)),
    forgotPassword: (authMode, name, number, isdCode, password1, password2, verificationType, user, merchant_id, email) => dispatch(forgotPassword(authMode, name, number, isdCode, password1, password2, verificationType, user, merchant_id, email)),
    PasswordCreate: (password1, password2, merchant_id) => dispatch(createPassword(password1, password2, merchant_id)),
    setErrorMessage: (password1, password2, merchant_id) => dispatch(setErrorMessage(password1, password2, merchant_id)),
    setAuthMode: (value) => dispatch(setAuthMode(value)),
    setVerificationType: (value) => dispatch(setVerificationType(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth)
