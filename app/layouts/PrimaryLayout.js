// Primary App routes live here

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

// Components go here
import PrimarySideBar from 'components/PrimarySideBar'

// Pages go here
import Dashboard from 'containers/Dashboard/Loadable'
import Reports from 'containers/Reports/Loadable'
import ViewReport from 'containers/ViewReport/Loadable'
import InventoryPage from 'containers/InventoryPage/Loadable'
import AddItemPage from 'containers/AddItemPage/Loadable'
import PricingPageCards from 'containers/PricingPage/Loadable'
import StoreInfoPage from 'containers/StoreInfoPage/Loadable'
import ManageStore from 'containers/ManageStore/Loadable'
import OrdersPage from 'containers/OrdersPage/Loadable'
import OrderDetails from 'containers/OrderDetails/Loadable'
import StoreDetails from 'containers/StoreDetails/Loadable'
import StoreSeo from 'containers/StoreSeo/Loadable'
import ContactInfo from 'containers/ContactInfo/Loadable'
import RegionAndCurrencyInfo from 'containers/RegionAndCurrencyInfo/Loadable'
import PaymentPlan from 'containers/PaymentPlanPage/Loadable'
import CreateNotification from 'containers/CreateNotificationPage/Loadable'
import PushNotification from 'containers/PushNotificationPage/Loadable'
import CheckoutPage from 'containers/CheckoutPage/Loadable'
import PlanUpgradation from 'containers/PlanUpgradation/Loadable'
import BankDetails from 'containers/BankDetails/Loadable'
import BillingHistory from 'containers/BillingHistory/Loadable'
import InviteMembers from 'containers/InviteMembers/Loadable'
import AddMembersPage from 'containers/InviteMembers/AddMembersPage'
import PaymentConfiguration from 'containers/PaymentConfiguration/Loadable'
import StoreTax from 'containers/StoreTax/Loadable'
import SocialAccounts from 'containers/SocialAccounts/Loadable'
import StorePolicy from 'containers/StorePolicy/Loadable'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'
import CustomRoute from 'routes/CustomRoute'
import FeaturesCarousel from 'components/FeaturesCarousel'
import ManageInventory from 'containers/ManageInventory/Loadable'
import AddCreditsPage from 'containers/AddCreditsPage'
import BannerImage from 'containers/BannerImage'
import AboutUs from 'containers/AboutUs'
import DesignPage from 'containers/DesignPage/Loadable'
import TemplatesPage from 'containers/TemplatesPage'
import RichTextEditor from 'components/RichTextEditor'
import EmailMarketing from 'containers/EmailMarketing/Loadable'
import AddGrid from 'containers/AddGrid'
import CreateCoupons from '../containers/CreateCoupons/Loadable'
import Coupons from '../containers/Coupons/Loadable'
import Integrations from '../containers/Integrations/Loadable'
import OnBoardStore from '../containers/OnBoardStore/Loadable'
import PlanExpired from '../containers/PlanExpired/Loadable'
import EditInformation from '../containers/EditInformation/Loadable'
import MobileSettingsPage from '../containers/MobileSettingsPage'
import KioskThemePage from '../containers/KioskThemePage/Loadable'
import IntegrationEdit from '../containers/IntegrationEdit/Loadable'
import MorePage from '../containers/MorePage/Loadable'
import MyAccount from '../containers/MyAccount/Loadable'
import MyProfile from '../containers/MyProfile/Loadable'
import DeliveryConfiguration from '../containers/DeliveryConfiguration/Loadable'
import Branding from '../containers/Branding/Loadable'
import MarketingAndBranding from '../containers/MarketingAndBranding/Loadable'
import AddOns from '../containers/AddOns/Loadable'
import BestSellers from '../containers/BestSellers/loadable'
import NewArrivals from '../containers/NewArrivals/loadable'
import { makeSelectGlobalUser, makeSelectShowFeaturesCarousel } from '../containers/Auth/selectors'
import { makeSelectStore, makeSelectStoreId, makeSelectSubscribedModules } from '../containers/StoreInfoPage/selectors'
import { getSubscribedModules } from '../containers/App/actions'

