import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import MediaQuery from 'react-responsive'
import { createStructuredSelector } from 'reselect'
import moment from 'moment'
import { RiExternalLinkLine } from 'react-icons/ri'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import 'react-step-progress-bar/styles.css'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'

import BinaryToggle from 'components/BinaryToggle'
import ShareModal from 'components/ShareModal'

import StoreSetUpCard from 'components/StoreSetUpCard'

import 'assets/Dashboard.css'
import { Tooltip} from 'antd'

import onBoardStoreSaga from 'containers/OnBoardStore/saga'
import homePageSaga from 'containers/HomePage/saga'
import PaymentPlanPageSaga from 'containers/PaymentPlanPage/saga'
import { toggleStore } from 'containers/OnBoardStore/actions'
import { getStoreData, getStoreGroupDetails } from 'containers/HomePage/actions'
import { getCurrentSubcriptionPlan } from 'containers/PaymentPlanPage/actions'
import paymentPlanReducer from 'containers/PaymentPlanPage/reducer'
import makeStoreUrl from 'utils/makeStoreUrl'
import {
  makeSelectOnboardingStatus,
  makeSelectStoreStats,
  makeSelectStore,
  makeSelectStoreGroupDetils,
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectUser,
} from './selectors'
import { makeSelectCurrentSubscriptionPlan } from '../PaymentPlanPage/selectors'

import { getOnboardingStatus, getStoreStats, getStoreModuleStats } from './actions'
import saga from './saga'
import reducer from './reducer'

import store_placeholder from '../../images/icons/store.svg'
import ar_up from '../../images/icons/up.svg'
import ar_down from '../../images/icons/down.svg'
import { getSubscribedModules } from 'containers/App/actions'
import arrow from '../../images/arrow.svg'
import bell from '../../images/icons/bell_yellow.svg'
import google from '../../images/icons/Google_blue.svg'
import QR from '../../images/icons/QRCode.svg'
import addOns from '../../images/icons/addOns.svg'
import NewFooter from 'components/Footer/newFooter'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'

