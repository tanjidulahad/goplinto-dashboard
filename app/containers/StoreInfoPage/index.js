import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import Form from 'containers/HomePage/Form'
import Modal from 'components/Modal'

import { NavLink, useHistory } from 'react-router-dom'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useMediaQuery } from 'react-responsive'
import { getStoreTypes, getSubscribedModules } from 'containers/App/actions'

import homePageSaga from 'containers/HomePage/saga'
import bankPageSaga from 'containers/BankPage/saga'
import homePageReducer from 'containers/HomePage/reducer'
import storeSettingsSaga from 'containers/StoreSettingsPage/saga'
import displaySettingsSaga from 'containers/StoreDisplaySettingsPage/saga'

import { createStore, getStoreData } from 'containers/HomePage/actions'
import { getBankData } from 'containers/BankPage/actions'
import { getStoreSettings } from 'containers/StoreSettingsPage/actions'
import { createStructuredSelector } from 'reselect'
import { IoIosArrowForward } from 'react-icons/io'
import saga from './saga'
import reducer from './reducer'
import general_settings_img from '../../images/general_settings_img.svg'
import checkout_settings_img from '../../images/checkout_settings_img.svg'
import DisabledFeature from './DisabledFeature'
import globalEnums from 'utils/globalEnums'
import generalSubmodulesEnums from 'utils/generalSubmodulesEnums'

import 'assets/GlobalStyles.css'

import {
  makeSelectBank,
  makeSelectDisplaySettings,
  makeSelectMerchantId,
  makeSelectStore,
  makeSelectStoreId,
  makeSelectStoreModules,
  makeSelectStoreSettings,
  makeSelectUser,
} from './selectors'
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'

const displaySection = (target, display, storeDisplay = false) => {
  if (!target) return display(false)
  if (!Object.keys(target).length) return display(false)
  for (const key in target) {
    if (storeDisplay && (key === 'logo_img_url' || key === 'banner_img_url')) continue
    if (!target[key]) {
      return display(false)
    }
  }
  return display(true)
}


