import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { NavLink, useHistory } from 'react-router-dom'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { validateColorHexCode } from 'utils/validation'

import '../../assets/KioskTheme.css'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import FormPage from 'containers/HomePage/Form'
import { createStructuredSelector } from 'reselect'
import ImageUpload from 'components/ImageUpload'
import ExampleImage from 'components/ExampleImage'
import { MdArrowBack } from 'react-icons/md'
import reducer from './reducer'
import saga from './saga'
import RadioOption from './RadioOption'
import {
  initSettings,
  uploadLogoImg,
  setLogo,
  uploadCoverPic,
  setCoverPic,
  setPrimaryColor,
  setSecondaryColor,
  setLayout,
  updateKioskTheme,
} from './actions'
import {
  makeSelectKioskDisplaySettings,
  makeSelectGlobalDisplaySettings,
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectApiStatus,
  makeSelectSubscribedModules,
} from './selectors'

import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import NotificationMsg from 'components/NotificationMsg'

const exampleImages = [
  'https://multimedia-goplinto-prod.s3.ap-south-1.amazonaws.com/general/Splash_screen.png',
  'https://multimedia-goplinto-prod.s3.ap-south-1.amazonaws.com/general/Splash_screen.png',
  'https://multimedia-goplinto-prod.s3.ap-south-1.amazonaws.com/general/Grid_View.png',
]