const Dashboard = ({
  user,
  store,
  storeId,
  subscribedPlan,
  onboardingStatus,
  storeStats,
  getOnboardingStatus,
  getStoreStats,
  getStoreModuleStats,
  toggleStoreForMerchant,
  getStoreData,
  getCurrentSubcriptionPlan,
  getSubscribedModules,
  getStoreGroupDetails,
  storeGroupDetails,
}) => {
  const storeLink = makeStoreUrl(store.store_name, store.store_id)
  const [storeOpen, setStoreOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('FirstProduct')
  const [currentProgress, setCurrentProgress] = useState(0)
  const [showShareModal, setShowShareModal] = useState(false)
  const date = new Date()

  useInjectReducer({ key: 'dashboardPage', reducer })
  useInjectReducer({ key: 'subscriptionPlans', reducer: paymentPlanReducer })
  useInjectSaga({ key: 'dashboardPage', saga })
  useInjectSaga({ key: 'onBoardStore', saga: onBoardStoreSaga })
  useInjectSaga({ key: 'home', saga: homePageSaga })
  useInjectSaga({ key: 'subscriptionPlans', saga: PaymentPlanPageSaga })

  const history = useHistory()

  useEffect(() => {
    if (store.group_id) {
      getStoreGroupDetails(store.group_id)
      if (store.is_open_today === 'Y') setStoreOpen(true)
      else setStoreOpen(false)
    }
  }, [store])

  useEffect(() => {
    if (storeId) {
      getOnboardingStatus(storeId)
      getStoreModuleStats(storeId)
      getStoreData(storeId)
      getCurrentSubcriptionPlan(storeId)
      getSubscribedModules(storeId,user.role_id)
      if (user.role_id === 2) getStoreStats('groupId', store.group_id)
      else getStoreStats('storeId', storeId)
    }
  }, [storeId, store.logo_img_url])

  useEffect(() => {
    if (onboardingStatus) {
      const statuses = [
        onboardingStatus.inventory&&onboardingStatus.inventory.status,
        onboardingStatus.bankDetails&&onboardingStatus.bankDetails.status,
        onboardingStatus.themeCustomization&&onboardingStatus.themeCustomization.status,
      ]
      const currProgress = statuses.filter(status => status === 'IN_USE').length
      setCurrentProgress(currProgress)
      if (statuses[0] === 'PENDING') setCurrentSection('FirstProduct')
      else if (statuses[1] === 'PENDING') setCurrentSection('BankDetails')
      else if (statuses[2] === 'PENDING') setCurrentSection('CustomTheme')
    }
  }, [onboardingStatus])

const BusinessBoosterCard=({heading,text,icon,color1,RouteLink,color2})=>{
  return(
    <div onClick={() => history.push(RouteLink)} className="bg-white rounded-lg cursor-pointer" style={{ background: `-webkit-linear-gradient(0deg,${color1},${color2})`}} >
      <span className="flex w-full" style={{ width: '100%' }}>
        <img src={icon} className="mr-2 h-4 mt-1 mb-2 " />
        <label className="item-label text-sm font-medium capitalize">{heading}</label>
      </span>
      <span className='flex justify-between'>
        <p className="text-sm item-label md:mt-2 md:w-3/4">
          {text}
        </p>
        <img src={arrow} className="w-3 h-5 mt-3 arrow_icon" />
      </span>
    </div>
  )
}
  return (
    <>
      {/* HELMET AREA */}
      <Helmet>
        <title>GoPlinto Dashboard</title>
        <meta name="description" content="Dashboard and User Settings page" />
      </Helmet>
      {/* NAVBAR */}
     
      <ExtendedNavBar text={store.store_name} noBack noHelp />

      {/* MAIN SECTION */}
      <section className="px-2 md:px-8 relative">
        {/* Header Block */}
        <div className="bg-white md:flex justify-between rounded-lg shadow-lg px-2 md:px-4 mt-8">
          <div className="flex py-4">
            {user.role_id !== 2 && store.logo_img_url ? (
              <img
                src={store.logo_img_url}
                className="px-2 magic-image flex-none"
                style={{
                  width: '105px',
                  height: '100px',
                }}
                alt="Store Logo"
              />
            ) : user.role_id === 2 && storeGroupDetails.logo_img_url ? (
              <img
                src={store.logo_img_url}
                className="px-2 magic-image flex-none"
                style={{
                  width: '105px',
                  height: '100px',
                }}
                alt="Store Logo"
              />
            ) : (
              <img
                src={store_placeholder}
                className="px-2 magic-image flex justify-center rounded-full flex-none"
                style={{
                  backgroundColor: 'rgba(246, 75, 93,0.4)',
                  width: '105px',
                  height: '100px',
                }}
                alt="Store Logo"
              />
            )}
            <div>
              <h5 className="item-label ml-2 capitalize font-semibold text-lg">
                {user.role_id === 2 ? storeGroupDetails.group_name : store.store_name}
              </h5>
              <div className="ml-2">
                <div className="text-muted-med text-base font-medium">
                  <span>Role :</span>
                  <span className="ml-2">{user.role_name}</span>
                </div>
            {(user.role_id === 1)&& <NavLink to="/app/manage-members" >
                  <p className='text-xs font-semibold text-red-500'>Invite Members</p>
                </NavLink>}
              </div>
            </div>
          </div>

          <div className="md:flex py-2">
            {user.role_id !== 2 || (user.role_id === 2 && storeGroupDetails.group_domain_url) ? (
              <div className="flex flex-col justify-between py-3 px-2 md:px-4 storelink text-position-switch magic-border">
                <a
                  href={(user.role_id === 1 && store.store_domain_url !== null) ? store.store_domain_url : (user.role_id === 2 && storeGroupDetails.group_domain_url) ? storeGroupDetails.group_domain_url : storeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit your store!"
                  className="no-underline"
                >
                  <span className="md:flex">
                    <label className="item-sublabel text-xs font-normal focus:text-black">
                      {(user.role_id === 1 && store.store_domain_url !== null) ? store.store_domain_url : (user.role_id === 2 && storeGroupDetails.group_domain_url) ? storeGroupDetails.group_domain_url : storeLink}/&nbsp;
                    </label>
                    <RiExternalLinkLine size={15} className="item-label" />
                  </span>
                  <small className="text-secondary font-light text-smaller">View Live Store</small>
                </a>

                {/* Share Modal */}
                {showShareModal && (
                  <ShareModal
                    close={e => {
                      e.preventDefault()
                      setShowShareModal(false)
                    }}
                    storeUrl={(user.role_id === 1 && store.store_domain_url !== null) ? store.store_domain_url : (user.role_id === 2 && storeGroupDetails.group_domain_url) ? storeGroupDetails.group_domain_url : storeLink}
                  />
                )}

                <MediaQuery minDeviceWidth={1440}>
                  <button
                    className="flex ml-auto justify-center items-center shareBtn"
                   
                    onClick={e => {
                      e.preventDefault()
                      setShowShareModal(true)
                    }}
                  >
                    <span>Share</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                </MediaQuery>

                <MediaQuery maxDeviceWidth={1439}>
                  <button
                    className="flex mt-4 justify-center items-center shareBtn"                   
                    onClick={e => {
                      e.preventDefault()
                      setShowShareModal(true)
                    }}
                  >
                    <span>Share</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                  </button>
                </MediaQuery>
              </div>
            ) : null}
            <div className="mobileVersion">
              <br />
              <br />
              <hr className="custom-hr" />
              <br />
            </div>
            {user.role_id !== 2 && (
              <div className="py-2 px-2 text-left">
                <div className="flex mb-4 py-auto">
                  <label className="mr-2 text-muted-med text-base font-medium flex-none">Store Status</label>
                  <>
                    <BinaryToggle
                      toggle={storeOpen}
                      toggleCallback={() => {
                        const storeBoolean = !storeOpen
                        setStoreOpen(storeBoolean)
                        toggleStoreForMerchant(store.store_id, storeBoolean)
                      }}
                      activeColor="#F64B5D"
                      inactiveColor="rgba(36,36,36,0.3)"
                    />
                    <label className="ml-2 text-base text-black-pl flex-none font-medium">
                      {storeOpen ? 'ON' : 'OFF'}
                    </label>
                  </>
                </div>
                <div>
                  <div className="text-muted-med text-base font-medium">
                    <span>Store Plan :</span>
                    <span className="ml-2">
                      {subscribedPlan.length !== 0
                        ? subscribedPlan[subscribedPlan.length - 1].subscription_plan
                        : 'N/A'}
                    </span>
                  </div>
                  {subscribedPlan.length !== 0
                    && subscribedPlan[subscribedPlan.length - 1].subscription_plan !=="ENTERPRISE"&&
                  <small
                    onClick={e => {
                      history.push('/app/general/payment-plan')
                    }}
                    className="text-secondary text-smaller cursor-pointer"
                  >
                    Upgrade Plan
                  </small>}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="flex justify-between mt-5 rounded-lg text-white" style={{ backgroundColor: "#1EAF82" }}>
          <div className="p-5">
            <p>You have <label className="font-bold">10 New Orders!.</label></p>
            <p>{date.toDateString()}</p>
          </div>
          <div className="p-5"> <NavLink className="text-white" exact to="/app/orders">
            <button className="dash_view_btn border py-2 px-4 focus:outline-none hover:bg-white-1  rounded-lg">View Orders</button>
          </NavLink>
          </div>
        </div> */}
        {/* Setup Section */}
        <StoreSetUpCard
          onboardingStatus={onboardingStatus}
          currentProgress={currentProgress}
          setCurrentSection={setCurrentSection}
          currentSection={currentSection}
        />
        {onboardingStatus && onboardingStatus.onboardingStatus !== 'COMPLETED'&& <div className="w-full px-2 md:px-4 py-2 border tbl-rounded-bottom bg-white mb-16">
          <p className="flex text-muted-light font-medium mt-2">
            <AiOutlineInfoCircle className="mr-2 ml-4" size={18} />
            <span className="text-xs">Set up these settings to get your store up and running.</span>
          </p>
        </div>}
        {/* Overview Section */}
        <div className="mt-8 switch-display pb-2 px-2">
          <h3 className="item-label text-base md:text-lg" style={{ fontWeight: '900' }}>
            Overview &nbsp;
          </h3>
          {storeStats && storeStats.totalOrders.relativePercentage ? (
            <small className="text-muted-light text-xs font-normal mt-1" >
              {moment.utc().format('MMM Do YYYY')} Compared to{' '}
              {moment
                .utc()
                .subtract(1, 'day')
                .format('MMM Do YYYY')}
            </small>
          ) : null}
        </div>
        <div className="cardView gap-4 mb-16">
          <div className="md:w-1/4 bg-white rounded-lg px-4 py-4">
            <div className="overview_Cards_Heading" style={{ width: "100%" }}>
              <label className="item-label text-sm md:text-base font-medium capitalize">Total Sales</label>
              <Tooltip
                title="Total amount of sales that have been generated via the website."
                arrowPointAtCenter
                color="#242424"
              >
                <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light hover:text-black flex-none" size={20} />
              </Tooltip>
            </div>
            <h2 className="text-black-pl text-xl mt-2 mb1 font-black">
              {store.currency_symbol} {storeStats && storeStats.totalSales.amount}
            </h2>
            {storeStats && storeStats.totalSales.relativePercentage ? (
              <small
                className={`font-bold text-xs ${
                  storeStats.totalSales.relativePercentage > 0 ? 'text-success' : 'text-danger'
                }`}
              >
                <img
                  className="inline-block mr-1"
                  src={storeStats.totalSales.relativePercentage > 0 ? ar_up : ar_down}
                  style={{ height: '10px', width: '10px' }}
                />
                {storeStats.totalSales.relativePercentage}%
              </small>
            ) : null}
          </div>
          <div className="md:w-1/4 bg-white rounded-lg px-4 py-4">
            <div className="overview_Cards_Heading" style={{ width: "100%" }}>
              <label className="item-label text-sm md:text-base font-medium capitalize">Total Orders</label>
              <Tooltip
                title="Total number of orders (Delivered /Cancelled) that has been placed through the website."
                arrowPointAtCenter
                color="#242424"
              >
                <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light hover:text-black flex-none" size={20} />
              </Tooltip>
            </div>
            <h2 className="text-black-pl text-xl mt-2 mb1 font-black">{storeStats && storeStats.totalOrders.count}</h2>
            {storeStats && storeStats.totalOrders.relativePercentage ? (
              <small
                className={`font-bold text-xs ${
                  storeStats.totalSales.relativePercentage > 0 ? 'text-success' : 'text-danger'
                }`}
              >
                <img
                  className="inline-block mr-1"
                  src={storeStats.totalOrders.relativePercentage > 0 ? ar_up : ar_down}
                  style={{ height: '10px', width: '10px' }}
                />
                {storeStats.totalOrders.relativePercentage}%
              </small>
            ) : null}
          </div>
          <div className="md:w-1/4 bg-white rounded-lg px-4 py-4">
            <div className="overview_Cards_Heading" style={{width:"100%"}}>
              <label className="item-label text-sm md:text-base flex font-medium capitalize">Total Customers</label>
              <Tooltip
                title="Total number of customers, who have placed orders on the website."
                arrowPointAtCenter
                color="#242424"
              >
                <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light hover:text-black flex-none" size={20} />
              </Tooltip>
            </div>
            <h2 className="text-black-pl text-xl mt-2 mb1 font-black">
              {storeStats && storeStats.totalCustomers.count}
            </h2>
            {storeStats && storeStats.totalCustomers.relativePercentage ? (
              <small
                className={`font-bold text-xs ${
                  storeStats.totalSales.relativePercentage > 0 ? 'text-success' : 'text-danger'
                }`}
              >
                <img
                  className="inline-block mr-1"
                  src={storeStats.totalCustomers.relativePercentage > 0 ? ar_up : ar_down}
                  style={{ height: '10px', width: '10px' }}
                />
                {storeStats.totalCustomers.relativePercentage}%
              </small>
            ) : null}
          </div>
          <div className="md:w-1/4 bg-white rounded-lg px-4 py-4">
            <div className="overview_Cards_Heading" style={{ width: "100%" }}>
              <label className="item-label text-sm md:text-base flex font-medium capitalize">Total Items</label>
              <Tooltip
                title="Total number of unique items that have been purchased on the website."
                arrowPointAtCenter
                color="#242424"
              >
                <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light hover:text-black flex-none" size={20} />
              </Tooltip>
            </div>
            <h2 className="text-black-pl text-xl mt-2 mb1 font-black">{storeStats && storeStats.totalItems.count}</h2>
            {storeStats && storeStats.totalItems.relativePercentage ? (
              <small
                className={`font-bold text-xs ${
                  storeStats.totalSales.relativePercentage > 0 ? 'text-success' : 'text-danger'
                }`}
              >
                <img
                  className="inline-block mr-1"
                  src={storeStats.totalItems.relativePercentage > 0 ? ar_up : ar_down}
                  style={{ height: '10px', width: '10px' }}
                />
                {storeStats.totalItems.relativePercentage}%
              </small>
            ) : null}
          </div>
        </div>
        {/* Business Boosters Section */}
        <div className="mt-8 switch-display pb-2 px-2">
          <h3 className="item-label text-base md:text-lg" style={{ fontWeight: '900' }}>
            Business Boosters &nbsp;
          </h3>
        </div>
        <div className="businessCards gap-4 mb-8">
          <BusinessBoosterCard heading="Send Notifications" text="Create customized notifications for your customers." color1="#f5e2cc" color2="#f4ebcf" icon={bell} RouteLink="/app/general/marketing&branding/push-notification" />
          <BusinessBoosterCard heading="QR Posters" text="Get your own QR posters for easy & fast Payments." color1="#bbe4e6" color2="#d0f4e9" icon={QR} RouteLink="/app/general/marketing&branding/branding" />
          <BusinessBoosterCard heading="Google Services" text="Get advance google tools for creating better marketing strategies." color1="#ccdbf4" color2="#d9e3f3" icon={google} RouteLink="/app/integrations" />
          <BusinessBoosterCard heading="Try Add-ons" text="Make your website more attractive with Goplinto Add-ons." color1="#e7ccd4" color2="#ecddde" icon={addOns} RouteLink="/app/general/add-ons" />
        </div>
        {/* Dynamiv Card Section */}
        <div className="spacer mobileVersion" />
      </section>

      {/* footer */}
      <NewFooter/>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  onboardingStatus: makeSelectOnboardingStatus(),
  storeStats: makeSelectStoreStats(),
  store: makeSelectStore(),
  storeGroupDetails: makeSelectStoreGroupDetils(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  subscribedPlan: makeSelectCurrentSubscriptionPlan(),
  user: makeSelectUser(),
})

const mapDispatchToProps = dispatch => ({
  getOnboardingStatus: storeId => {
    dispatch(getOnboardingStatus(storeId))
  },
  getStoreStats: (level, id, startDate, endDate) => {
    dispatch(getStoreStats(level, id, startDate, endDate))
  },
  getStoreModuleStats: storeId => {
    dispatch(getStoreModuleStats(storeId))
  },
  toggleStoreForMerchant: (storeId, isOpen) => {
    dispatch(toggleStore(storeId, isOpen))
  },
  getStoreData: storeId => {
    dispatch(getStoreData(storeId))
  },
  getStoreGroupDetails: groupId => {
    dispatch(getStoreGroupDetails(groupId))
  },
  getCurrentSubcriptionPlan: storeId => {
    dispatch(getCurrentSubcriptionPlan({ storeId }))
  }, 
  getSubscribedModules: (storeId,roleId) => {
    dispatch(getSubscribedModules(storeId,roleId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
