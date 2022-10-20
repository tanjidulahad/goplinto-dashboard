import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import MediaQuery, { useMediaQuery } from 'react-responsive'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import FormPage from 'containers/HomePage/Form'
import { createStructuredSelector } from 'reselect'
import ImageUpload from 'components/ImageUpload'
import { notification } from 'antd'
import reducer from './reducer'
import saga from './saga'
import RadioOption from './RadioOption'

import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import ForFavIcon from "images/ForFavIcon.png"
import {
  setLayout,
  setFavIcon,
  setSecondaryColor,
  setTertiaryColor,
  submitDisplaySettings,
  uploadLogoImg,
  uploadFavIcon,
  getDisplaySettings,
} from './actions'
import {
  makeSelectDisplaySettings,
  makeSelectGlobalDisplaySettings,
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectSubscribedModules,
  makeSelectRoleId,
  makeSelectSecondaryColor,
  makeSelectFavIcon,
  makeSelectTertiaryColor,
} from './selectors'

import StoreInfoSaga from "../StoreInfoPage/saga"
import StoreInfoReducer from "../StoreInfoPage/reducer"
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import ErrorLine from 'components/ErrorLine'
import { getSubscribedModules } from 'containers/App/actions'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import BottomLineDiv from 'components/BottomLineDiv'
import { validateColorHexCode } from 'utils/validation'
const StoreDisplaySettingsPage = ({
  uploadLogo,
  selectLayout,
  displaySettings,
  storeId,
  merchantId,
  submitDisplaySettingsForStore,
  apiStatus,
  globalDisplaySettings,
  firstTime,
  subscribedTo,
  roleId,
  getSubscribedModules,
  setSecondaryColor,
  setTertiaryColor,
  setFavIcon,
  SecondaryColor,
  TertiaryColor,
  FavIcon,
  uploadFavIcon,
  getStoreDisplayInformation
}) => {
  useInjectReducer({ key: 'storeDisplaySettings', reducer })
  useInjectSaga({ key: 'displaySettings', saga })
  useInjectReducer({ key: 'storeInfo', reducer: StoreInfoReducer })
  useInjectSaga({ key: 'storeInfo', saga: StoreInfoSaga })

  const [logoImg, setLogoImg] = useState(
    firstTime ? null : globalDisplaySettings.logo_img_url ? globalDisplaySettings.logo_img_url : null,
  )
  const [coverImg, setCoverImg] = useState(
    firstTime ? null : globalDisplaySettings.banner_img_url ? globalDisplaySettings.banner_img_url : null,
  )

  const history = useHistory()
  const [showSaveButton, setShowSaveButton] = useState(false)
  const [color, setColor] = useState('')
  const [userColor, setUserColor] = useState('')
  const [userSecondaryColor, setUserSecondaryColor] = useState('')
  const [userTertiaryColor, setUserTertiaryColor] = useState('')
  const [finalColor, setFinalColor] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const [showValidationError, setShowValidationError] = useState(false)
  const onChangeLayoutValue = e => selectLayout(e.target.value)
  const { layout } = displaySettings
  const [InvalidHex, setInvalidHex] = useState(false)
  const [InvalidHexSec, setInvalidHexSec] = useState(false)
  const [InvalidHexTert, setInvalidHexTert] = useState(false)
  const openNotification = (colorType, placement) => {
    notification.success({
      message: `${colorType} Applied!`,
      placement,
    })
  }

  useEffect(() => {
    getSubscribedModules(storeId,roleId)
    getStoreDisplayInformation(storeId, merchantId)
  }, [])
  useEffect(() => {
    if (userColor != '') setFinalColor(userColor)
    if (color != '') setFinalColor(color)
  }, [userColor, color])

  const onSubmitClick = () => {
    if (userColor && ((validateColorHexCode(userColor) === false))) return setInvalidHex(true);
    if (userSecondaryColor && ((validateColorHexCode(userSecondaryColor) === false))) return setInvalidHexSec(true);
    if (userTertiaryColor && ((validateColorHexCode(userTertiaryColor) === false))) return setInvalidHexTert(true);
    const displaySettingsToSubmit = {
      ...displaySettings,
      primaryColor: finalColor,
      secondaryColor: SecondaryColor ? SecondaryColor : userSecondaryColor,
      tertiaryColor: TertiaryColor ? TertiaryColor : userTertiaryColor,
      favIconImg: FavIcon,
      coverImageUrl: firstTime
        ? coverImg
          ? displaySettings.coverImageUrl
          : ''
        : coverImg
          ? displaySettings.coverImageUrl
            ? displaySettings.coverImageUrl
            : globalDisplaySettings.banner_img_url
          : '',
      logoImgUrl: firstTime
        ? logoImg
          ? displaySettings.logoImgUrl
          : ''
        : logoImg
          ? displaySettings.logoImgUrl
            ? displaySettings.logoImgUrl
            : globalDisplaySettings.logo_img_url
          : '',
    }
    submitDisplaySettingsForStore(merchantId, storeId, displaySettingsToSubmit)
    history.goBack()
  }

  const hexBtn = useRef(0)
  const hexBtnSec = useRef(0)
  const hexBtnTer = useRef(0)

  const checkUserColor = (hex_value, id, ref) => {
    let hex_code = ''
    if (hex_value.includes('#')) {
      hex_code = hex_value.split('#')[1]
    } else {
      hex_code = hex_value
    }

    if (id === 1) {
      setUserColor(`#${hex_code}`);
      setInvalidHex(false) ;
      if (validateColorHexCode(`#${hex_code}`)&&hexBtn.current) hexBtn.current.classList.remove('btn-restricted')
    }
    else if (id === 2) { 
      setUserSecondaryColor(`#${hex_code}`); 
      setInvalidHexSec(false);
      if (validateColorHexCode(userSecondaryColor)) hexBtnSec.current.classList.remove('btn-restricted') 
    }
    else { 
      setUserTertiaryColor(`#${hex_code}`); 
      setInvalidHexTert(false);
      if (validateColorHexCode(userTertiaryColor)) hexBtnTer.current.classList.remove('btn-restricted')
  }

    if (hex_code.length === 6 || validateColorHexCode("#"+hex_code)) {
      ref.current.classList.remove('btn-restricted')
    } else {
      ref.current.classList.add('btn-restricted')
    }
  }
  useEffect(() => {
    if (!firstTime) {
      const storedColor = globalDisplaySettings.primary_color
      const storedSecondaryColor = globalDisplaySettings.secondary_color
      const storedTertiaryColor = globalDisplaySettings.navbar_color
   
      setFavIcon(globalDisplaySettings.favicon_img_url)
        setColor(storedColor)
        setUserColor(storedColor)
      setSecondaryColor(storedSecondaryColor)
      setUserSecondaryColor(storedSecondaryColor)
      setTertiaryColor(storedTertiaryColor)
      setUserTertiaryColor(storedTertiaryColor)
      if (hexBtn.current) hexBtn.current.classList.remove('btn-restricted')
      if (hexBtnSec.current) hexBtnSec.current.classList.remove('btn-restricted')
      if (hexBtnTer.current) hexBtnTer.current.classList.remove('btn-restricted')
      selectLayout(globalDisplaySettings.items_layout)
    }
  }, [])

  const ColorSection = ({ title, id, bottomText, InputColor, ref, ErrorType }) => {

    const onSelectColor = (e, value) => {
      e.preventDefault();
      if (id === 1) {
        setColor(value)
        setUserColor('')
      }
      else if (id === 2) {
        setSecondaryColor(value)
        setUserSecondaryColor('')
      }
      else {
        setTertiaryColor(value)
        setUserTertiaryColor('')
      }
      setShowSaveButton(true)
    }
    const CheckSelectedColor = (value) => {
      if (id === 1) return color === value
      else if (id === 2) return SecondaryColor === value
      else return TertiaryColor === value
    }
const ColorBoxDiv=({color,HexCode})=>{
  return(
    <div className={`t-hover text-center ${CheckSelectedColor(HexCode) ? 't-hover-active' : ''}`}>
      <div className="border-div mt-1">
        <button
          type="button"
          onClick={(e) => onSelectColor(e, HexCode)}
          style={{
            background: HexCode,
          }}
          className="border-btn h-10 w-10 focus:outline-none"
        />
      </div>
      <span className="text-sm text-muted-med">{color}</span>
    </div>
  )
}
        return (
      <div className="w-full pt-4 mb-5 leading-normal text-gray-800 bg-white tbl-rounded shadow-lg lg:mt-0">
        <div className="px-8">
          <label id="section1" htmlFor="store" className="mb-2 item-label text-base">
            <br />
            {title}
                </label>

                <div className="inline-block w-full py-4">
                  <div className="mb-4 flex flex-wrap  w-full">
                    <div className="w-full md:w-1/2 md:px-1 mb-2">
                      <label id="section1" htmlFor="store" className="mb-2 uppercase text-muted-light font-semibold">
                        Our Color Suggestions
                      </label>{' '}
                      <div className="flex justify-start gap-4">
                      <ColorBoxDiv color={"Green"}  HexCode={"#1eaf82"}/>
                      <ColorBoxDiv color={"Blue"}   HexCode={"#1492e6"}/>
                      <ColorBoxDiv color={"Yellow"} HexCode={"#FF8C50"}/>
                      <ColorBoxDiv color={"Red"}    HexCode={"#F64B5D"}/>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 md:px-1 mb-2">
                      <label id="section1" htmlFor="store" className="mb-2 uppercase text-muted-light font-semibold">
                        Enter Hex Value
                      </label>
                      <div className="flex justify-start">
                        <div className="flex mt-3 gap-2">
                          <div
                            style={{ background: InputColor || '#1A2456' }}
                            className="rounded-lg h-10 w-10"
                            maxLength="7"
                          />
                          <input
                            type="text"
                            placeholder="#FFFFFF"
                            className="w-1/2 h-10 form-input focus:outline-none focus:border-secondary"
                            value={InputColor}
                            id={ref}
                            onChange={e => {
                              checkUserColor(e.target.value, id, ref)            
                              setShowSaveButton(true)
                            }}
                            onKeyDown={e => e.key === " " && e.preventDefault()}
                          />
                          <button
                            className={`text-white text-xs font-medium bg-secondary focus:outline-none rounded-lg px-2 py-1 btn-restricted`}
                            ref={ref}
                            onClick={e => {
                              e.preventDefault()
                        if (id === 1) {
                          setInvalidHex(false)
                          if (!validateColorHexCode(InputColor)) setInvalidHex(true)
                                else{
                              setColor('')
                              openNotification(title, 'bottomRight')
                                }
                         } else if (id === 2) {
                          setInvalidHexSec(false)
                          if (!validateColorHexCode(InputColor)) setInvalidHexSec(true)
                          else {
                            setSecondaryColor('')
                            openNotification(title, 'bottomRight')
                          }
                        } else {
                          setInvalidHex(false)
                          if (!validateColorHexCode(InputColor)) setInvalidHex(true)
                          else {
                            setTertiaryColor('')
                            openNotification(title, 'bottomRight')
                                }}
                            }}
                          >
                            Apply<span className="hide-mobile"> Color</span>
                          </button>
                        </div>
                      </div>
                 <ErrorLine value="Invalid Hex Value" type={ErrorType} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <BottomLineDiv text={bottomText} />
      </div>
    )
  }
  return (
    <>
      <Helmet>
        <title>Edit Website Theme</title>
        <meta name="description" content="Store Settings page" />
      </Helmet>
      <ExtendedNavBar text={'Website Settings'} />
      <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.WEBSITE_SETTINGS}>
        <FormPage
          onInvalid={() => {
            setValidationMessage('*Please fill all the required details before submitting')
            setShowValidationError(true)
          }}
          onSubmit={e => {
            e.preventDefault()
            onSubmitClick()
          }}
          className="flex flex-col w-full px-4 md:px-4 md:px-10 md:my-10 mb-16"
        >
          {/* <!--Title--> */}
          <div className="flex justify-between">
            <p className="my-4 text-lg md:text-xl item-label-title">Website Settings</p>
          </div>
          <div className="w-full bg-white tbl-rounded shadow-lg mb-4 mt-4">
            <div className="md:flex w-full mt-2 mb-2 px-2 md:px-4">
              <div className="w-full px-2 mb-2 mt-2">
                <div className="md:flex">
                  <label id="section1" htmlFor="store" className="mb-2 item-label text-base">
                    Store Logo
                  </label>
                  <br />
                  <small className="mb-4 mt-1 text-muted-light" style={{ fontSize: '0.8em' }}>
                    &nbsp;( You can upload jpg, png format of size 1MB or less with a minimum resolution of 512x512 )
                  </small>
                </div>
                <div className="w-full md:w-1/2 mt-2">
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={logoImg}
                    remove={() => setLogoImg('')}
                    setPicture={setLogoImg}
                    onItemImageUpload={uploadLogo}
                    storeId={storeId}
                    banner
                 />                  
                  </div>
                </div>
              </div>
            <br />
              <hr />
              <div className="flex flex-row bg-white justify-start align-center px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
                <span className="text-xs font-semibold text-muted-med">
                Upload your brand logo, this will be displayed on your dashboard and website.
                </span>
              </div>
            </div>
          <div className="w-full bg-white tbl-rounded shadow-lg mb-4 mt-4">
            <div className="md:flex w-full mt-2 mb-2 px-2 md:px-4">
              <div className="w-full px-2 mb-2 mt-2">
                <div className='flex justify-between'>

                  <div className="md:flex">
                    <label id="section1" htmlFor="store" className="mb-2 item-label text-base">
                      Favicon
                    </label>
                    <br />
                    <small className="mb-4 mt-1 text-muted-light" style={{ fontSize: '0.8em' }}>
                      &nbsp;( You can upload jpg, png format with minimum resolution of 64 X 64 )
                    </small>
                  </div>
                  <small className="mb-4 mt-1 item-label">Favicon example on browser</small>
                </div>
                <div className="w-full mt-2 md:flex justify-between">               
                  <ImageUpload
                    setShowSaveButton={setShowSaveButton}
                    picture={FavIcon}
                    remove={() => setFavIcon('')}
                    setPicture={setFavIcon}
                    onItemImageUpload={uploadFavIcon}
                    storeId={storeId}
                    />     
                  <img src={ForFavIcon} className="h-20 mt-5 md:mt-0" />
                </div>
              </div>
            </div>
            <br />
            <hr />
            <BottomLineDiv text="A favicon is a small icon next to your site title." />
          </div>
          <div className="mar-128 mt-5">
            {ColorSection({ title: "Primary Color", id: 1, ref: hexBtn, bottomText: "This will be the colour of the header and footer background of the website", InputColor: userColor, ErrorType: InvalidHex })}
            {ColorSection({ title: "Secondary Color", id: 2, ref: hexBtnSec, bottomText: "This will be the colour used for highlights, buttons, etc", InputColor: userSecondaryColor, ErrorType: InvalidHexSec })}
            {ColorSection({
              title: "Tertiary Color", id: 3, ref: hexBtnTer, bottomText: "This will be the colour of the text and icon on the header and footer.Tip: Choose a colour contrast to your primary colour .Eg: If the primary colour is a dark shade, choose a light or white colour for tertiary and vice versa",
              InputColor: userTertiaryColor, ErrorType: InvalidHexTert
            })}

            <br />
            <div className="w-full pt-4 leading-normal text-gray-800 bg-white tbl-rounded shadow-lg mb-4 ">
              <div className="px-4 md:px-8">
                <label id="section1" htmlFor="store" className="mb-2 item-label text-base">
                  <br />
                  Choose Layout
                </label>

                <div className="inline-block w-full py-8" onChange={(e) => {
                  setShowSaveButton(true)
                  onChangeLayoutValue(e)
                }}>
                  <div className="md:flex w-full gap-2 ">
                    <div className="w-full md:w-1/2 md:px-4 mb-2 mt-2">
                      <RadioOption
                        isSelected={layout === 'GRID'}
                        labelFor="config-side-bar-layout-grid"
                        value="GRID"
                        optionIcon="fa-grip-horizontal"
                        optionName="Grid"
                        optionText="Grid View is a grid of images. It shows a product image with product information on the bottom."
                      />
                    </div>
                    <div className="w-full md:w-1/2 md:px-4 mb-2 mt-2">
                      <RadioOption
                        isSelected={layout === 'LIST'}
                        labelFor="config-side-bar-layout-list"
                        value="LIST"
                        optionIcon="fa-list"
                        optionName="List"
                        optionText="List view contains a small picture on the left side and product information on the right side."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex flex-row bg-white justify-start align-center px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
                <span className="text-xs font-semibold text-muted-med">
                  Choose a layout to display your products on the website.
                </span>
              </div>
            </div>
            {!apiStatus && (
              <p className="text-secondary font-semibold">*Something Went Wrong! Please Try Again Later!</p>
            )}
            {showValidationError && <p className="text-secondary font-semibold">{validationMessage}</p>}
            {
              showSaveButton &&
              <>

                <MediaQuery minDeviceWidth={1101}>
                  <div className=" mt-10 py-2 absolute bottom-0 bg-white p-2"
                    style={{ width: "calc(100% - 417px)" }}
                  >
                    <button type="submit" className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn w-full">
                      Save Changes
                    </button>
                  </div>
                </MediaQuery>
              </>
            }
            <MediaQuery maxDeviceWidth={1100}>
              <div className="bg-mob mt-10 py-2">
                <button type="submit" className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
                  Save Changes
                </button>
              </div>
            </MediaQuery>
          </div>
        </FormPage>
      </IsFeatureSubscribed>
      {useMediaQuery({ minWidth: 992 }) && <div className='sticky'>
        {!showSaveButton && <PaymentPromotionImages />}
      </div>}

    </>
  )
}