const KioskSettingsPage = ({
  loadInitialSettings,
  uploadLogo,
  setLogoImg,
  uploadCover,
  setCoverImg,
  setPC,
  setSC,
  setLyt,
  updateKioskThemeinDB,
  kioskDisplaySettings,
  storeId,
  merchantId,
  apiStatus,
  subscribedTo,
}) => {
  useInjectReducer({ key: 'kioskSettings', reducer })
  useInjectSaga({ key: 'kioskSettingsSaga', saga })

  const history = useHistory()

  const {
    storeLogoUrl,
    splashScreenBackgroundUrl,
    primaryColor,
    secondaryColor,
    layout,
    updateError,
    flag,
  } = kioskDisplaySettings

  const [customPrimaryColor, setCustomPrimaryColor] = useState('')
  const [customSecondaryColor, setCustomSecondaryColor] = useState('')
  const [primaryButtonFlag,setPrimaryButtonFlag] = useState(true)
  const [secondaryButtonFlag,setSecondaryButtonFlag] = useState(true)
  const placeholderColor = "#7A0FC4"

  const [showExImg, setShowExImg] = useState(false)
  const [exampleImage, setExampleImage] = useState(null)

  const handleHexChange = (e,btnType)=>{
    const testRes = validateColorHexCode(e.target.value)
    let hex_code = ''
    const hex_value=e.target.value;
    if (hex_value.includes('#')) {
      hex_code = hex_value.split('#')[1]
    } else {
      hex_code = hex_value
    }
    if (btnType === 'PRIMARY') {
      setCustomPrimaryColor(`#${hex_code}`)
      setPrimaryButtonFlag(!testRes)
    } else {
      setCustomSecondaryColor(`#${hex_code}`)
      setSecondaryButtonFlag(!testRes)
    }
  }

  useEffect(() => {
    loadInitialSettings(storeId)
  }, [])

  const onSave = () => {
    const updatedSettings = {
      storeLogoUrl,
      splashScreenBackgroundUrl,
      primaryColor,
      secondaryColor,
      layout,
    }
    updateKioskThemeinDB(updatedSettings, storeId, merchantId)
  }
 const NotificationPopUp=()=>{NotificationMsg("SUCCESS","Color Applied","BottomRight")}

  useEffect(() => {
    if (flag) history.push('/app/storeSettings')
  }, [flag])

  return (
    <>
      <ExampleImage show={showExImg} close={() => setShowExImg(false)}>
        {exampleImage === exampleImages[0] ? (
          <img
            src="https://multimedia-goplinto-prod.s3.ap-south-1.amazonaws.com/general/arrow.svg"
            alt="The Image could not be loaded..."
            width="20%"
            height="20%"
            style={{ position: 'relative', left: '2%', top: '31%' }}
          />
        ) : null}
        <img
          src={exampleImage}
          alt="The Image could not be loaded..."
          className="main__image"
          width="80%"
          height="80%"
        />
        {exampleImage === exampleImages[0] ? (
          <img
            src="https://multimedia-goplinto-prod.s3.ap-south-1.amazonaws.com/general/arrow+2.svg"
            alt="The Image could not be loaded..."
            width="20%"
            height="20%"
            style={{ position: 'relative', right: '-1%' }}
          />
        ) : null}
      </ExampleImage>
      <article className="z-10">
        <Helmet>
          <title>Edit Kiosk Theme</title>
          <meta name="description" content="Edit Kiosk Theme Page" />
        </Helmet>

        <div className="sticky z-50 flex justify-between bg-white mobile-topNav ">
          <div className="flex flex-wrap content-center px-4 pt-4 text-xl font-semibold">
            <NavLink className="flex mr-4 text-xl font-medium text-black hover:text-secondary" to="/app/storeSettings">
              <MdArrowBack className="mr-2" size={30} />
            </NavLink>
            <p className="text-black">Edit Kiosk Theme</p>
          </div>
        </div>
        <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.KIOSK_SETTINGS}>
          <FormPage
            onSubmit={e => {
              e.preventDefault()
              onSave()
            }}
            className="flex flex-col justify-center border-box w-full px-4 md:w-3/4 mx-auto"
          >
            <div className="w-full md:w-3/4 mt-4 md:mt-4">
              <h1 className="px-2 font-sans text-base md:text-lg font-bold text-gray-700  break-normal lg:mt-0 ">
                Kiosk Settings
              </h1>
            </div>

            <div className="w-full border-box bg-white rounded-lg mt-3 mb-4">
              <div className="my-4 mx-4 flex flex-col border-box ">
                <div className="flex-1 flex-col md:px-2 mb-2">
                  <div
                    id="section1"
                    htmlFor="store"
                    className="md:flex items-center pl-2 mb-4 font-sans font-semibold text-lg font-medium text-gray-700 break-normal"
                  >
                    <span>Store Logo</span>
                    <br />
                    <span
                      className="text-xs text-gray-600"
                      style={{
                        fontSize: '0.6rem',
                      }}
                    >
                      &nbsp;( You can upload jpg, png format of size 1MB or less with a minimum resolution of 512x512 )
                    </span>
                  </div>

                  <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/2">
                      <ImageUpload
                        picture={storeLogoUrl}
                        onItemImageUpload={uploadLogo}
                        setPicture={() => {}}
                        remove={() => setLogoImg('')}
                        storeId={storeId}
                      />
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end items-end pt-2">
                      <span
                        className="exImg"
                        onClick={() => {
                          setShowExImg(true)
                          setExampleImage(exampleImages[0])
                        }}
                      >
                        View Example Img <i className="pl-2 fas fa-external-link-alt" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row  justify-start align-center border px-4 py-4">
                <AiOutlineInfoCircle className="flex-none mr-2 ml-4 text-black" size={18} />
                <span className="text-xs self-center font-medium text-gray-600">
                  Upload your brand logo, this will be displayed on the splash screen and entire kiosk app.
                </span>
              </div>
            </div>

            <div className="w-full border-box bg-white rounded-lg mt-4 mb-4">
              <div className="my-4 mx-4 flex flex-col border-box">
                <div className="flex-1 flex-col md:px-2 mb-2">
                  <div
                    id="section1"
                    htmlFor="store"
                    className="items-center pl-2 mb-4 font-sans font-semibold text-lg font-medium text-gray-700 break-normal"
                  >
                    <span>Splash Screen Background Image</span>
                    <br />
                    <span
                      className="text-xs text-gray-600"
                      style={{
                        fontSize: '0.6rem',
                      }}
                    >
                      ( You can upload jpg, png format of size 1MB or less with a minimum resolution of 512x512 )
                    </span>
                  </div>
                  <div className="flex flex-wrap w-full">
                    <div className="w-full md:w-1/2">
                      <ImageUpload
                        picture={splashScreenBackgroundUrl}
                        onItemImageUpload={uploadCover}
                        setPicture={() => {}}
                        remove={() => setCoverImg('')}
                        storeId={storeId}
                        banner
                      />
                    </div>
                    <div className="w-full md:w-1/2 flex justify-end items-end pt-2">
                      <span
                        className="exImg"
                        onClick={() => {
                          setShowExImg(true)
                          setExampleImage(exampleImages[1])
                        }}
                      >
                        View Example Img
                        <i className="pl-2 fas fa-external-link-alt" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row  justify-start align-center border px-4 py-4">
                <AiOutlineInfoCircle className="flex-none mr-2 ml-4 text-black" size={18} />
                <span className="text-xs self-center font-medium  text-gray-600">
                  Upload an image to showcase your brand, this will be displayed on the splash screen.
                </span>
              </div>
            </div>

            <div className="flex flex-col w-full pt-4 leading-normal text-gray-800 bg-white rounded-lg mt-4 mb-4">
              <div
                id="section1"
                htmlFor="store"
                className="w-full ml-6 mb-4 font-sans font-semibold text-lg font-medium text-gray-700 break-normal"
              >
                Primary Color of App
              </div>

              <div className="flex flex-wrap px-4 py-2 mb-2">
                <div className="w-full md:w-1/2 mb-2">
                  <label
                    id="section1"
                    htmlFor="store"
                    className="block mx-3 mb-4 font-sans text-sm font-medium text-gray-700 uppercase break-normal"
                  >
                    Our Color Suggestions
                  </label>{' '}
                  <div className="flex mx-3">
                    <div className="flex flex-col mr-2 items-center">
                      <div
                        className={`flex flex-row justify-center color__suggestion mb-2 ${
                          primaryColor === '#1eaf82' ? 'color__selected' : null
                        }`}
                      >
                        <button
                          onClick={() => setPC('#1eaf82')}
                          type="button"
                          style={{
                            background: '#1eaf82',
                          }}
                          className="h-10 w-10 rounded-lg focus:outline-none "
                        />
                      </div>
                      <p className={`text-xs ${primaryColor === '#1eaf82' ? 'color__selected-text' : null}`}>Green</p>
                    </div>
                    <div className="flex flex-col mr-2 items-center">
                      <div
                        className={`flex flex-row justify-center color__suggestion mb-2 ${
                          primaryColor === '#D85A5A' ? 'color__selected' : null
                        }`}
                      >
                        <button
                          onClick={() => setPC('#D85A5A')}
                          type="button"
                          style={{
                            background: '#D85A5A',
                          }}
                          className="h-10 w-10 rounded-lg focus:outline-none "
                        />
                      </div>
                      <p className={`text-xs ${primaryColor === '#D85A5A' ? 'color__selected-text' : null}`}>Red</p>
                    </div>

                    <div className="flex flex-col mr-2 items-center">
                      <div
                        className={`flex flex-row justify-center color__suggestion mb-2 ${
                          primaryColor === '#1492e6' ? 'color__selected' : null
                        }`}
                      >
                        <button
                          onClick={() => setPC('#1492e6')}
                          type="button"
                          style={{
                            background: '#1492e6',
                          }}
                          className="h-10 w-10 rounded-lg focus:outline-none "
                        />
                      </div>
                      <p className={`text-xs ${primaryColor === '#1492e6' ? 'color__selected-text' : null}`}>Blue</p>
                    </div>

                    <div className="flex flex-col mr-2 items-center">
                      <div
                        className={`flex flex-row justify-center color__suggestion mb-2 ${
                          primaryColor === '#FF8C50' ? 'color__selected' : null
                        }`}
                      >
                        <button
                          onClick={() => setPC('#FF8C50')}
                          type="button"
                          style={{
                            background: '#FF8C50',
                          }}
                          className="h-10 w-10 rounded-lg focus:outline-none "
                        />
                      </div>
                      <p className={`text-xs ${primaryColor === '#FF8C50' ? 'color__selected-text' : null}`}>Orange</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    id="section1"
                    htmlFor="store"
                    className="block mx-3 mb-4 font-sans text-sm font-light text-gray-700 uppercase break-normal"
                  >
                    Enter Hex Value
                  </label>{' '}
                  <div className="flex mx-3 customColorInput flex-row justify-start items-center">
                    <div style={{ background: customPrimaryColor===''? primaryColor : customPrimaryColor }} 
                    className="h-10 w-10 rounded-lg" maxLength="7" />
                    <input
                      type="text"
                      placeholder={placeholderColor}
                      className="w-1/2 h-10 mx-2 form-input focus:shadow-none"
                      value={customPrimaryColor}
                      style={{ width: '100px' }}
                      onChange={e=>handleHexChange(e,'PRIMARY')}
                      onKeyDown={e => e.key === " " && e.preventDefault()}
                    />
                    <button
                      type="button"
                      className="focus:outline-none border-box inline-block px-2 h-8 text-white uppercase shadow-md bg-secondary rounded-md hover:bg-secondary-700 capitalize"
                      disabled={primaryButtonFlag}
                      style={{
                        fontSize: '10px',
                        opacity: primaryButtonFlag ? 0.5 : 1,
                      }}
                      onClick={e => {setPC(customPrimaryColor); NotificationPopUp()}}
                    >
                      Apply Color
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-end mb-6">
                <span
                  className="exImg mx-6"
                  onClick={() => {
                    setShowExImg(true)
                    setExampleImage(exampleImages[2])
                  }}
                >
                  View Example Img <i className="pl-2 fas fa-external-link-alt" />
                </span>
              </div>

              <div className="flex flex-row  justify-start align-center border px-4 py-4">
                <AiOutlineInfoCircle className="flex-none mr-2 ml-4 text-black" size={18} />
                <span className="text-xs self-center font-medium  text-gray-600">
                  Choose a Primary color that determines your brand, this color will be applied to the entire kiosk app.
                </span>
              </div>
            </div>

            <div className="w-full pt-4 leading-normal text-gray-800 bg-white rounded-lg mt-4 mb-4">
              <div
                id="section1"
                htmlFor="store"
                className="flex flex-row w-full ml-6 mb-4 font-sans font-semibold text-lg font-medium text-gray-700 break-normal"
              >
                Secondary Color of App
              </div>

              <div className="inline-block w-full px-4 py-2">
                <div className="mb-2 flex flex-wrap w-full">
                  <div className="w-full md:w-1/2 md:pl-2 mb-4">
                    <label
                      id="section1"
                      htmlFor="store"
                      className="block mx-3 mb-4 font-sans text-sm font-medium text-gray-700 uppercase break-normal"
                    >
                      Our Color Suggestions
                    </label>{' '}
                    <div className="flex mx-3">
                      <div className="flex flex-col mr-2 items-center">
                        <div
                          className={`flex flex-row justify-center color__suggestion mb-2 ${
                            secondaryColor === '#1eaf82' ? 'color__selected' : null
                          }`}
                        >
                          <button
                            onClick={() => setSC('#1eaf82')}
                            type="button"
                            style={{
                              background: '#1eaf82',
                            }}
                            className="h-10 w-10 rounded-lg focus:outline-none "
                          />
                        </div>
                        <p className={`text-xs ${secondaryColor === '#1eaf82' ? 'color__selected-text' : null}`}>
                          Green
                        </p>
                      </div>
                      <div className="flex flex-col mr-2 items-center">
                        <div
                          className={`flex flex-row justify-center color__suggestion mb-2 ${
                            secondaryColor === '#D85A5A' ? 'color__selected' : null
                          }`}
                        >
                          <button
                            onClick={() => setSC('#D85A5A')}
                            type="button"
                            style={{
                              background: '#D85A5A',
                            }}
                            className="h-10 w-10 rounded-lg focus:outline-none "
                          />
                        </div>
                        <p className={`text-xs ${secondaryColor === '#D85A5A' ? 'color__selected-text' : null}`}>Red</p>
                      </div>
                      <div className="flex flex-col mr-2 items-center">
                        <div
                          className={`flex flex-row justify-center color__suggestion mb-2 ${
                            secondaryColor === '#1492e6' ? 'color__selected' : null
                          }`}
                        >
                          <button
                            onClick={() => setSC('#1492e6')}
                            type="button"
                            style={{
                              background: '#1492e6',
                            }}
                            className="h-10 w-10 rounded-lg focus:outline-none "
                          />
                        </div>
                        <p className={`text-xs ${secondaryColor === '#1492e6' ? 'color__selected-text' : null}`}>
                          Blue
                        </p>
                      </div>
                      <div className="flex flex-col mr-2 items-center">
                        <div
                          className={`flex flex-row justify-center color__suggestion mb-2 ${
                            secondaryColor === '#FF8C50' ? 'color__selected' : null
                          }`}
                        >
                          <button
                            onClick={() => setSC('#FF8C50')}
                            type="button"
                            style={{
                              background: '#FF8C50',
                            }}
                            className="h-10 w-10 rounded-lg focus:outline-none "
                          />
                        </div>
                        <p className={`text-xs ${secondaryColor === '#FF8C50' ? 'color__selected-text' : null}`}>
                          Orange
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      id="section1"
                      htmlFor="store"
                      className="block mx-3 mb-4 font-sans text-sm font-light text-gray-700 uppercase break-normal"
                    >
                      Enter Hex Value
                    </label>{' '}
                    <div className="flex mx-3 customColorInput flex-row justify-start items-center">
                      <div
                        style={{ background: customSecondaryColor===''? secondaryColor : customSecondaryColor }}
                        className="h-10 w-10 rounded-lg"
                        maxLength="7"
                      />
                      <input
                        type="text"
                        placeholder={placeholderColor}
                        className="w-1/2 h-10 mx-2 form-input focus:shadow-none"
                        value={customSecondaryColor}
                        style={{ width: '100px' }}
                        onChange={e => handleHexChange(e,'SECONDARY')}
                        onKeyDown={e => e.key === " " && e.preventDefault()}
                      />
                      <button
                        type="button"
                        className="focus:outline-none inline-block px-2 h-8 text-white uppercase shadow-md bg-secondary rounded-md hover:bg-secondary-700 capitalize"
                        disabled={secondaryButtonFlag}
                        style={{ fontSize: '10px', opacity: secondaryButtonFlag ? 0.5 : 1 }}
                        onClick={e => {setSC(customSecondaryColor); NotificationPopUp()}}
                      >
                        Apply Color
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row  justify-start align-center border px-4 py-4">
                <AiOutlineInfoCircle className="flex-none mr-2 ml-4 text-black" size={18} />
                <span className="text-xs self-center font-medium  text-gray-600">
                  Choose a Secondary color that determines your brand, this color will be applied to the entire kiosk
                  app.
                </span>
              </div>
            </div>

            <div className="w-full  pt-4 leading-normal text-gray-800 bg-white rounded-lg mt-4 mb-4 ">
              <div className="px-4">
                <label
                  id="section1"
                  htmlFor="store"
                  className="block ml-2 mb-4 font-sans font-semibold text-lg font-medium text-gray-700 break-normal"
                >
                  Choose a Layout
                </label>

                <div className="inline-block w-full px-4 py-8 border-box ">
                  <div className="flex flex-wrap w-full border-box">
                    <div className="w-full mb-6 md:w-1/2 md:px-4" onClick={() => setLyt('GRID')}>
                      <RadioOption
                        isSelected={layout === 'GRID'}
                        labelFor="config-side-bar-layout-grid"
                        value="GRID"
                        optionIcon="fa-grip-horizontal"
                        optionName="Grid Layout"
                        optionText="Grid View is a grid of images. It shows a product image with product information on the bottom."
                      />
                    </div>
                    <div className="w-full md:w-1/2" onClick={() => setLyt('LIST')}>
                      <RadioOption
                        isSelected={layout === 'LIST'}
                        labelFor="config-side-bar-layout-list"
                        value="LIST"
                        optionIcon="fa-list"
                        optionName="List Layout"
                        optionText="List view contains a small picture on the left side and product information on the right side."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  justify-start align-center border px-4 py-4">
                <AiOutlineInfoCircle className="flex-none mr-2 ml-4 text-black" size={18} />
                <span className="text-xs self-center font-medium  text-gray-600">
                  Choose a layout to display your products on the website.
                </span>
              </div>
            </div>

            {!apiStatus || updateError ? (
              <div className="flex-1 flex-row align-center mt-2">
                {!apiStatus && (
                  <p className="w-full font-medium text-red-500">*Something went wrong! Please try again later...</p>
                )}
                {updateError && (
                  <p className="w-full font-medium text-red-500">
                    *There was an error while updating Kiosk Theme. Please try again later...
                  </p>
                )}
              </div>
            ) : null}

            <span className="spacer mobileVersion" />

            <div className="bg-mob mt-10 py-2">
              <button type="submit" className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
                Save Changes
              </button>
            </div>
            <span className="spacer hide-mobile" />
          </FormPage>
        </IsFeatureSubscribed>
      </article>
      {/* footer */}
      <div style={{position:"sticky",top:"100vh",paddingTop:"10rem"}}>
        <PaymentPromotionImages/> 
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  kioskDisplaySettings: makeSelectKioskDisplaySettings(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  globalDisplaySettings: makeSelectGlobalDisplaySettings(),
  apiStatus: makeSelectApiStatus(),
  subscribedTo: makeSelectSubscribedModules(),
})

const mapDispatchToProps = dispatch => ({
  loadInitialSettings: storeId => dispatch(initSettings(storeId)),
  uploadLogo: (file, storeId) => dispatch(uploadLogoImg(file, storeId)),
  setLogoImg: key => dispatch(setLogo(key)),
  uploadCover: (file, storeId) => dispatch(uploadCoverPic(file, storeId)),
  setCoverImg: key => dispatch(setCoverPic(key)),
  setPC: color => dispatch(setPrimaryColor(color)),
  setSC: color => dispatch(setSecondaryColor(color)),
  setLyt: layout => dispatch(setLayout(layout)),
  updateKioskThemeinDB: (newThemeData, storeId, merchantId) =>
    dispatch(updateKioskTheme(newThemeData, storeId, merchantId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KioskSettingsPage)