const StoreInfoPage = ({
  merchantId,
  storeId,
  createStoreForMerchant,
  getStoreInformation,
  getBankInformation,
  bank,
  store,
  getStoreSettingsInformation,
  settings,
  storeDisplaySettings,
  getStoreTypes,
  storeModules,
  user,
  getSubscribedModules
}) => {
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 1101 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 1100 })
    return isMobile ? children : null
  }
  useEffect(() => {
    getSubscribedModules(storeId,user.role_id)
  }, []);
  useInjectReducer({ key: 'home', reducer: homePageReducer })

  useInjectSaga({ key: 'home', saga: homePageSaga })
  useInjectSaga({ key: 'bank', saga: bankPageSaga })
  useInjectSaga({ key: 'storeInfo', saga })
  useInjectReducer({ key: 'storeInfo', reducer })
  useInjectSaga({ key: 'storeSettings', saga: storeSettingsSaga })
  useInjectSaga({ key: 'displaySettings', saga: displaySettingsSaga })

  const {
    store_name,
    store_desc,
    primary_email,
    store_type,
    primary_phone,
    is_open_today,
  } = store
  const { bank_name, account_name, account_no, IFSC, branch } = bank

  const [showStoreCreationModal, setShowStoreCreationModal] = useState(false)
  const [storeName, setStoreName] = useState('')

  const [showGeneralSettings, setShowGeneralSettings] = useState(false)
  const [showDisplaySettings, setShowDisplaySettings] = useState(false)
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [showStoreSettings, setShowStoreSettings] = useState(false)

  const onCreateStore = () => {
    createStoreForMerchant(merchantId, storeName)
    setShowStoreCreationModal(false)
  }

  const history = useHistory()

  const upgradePlan = e => {
    e.preventDefault()
    history.push('/app/general/payment-plan')
  }

  const initializeStore = () => {
    if (storeId) {
      getStoreInformation(storeId)
      getBankInformation(storeId, merchantId)
      getStoreSettingsInformation(storeId)
    }
    const storeObject = {
      store_name,
      store_desc,
      store_type,
      primary_email,
      is_open_today,
      primary_phone,
    }
    displaySection(storeObject, setShowGeneralSettings)
    const bankObject = { bank_name, account_name, account_no, IFSC, branch }
    displaySection(bankObject, setShowBankDetails)
    if (storeDisplaySettings) displaySection(storeDisplaySettings, setShowDisplaySettings, true)
    if (settings) {
      const {
        store_timings,
        delivery_timings,
        operating_days,
        is_delivery_available,
        is_checkout_enabled,
        is_convenience_fee_charged,
        is_delivery_fee_charged,
        is_pick_up_only,
        delivery_range,
        is_cod_accepted,
        is_payment_accepted,
      } = settings
      const storeSettingsObject = {
        store_timings,
        delivery_timings,
        operating_days,
        is_delivery_available,
        is_delivery_fee_charged,
        is_checkout_enabled,
        is_convenience_fee_charged,
        is_pick_up_only,
        delivery_range,
        is_cod_accepted,
        is_payment_accepted,
      }
      displaySection(storeSettingsObject, setShowStoreSettings)
    } else setShowStoreSettings(false)
  }

  useEffect(() => {
    // TODO: Need to handle this better
    initializeStore()
    // const interval = setInterval(() => {
    //   initializeStore()
    // }, 5000)
    // return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    getStoreTypes()
  }, [])

  const [num, setNum] = useState(0);
  useEffect(() => {
    setNum(storeModules && Object.keys(storeModules).length)
  }, [storeModules]);
  return (
    <article>
      <Helmet>
        <title>Store Info</title>
        <meta name="description" content="Store Info page" />
      </Helmet>

      {storeId ? (
        <div className="mb-16">
          <ExtendedNavBar text="Store Settings" noBack/>
          <Form className="flex flex-col w-full px-4 my-2 md:px-10 md:my-2 mb-16">
            <div className="w-full md:p-4 md:mt-2 leading-normal text-gray-800 rounded-lg lg:mt-0">
              {/* General Settings */}
              <div>
                <p className="my-4 text-lg md:text-xl item-label-title">General Settings</p>
                <div className="flex flex-wrap w-full bg-white tbl-rounded">
                  <div className="w-full md:w-1/4 border">
                    <Desktop>
                      <div className="px-4 py-4">
                        <img src={general_settings_img} />
                        <p className="flex text-muted-light text-sm font-medium">
                          <span style={{ marginTop: '1em' }}>Set your store details, contact info, bank and more.</span>
                        </p>
                      </div>
                    </Desktop>
                    <Mobile>
                      <div className="px-4 py-4">
                        <p className="flex">
                          <img src={general_settings_img} width={60} />
                          <span
                            className="text-muted-light text-sm font-medium"
                            style={{ marginTop: '1em', marginLeft: '1em' }}
                          >
                            Set your store details, contact info, bank and more.
                          </span>
                        </p>
                      </div>
                    </Mobile>
                  </div>
                  <div className="w-full md:w-3/4 flex border">
                    <div className="w-full">
                      {storeModules && num > 0 && storeModules[globalEnums.GENERAL_INFORMATION] && storeModules[globalEnums.GENERAL_INFORMATION].submodules[generalSubmodulesEnums.STORE_INFORMATION] ?
                      <NavLink to="/app/general/store-details">
                        <button className="flex justify-between block w-full px-6 py-4 text-left border-b-2 settings">
                          <div>
                            <p className="item-label text-base md:text-lg font-semibold">Store Details</p>
                            <p className="item-sublabel">Manage your site's name, description and store type.</p>
                          </div>
                          <IoIosArrowForward
                            className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
                            size={25}
                          />
                        </button>
                      </NavLink>
                      : (
                      <DisabledFeature
                            title="Store Details"
                            desc="Manage your site's name, description and store type."
                        upgradePlan={upgradePlan}
                      />
                        )}
                      {storeModules && num > 0 && storeModules[globalEnums.GENERAL_INFORMATION] && storeModules[globalEnums.GENERAL_INFORMATION].submodules[generalSubmodulesEnums.STORE_INFORMATION] ?
                      <NavLink to="/app/general/region-and-currency-info">
                        <button className="flex justify-between w-full px-6 py-4 text-left border-b-2 settings">
                          <div>
                            <p className="item-label text-base md:text-lg font-semibold">Region & Currency Details</p>
                            <p className="item-sublabel">
                              Set time zone and currency to be displayed on your site. This will be default format on your site.
                            </p>
                          </div>
                          <IoIosArrowForward
                            className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
                            size={25}
                          />
                        </button>
                      </NavLink>
                        : (
                          <DisabledFeature
                            title="Region & Currency Details"
                            desc="Set time zone and currency to be displayed on your site. This will be default format on your site."
                            upgradePlan={upgradePlan}
                          />
                        )}
                      {storeModules && num > 0 && storeModules[globalEnums.GENERAL_INFORMATION] && storeModules[globalEnums.GENERAL_INFORMATION].submodules[generalSubmodulesEnums.CONTACT_INFORMATION] ?
                      <NavLink to="/app/general/contact-info">
                        <button className="flex justify-between block w-full px-6 py-4 text-left border-b-2 settings">
                          <div>
                            <p className="item-label text-base md:text-lg font-semibold">Contact Info</p>
                            <p className="item-sublabel">
                              Provide your contact info and more, so visitors can find you.
                            </p>
                          </div>
                          <IoIosArrowForward
                            className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
                            size={25}
                          />
                        </button>
                      </NavLink>
                        : (
                          <DisabledFeature
                            title="Contact Info"
                            desc="Provide your contact info and more, so visitors can find you."
                            upgradePlan={upgradePlan}
                          />
                        )}
                      {storeModules && num > 0 && storeModules[globalEnums.GENERAL_INFORMATION] && storeModules[globalEnums.GENERAL_INFORMATION].submodules[generalSubmodulesEnums.BANK_INFORMATION] ? (
                      <NavLink to="/app/general/bank-details">
                        <button className="flex justify-between block w-full px-6 py-4 text-left settings">
                          <div>
                            <p className="item-label text-base md:text-lg font-semibold">Bank Details</p>
                            <p className="item-sublabel">Setup your bank details to get your settlements.</p>
                          </div>
                          <IoIosArrowForward
                            className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
                            size={25}
                          />
                        </button>
                      </NavLink>
                      ) : (
                        <DisabledFeature
                            title="Bank Details"
                            desc="Setup your bank details to get your settlements."
                            upgradePlan={upgradePlan}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Settings */}
              <div className="mt-6">
                <p className="my-4 text-lg md:text-xl item-label-title">Checkout Settings</p>
                <div className="flex flex-wrap w-full bg-white tbl-rounded">
                  <div className="w-full md:w-1/4 border">
                    <Desktop>
                      <div className="px-4 py-4">
                        <img src={checkout_settings_img} />
                        <p className="flex text-muted-light font-medium">
                          <span style={{ marginTop: '1em' }}>
                            Manage your payment settings, delivery and how you sell online.
                          </span>
                        </p>
                      </div>
                    </Desktop>
                    <Mobile>
                      <div className="px-4 py-4">
                        <p className="flex">
                          <img src={checkout_settings_img} width={60} />
                          <span
                            className="text-muted-light font-medium"
                            style={{ marginTop: '1em', marginLeft: '1em' }}
                          >
                            Manage your payment settings, delivery and how you sell online.
                          </span>
                        </p>
                      </div>
                    </Mobile>
                  </div>
                  <div className="w-full md:w-3/4">
                    <div className="w-full">
                      {/* Payment Configuration */}
                      {storeModules && num > 0  && storeModules[globalEnums.PAYMENT_CONFIGURATION] ? (
                        <NavLink to="/app/general/payment-settings">
                          <button className="flex justify-between block w-full px-6 py-4 text-left border-b-2 settings">
                            <div>
                              <p className="item-label text-base md:text-lg font-semibold">Payment Configuration</p>
                              <p className="item-sublabel">Choose how customers pay you.</p>
                            </div>
                            <IoIosArrowForward
                              className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
                              size={25}
                            />
                          </button>
                        </NavLink>
                      ) : (
                        <DisabledFeature
                          title="Payment Configuration"
                          desc="Choose how customers pay you."
                          upgradePlan={upgradePlan}
                        />
                      )}

                      {/* Delivery Configuration */}
                      {storeModules && num > 0 &&storeModules[globalEnums.SHIPPING] ? (
                        <NavLink to="/app/general/delivery-configuration">
                          <button className="flex justify-between block w-full px-6 py-4 border-b-2 text-left settings">
                            <div>
                              <p className="py-2 item-label text-base md:text-lg font-semibold">
                                Delivery Configuration
                              </p>
                              <p className="item-sublabel">Manage your store delivery rates and more.</p>
                            </div>
                            <IoIosArrowForward
                              className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
                              size={25}
                            />
                          </button>
                        </NavLink>
                      ) : (
                        <DisabledFeature
                          title="Delivery Configuration"
                          desc="Manage your store delivery rates and more."
                          upgradePlan={upgradePlan}
                        />
                      )}

                      <NavLink to="/app/general/store-tax">
                        <button className="flex justify-between block w-full px-6 py-4 text-left settings">
                          <div>
                            <p className="py-2 item-label text-base md:text-lg font-semibold">Store Taxes</p>
                            <p className="item-sublabel">Add or edit tax charges for your store.</p>
                          </div>
                          <IoIosArrowForward
                            className="px-1 py-1 my-auto flex-none bg-white self-center rounded-full text-secondary"
                            size={25}
                          />
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Form>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center my-64 text-2xl text-center text-gray-800">
            <div>You don't have a store yet. Let's create one. It's very simple!</div>
            <button
              type="button"
              className="block object-center px-4 py-1 my-2 mt-12 text-2xl tracking-wider bg-white border-2 shadow-lg focus:outline-none border-secondary text-secondary rounded-md hover:border-seondary-900"
              onClick={() => setShowStoreCreationModal(true)}
            >
              <i className="mr-2 fas fa-plus" />
              Create Store
            </button>
          </div>
          {showStoreCreationModal && (
            <Modal
              title="New Store"
              closeModal={() => setShowStoreCreationModal(false)}
              onCreateAttribute={onCreateStore}
            >
              <Form>
                <input
                  placeholder="Your Super Store's Name"
                  type="text"
                  className="w-full form-input"
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                />
              </Form>
            </Modal>
          )}
        </div>
      )}
      <div className='sticky pt-10'>
        <PaymentPromotionImages />
      </div>
    </article>
  )
}

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  store: makeSelectStore(),
  bank: makeSelectBank(),
  settings: makeSelectStoreSettings(),
  storeDisplaySettings: makeSelectDisplaySettings(),
  storeModules:makeSelectStoreModules(),
  user: makeSelectUser(),
})

const mapDispatchToProps = dispatch => ({
  createStoreForMerchant: (merchantId, storeName) => dispatch(createStore(merchantId, storeName)),
  getStoreInformation: storeId => dispatch(getStoreData(storeId)),
  getBankInformation: (storeId, merchantId) => dispatch(getBankData(storeId, merchantId)),
  getStoreSettingsInformation: storeId => dispatch(getStoreSettings(storeId)),
  getStoreTypes: () => dispatch(getStoreTypes()),
  getSubscribedModules: (storeId,roleId) => dispatch(getSubscribedModules(storeId,roleId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreInfoPage)
