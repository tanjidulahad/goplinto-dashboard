import React, { useEffect } from 'react'
import ImageUpload from 'components/ImageUpload'
import { MdArrowBack } from 'react-icons/md'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { NavLink, useHistory } from 'react-router-dom'
import reducer from './reducers'
import saga from './saga'
import { connect } from 'react-redux'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectMobileSettings,
  makeSelectStoreId,
  makeSelectMerchantId,
  makeSelectSubscribedModules,
} from './selectors'
import {
  setAndroidTrayIcon,
  setIOSTrayIcon,
  setSplashScreenLogo,
  uploadSplashScreenLogo,
  uploadAndroidTrayIcon,
  uploadIOSTrayIcon,
  getMobileAppSettings,
  submitMobileAppSettings,
} from './actions'

import IsFeatureSubscribed from 'components/IsFeatureSubscribed'
import globalEnums from 'utils/globalEnums'
import PaymentPromotionImages from 'components/PaymentPromotionImages'

const MobileSettingsPage = ({
  currentState,
  merchantId,
  storeId,
  setSplashScreenLogo,
  setAndroidTrayIcon,
  setIOSTrayIcon,
  uploadSplashScreenLogo,
  uploadAndroidTrayIcon,
  uploadIOSTrayIcon,
  getMobileAppSettings,
  submitMobileAppSettings,
  subscribedTo,
}) => {
  let history = useHistory()
  useInjectReducer({ key: 'mobileAppSettings', reducer })
  useInjectSaga({ key: 'mobileAppSettings', saga })
  useEffect(() => {
    getMobileAppSettings(storeId)
  }, [])

  const { splashScreenLogo, androidTrayIcon, iosTrayIcon, error, flag } = currentState

  function submitButton() {
    submitMobileAppSettings({ storeId, merchantId, splashScreenLogo, androidTrayIcon, iosTrayIcon })
  }

  useEffect(() => {
    if (flag) history.push('/app/storeSettings')
  })

  return (
    <div>
      <div className="mb-10">
        <div className="sticky flex justify-between bg-white mobile-topNav ">
          <div className="flex flex-wrap content-center px-4 pt-4 text-xl font-semibold">
            <NavLink className="flex mr-4 text-xl font-medium text-black hover:text-secondary" to="/app/storeSettings">
              <MdArrowBack className="mr-2" size={30} />
            </NavLink>
            <p className="text-black">Edit Mobile App Theme</p>
          </div>
        </div>

        <IsFeatureSubscribed subscribedTo={subscribedTo} feature={globalEnums.MOBILE_SETTINGS}>
          <div className="p-2 mlw-full md:w-3/4 mt-6 md:mt-4">
            <h1 className="mobile-settings-title font-sans text-base md:text-lg font-bold text-black-700  break-normal lg:mt-0 ">
              Mobile Settings
            </h1>
          </div>
          <div className="mobile-settings-card">
            <div className="bg-white p-4 rounded-lg">
              <div className="display-in-view">
                <h1 className="font-sans text-base md:text-md font-bold text-black-700  break-normal lg:mt-0 ">
                  Splash Screen Logo
                </h1>
                <p className="px-2 mb-4 text-xs text-gray-700">
                  ( You can upload jpg, png format of size 1MB or less with a minimum resolution of 512x512 )
                </p>
              </div>
              <ImageUpload
                picture={splashScreenLogo}
                setPicture={setSplashScreenLogo}
                remove={() => setSplashScreenLogo('')}
                onItemImageUpload={uploadSplashScreenLogo}
                storeId={storeId}
              />
              <div className="mt-10">
                <div className="flex flex-row  justify-start border-t px-4 py-4">
                  <AiOutlineInfoCircle className="mr-2 ml-4 text-black" size={18} />
                  <span className="text-xs self-center font-normal  text-gray-800">
                    Upload your brand logo, this will be displayed on the splash screen and entire
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-white p-4 rounded-lg">
                <div className="display-in-view">
                  <h1 className="font-sans text-base md:text-md font-bold text-black-700  break-normal lg:mt-0 ">
                    App Tray Icon
                  </h1>
                  <p className="px-2 mb-4 text-xs text-gray-700">
                    (You can upload a 192x192 logo for Android, and 180x180 logo for iOS in jpg or png format.)
                  </p>
                </div>
                <div className="display-in-view">
                  <div>
                    <p className="px-2 mb-2 text-sm text-gray-700 font-bold text-center">Android</p>
                    <div className="flex justify-center">
                      <ImageUpload
                        icon
                        picture={androidTrayIcon}
                        setPicture={setAndroidTrayIcon}
                        remove={() => setAndroidTrayIcon('')}
                        onItemImageUpload={uploadAndroidTrayIcon}
                        storeId={storeId}
                      />
                    </div>
                  </div>
                  <div className="ios-mobile-icon-view">
                    <p className="px-2 mb-2 text-sm text-gray-700 font-bold text-center">iOS</p>
                    <div className="flex justify-center">
                      <ImageUpload
                        icon
                        picture={iosTrayIcon}
                        setPicture={setIOSTrayIcon}
                        remove={() => setIOSTrayIcon('')}
                        onItemImageUpload={uploadIOSTrayIcon}
                        storeId={storeId}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="flex flex-row  justify-start border-t px-4 py-4">
                    <AiOutlineInfoCircle className="mr-2 ml-4 text-black" size={18} />
                    <span className="text-xs self-center font-normal  text-gray-800">
                      This App icon will be displayed on the home screen.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 mt-8">*Something went wrong! Please try again later!</p>}

            <div className="note-and-button mt-6">
              <div>
                <span className="text-lg text-left self-center font-bold my-8 text-gray-800">Important Note:</span>
                <ol>
                  <li className="mt-2">
                    1) You can't choose a color since Website and Mobile App uses same color theme.
                  </li>
                  <li className="mt-2">2) You can't choose a layout since Mobile App uses only list layout.</li>
                </ol>
              </div>
              <div className="desktop px-2 save-button-align-only pb-4">
                <button
                  style={{ width: '100%' }}
                  type="submit"
                  className="focus:outline-none block w-auto px-4 py-2 my-2 mt-4 text-sm md:text-xl tracking-wider text-white shadow-md bg-secondary rounded-md hover:bg-secondary-700"
                  onClick={submitButton}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="mobile px-2 save-button-align-only pb-4">
            <button
              style={{ width: '100%' }}
              type="submit"
              className="focus:outline-none block w-auto px-4 py-2 my-2 mt-4 text-sm md:text-xl tracking-wider text-white shadow-md bg-secondary rounded-md hover:bg-secondary-700"
              onClick={submitButton}
            >
              Save Changes
            </button>
          </div>
        </IsFeatureSubscribed>
      </div>
      <div className='sticky' style={{marginTop:"10rem"}}>

      <PaymentPromotionImages/>
      </div>
    </div>
  )
}
const mapStateToProps = createStructuredSelector({
  currentState: makeSelectMobileSettings(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  subscribedTo: makeSelectSubscribedModules(),
})
const mapDispatchToProps = dispatch => ({
  setSplashScreenLogo: val => dispatch(setSplashScreenLogo({ value: val })),
  setAndroidTrayIcon: val => dispatch(setAndroidTrayIcon({ value: val })),
  setIOSTrayIcon: val => dispatch(setIOSTrayIcon({ value: val })),
  uploadSplashScreenLogo: (file, storeId) => dispatch(uploadSplashScreenLogo(file, storeId)),
  uploadAndroidTrayIcon: (file, storeId) => dispatch(uploadAndroidTrayIcon(file, storeId)),
  uploadIOSTrayIcon: (file, storeId) => dispatch(uploadIOSTrayIcon(file, storeId)),
  getMobileAppSettings: storeId => dispatch(getMobileAppSettings({ storeId })),
  submitMobileAppSettings: ({ storeId, merchantId, splashScreenLogo, androidTrayIcon, iosTrayIcon }) =>
    dispatch(submitMobileAppSettings({ storeId, merchantId, splashScreenLogo, androidTrayIcon, iosTrayIcon })),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MobileSettingsPage)