const mapStateToProps = createStructuredSelector({
  displaySettings: makeSelectDisplaySettings(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  globalDisplaySettings: makeSelectGlobalDisplaySettings(),
  subscribedTo: makeSelectSubscribedModules(),
  roleId:makeSelectRoleId(),
  SecondaryColor: makeSelectSecondaryColor(),
  TertiaryColor: makeSelectTertiaryColor(),
  FavIcon: makeSelectFavIcon(),
})

const mapDispatchToProps = dispatch => ({
  selectLayout: layout => dispatch(setLayout(layout)),
  uploadLogo: (file, storeId) => dispatch(uploadLogoImg(file, storeId)),
  uploadFavIcon: (file, storeId) => dispatch(uploadFavIcon(file, storeId)),
  submitDisplaySettingsForStore: (merchantId, storeId, displayData) =>
    dispatch(submitDisplaySettings(merchantId, storeId, displayData)),
  getSubscribedModules: (storeId, roleId) => dispatch(getSubscribedModules(storeId, roleId)),
  setSecondaryColor: (value) => dispatch(setSecondaryColor(value)),
  setTertiaryColor: (value) => dispatch(setTertiaryColor(value)),
  setFavIcon: (value) => dispatch(setFavIcon(value)),
  getStoreDisplayInformation: (storeId, merchantId) => dispatch(getDisplaySettings(storeId, merchantId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreDisplaySettingsPage)