const PrimaryLayout = ({ match, user, store, showFeatures, subscribedTo, getSubscriptionDetails, storeId }) => {
  const history = useHistory()
  useEffect(() => {
    if (!subscribedTo.fetched) {
      getSubscriptionDetails(storeId, user.role_id)
    }
  }, [subscribedTo])

  const toRender =
    history.location.pathname !== '/app/onboard-store/create' ? (
      (user && user.primary_store_id > 0) || store.onboard_status == 'COMPLETED' ? (
        user.onboard_status == 'COMPLETED' || store.onboard_status == 'COMPLETED' ? (
          store.store_id && store.store_status !== 'ACTIVE' ? (
            <Redirect
              exact
              path={`${match.path}`}
              to={{
                pathname: '/app/plan-expired',
                state: {},
              }}
            />
          ) : (
            <>
              {/* Routes for which info about subs. plan is not req. */}
              <Route exact path={`${match.path}`} component={Dashboard} />
              <Route path={`${match.path}/pricing-page`} component={PricingPageCards} />
              <Route exact path={`${match.path}/orders`} component={OrdersPage} />
              <Route path={`${match.path}/orders/details`} component={OrderDetails} />
              <Route path={`${match.path}/billing`} component={BillingHistory} />
              <Route exact path={`${match.path}/manage-members`} component={InviteMembers} />
              <Route exact path={`${match.path}/manage-members/member`} component={AddMembersPage} />
              <Route path={`${match.path}/general/payment-plan`} component={PaymentPlan} />
              <Route path={`${match.path}/checkout`} component={CheckoutPage} />
              {/* <Route path={`${match.path}/general/store-policies`} component={StorePolicy} /> */}
              <Route path={`${match.path}/general/store-tax`} component={StoreTax} />
              <Route path={`${match.path}/general/plan-upgraded`} component={PlanUpgradation} />
              {/* Routes for which info about subs. plan is req. */}
              <CustomRoute exact path={`${match.path}/manage-items`} component={InventoryPage} />
              <CustomRoute exact path={`${match.path}/manage-items/item`} component={AddItemPage} />
              <CustomRoute exact path={`${match.path}/manage-inventory-items`} component={ManageInventory} />
              <CustomRoute exact path={`${match.path}/storeSettings`} component={StoreInfoPage} />
              <CustomRoute path={`${match.path}/manageStore`} component={ManageStore} />
              <CustomRoute exact path={`${match.path}/reports`} component={Reports} />
              <CustomRoute path={`${match.path}/reports/view-report`} component={ViewReport} />
              <CustomRoute path={`${match.path}/general/store-details`} component={StoreDetails} />
              <CustomRoute path={`${match.path}/general/seo`} component={StoreSeo} />
              <CustomRoute path={`${match.path}/general/contact-info`} component={ContactInfo} />
              <CustomRoute path={`${match.path}/general/region-and-currency-info`} component={RegionAndCurrencyInfo} />
              <CustomRoute path={`${match.path}/general/bank-details`} component={BankDetails} />
              <CustomRoute path={`${match.path}/general/payment-settings`} component={PaymentConfiguration} />
              <CustomRoute path={`${match.path}/general/socials`} component={SocialAccounts} />
              <CustomRoute path={`${match.path}/edit/information`} component={EditInformation} />
              <CustomRoute path={`${match.path}/theme/kiosk`} component={KioskThemePage} />
              <CustomRoute path={`${match.path}/themes/mobile-settings`} component={MobileSettingsPage} />
              <CustomRoute path={`${match.path}/integrations`} component={Integrations} />
              <CustomRoute path={`${match.path}/integration-edit`} component={IntegrationEdit} />
              <CustomRoute path={`${match.path}/general/delivery-configuration`} component={DeliveryConfiguration} />
              <CustomRoute path={`${match.path}/general/marketing&branding`} exact component={MarketingAndBranding} />
              <CustomRoute
                path={`${match.path}/general/marketing&branding/addCredits`}
                exact
                component={AddCreditsPage}
              />
              <CustomRoute path={`${match.path}/general/add-ons`} exact component={AddOns} />
              <CustomRoute path={`${match.path}/general/add-ons/best-sellers`} exact component={BestSellers} />
              <CustomRoute path={`${match.path}/general/add-ons/new-arrivals`} exact component={NewArrivals} />
              <CustomRoute path={`${match.path}/general/add-ons/banner-image`} exact component={BannerImage} />
              <CustomRoute path={`${match.path}/general/add-ons/about-us`} exact component={AboutUs} />
              <CustomRoute path={`${match.path}/general/add-ons/add-grid`} exact component={AddGrid} />
              <CustomRoute
                path={`${match.path}/general/marketing&branding/push-notification`}
                component={PushNotification}
              />
              <CustomRoute
                path={`${match.path}/general/marketing&branding/create-notification`}
                component={CreateNotification}
              />
              <CustomRoute path={`${match.path}/general/marketing&branding/coupons`} component={Coupons} />
              <CustomRoute path={`${match.path}/general/marketing&branding/create-coupons`} component={CreateCoupons} />
              <CustomRoute
                path={`${match.path}/general/marketing&branding/email-marketing`}
                component={EmailMarketing}
              />
              <Route exact path={`${match.path}/txt-editor`} component={RichTextEditor} />

              <CustomRoute path={`${match.path}/general/marketing&branding/branding`} component={Branding} />
              <CustomRoute exact path={`${match.path}/more-options`} component={MorePage} />
              <CustomRoute exact path={`${match.path}/my-account`} component={MyAccount} />
              <CustomRoute exact path={`${match.path}/my-profile`} component={MyProfile} />
              <Route exact path={`${match.path}/design`} component={DesignPage} />
              <Route exact path={`${match.path}/design/templates`} component={TemplatesPage} />
            </>
          )
        ) : (
          <Redirect
            exact
            path={`${match.path}`}
            to={{
              pathname: '/app/onboard-store/create',
              state: {},
            }}
          />
        )
      ) : (
        <Redirect
          exact
          path={`${match.path}`}
          to={{
            pathname: '/app/onboard-store/create',
            state: {},
          }}
        />
      )
    ) : null

  return showFeatures && (!user || !user.primary_store_id || user.onboard_status !== 'COMPLETED') ? (
    <>
      <MediaQuery maxDeviceWidth={426}>
        <FeaturesCarousel />
      </MediaQuery>
      <MediaQuery minDeviceWidth={426}>
        <div className="primary-layout">
          <main className="min-h-screen md:flex">
            {location.pathname.split('/')[2] !== 'checkout' && <PrimarySideBar />}
            <div style={{ overflow: 'auto', maxHeight: '100vh', background: '#f2f2f2' }} className="flex-1">
              <Switch>
                {toRender}
                <Route path={`${match.path}/onboard-store/create`} component={OnBoardStore} />
                <Route path={`${match.path}/plan-expired`} component={PlanExpired} />
                <Route path={`${match.path}/general/payment-plan`} component={PaymentPlan} />
                <Redirect to={`${match.url}`} />
              </Switch>
            </div>
          </main>
        </div>
      </MediaQuery>
    </>
  ) : (
    <div className="primary-layout">
      <main className="min-h-screen md:flex">
        {location.pathname.split('/')[2] !== 'checkout' && <PrimarySideBar />}
        <div style={{ overflow: 'auto', maxHeight: '100vh', background: '#f2f2f2' }} className="flex-1">
          <Switch>
            {toRender}
            <Route path={`${match.path}/pricing-page`} component={PricingPageCards} />
            <Route path={`${match.path}/orders`} component={OrdersPage} />
            <Route path={`${match.path}/billing`} component={BillingHistory} />
            <Route path={`${match.path}/general/payment-plan`} component={PaymentPlan} />
            <Route path={`${match.path}/checkout`} component={CheckoutPage} />
            <Route path={`${match.path}/general/store-policies`} component={StorePolicy} />
            <Route path={`${match.path}/general/store-tax`} component={StoreTax} />
            <Route path={`${match.path}/onboard-store/create`} component={OnBoardStore} />
            <Route path={`${match.path}/plan-expired`} component={PlanExpired} />
            <Route path={`${match.path}/general/payment-plan`} component={PaymentPlan} />
            <Redirect to={`${match.url}`} />
          </Switch>
        </div>
      </main>
    </div>
  )
}

PrimaryLayout.propTypes = {
  match: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectGlobalUser(),
  store: makeSelectStore(),
  showFeatures: makeSelectShowFeaturesCarousel(),
  subscribedTo: makeSelectSubscribedModules(),
  storeId: makeSelectStoreId(),
})
const mapDispatchToProps = dispatch => ({
  getSubscriptionDetails: (storeId, roleId) => dispatch(getSubscribedModules(storeId, roleId)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrimaryLayout)
