/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthorizedRoute from 'routes/AuthorizedRoute'

import PrimaryLayout from 'layouts/PrimaryLayout'
import UnauthorisedLayout from 'layouts/UnauthorisedLayout'
import CustomizePage from 'containers/CustomizePage/Loadable'

import { useInjectSaga } from 'utils/injectSaga'
import saga from './saga'
import * as Firebase from '../../firebaseInit'
import GlobalStyle from '../../global-styles'
import HelpCenter from 'containers/HelpCenter'
import BasicHelp from 'containers/BasicHelp'

import ContactUsHelp from 'containers/ContactUsHelp'
import ProductsHelp from 'containers/HelpCenter/ProductsHelp'
import OrderHelp from 'containers/HelpCenter/OrderHelp'
import CustomizeWebsiteHelp from "containers/HelpCenter/CustomizeWebsiteHelp"
import CreateAccountHelp from 'containers/HelpCenter/CreateAccountHelp'
import PaymentConfigurationHelp from 'containers/HelpCenter/PaymentConfigurationHelp'
import ReportsAnalytics from 'containers/HelpCenter/ReportsAnalyticsHelp'
import BasicSettingsHelp from 'containers/HelpCenter/BasicSettingsHelp'
import DeliveryConfigurationHelp from 'containers/HelpCenter/DeliveryConfigurationHelp'
import MarketingBrandingHelp from 'containers/HelpCenter/MarketingBrandingHelp'
import CreateStoreHelp from 'containers/HelpCenter/CreateStoreHelp'
const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

export default function App() {
  useInjectSaga({ key: 'globalSaga', saga })

  React.useEffect(() => {
    if (window.isWebView) {
      localStorage.setItem('fcmToken', window.fcmToken)
    } else {
      // CHECK IS FIREBASE SUPPORTED BROWSER

      if (Firebase.messaging) {
        // get web firebase token
        Firebase.requestFirebaseNotificationPermission()
          .then(firebaseToken => {
            localStorage.setItem('fcmToken', firebaseToken)
          })
          .catch(err => {
            console.log(err)
          })

        // show push notification
        Firebase.messaging.onMessage(payload => {
          const notificationTitle = payload.notification.title
          const notificationOptions = {
            body: payload.notification.body,
            icon: payload.notification.image,
          }

          if (!('Notification' in window)) {
            console.log('This browser does not support system notifications.')
          } else if (Notification.permission === 'granted') {
            const notification = new Notification(notificationTitle, notificationOptions)
            notification.onclick = event => {
              event.preventDefault()
              notification.close()
            }
          }
        })
      }
    }
  }, [])

  /* FCM Push-Notifications setup END */

  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - GoPlinto Dashboard" defaultTitle="GoPlinto">
        <meta name="description" content="Create Own Website" />
      </Helmet>
      <Switch>
        <Route path="/auth" component={UnauthorisedLayout} />
        <AuthorizedRoute path="/app" component={PrimaryLayout} forceRefresh />
        {/* TODO: Uncomment when functional */}
        {/* <AuthorizedRoute path="/customize" component={CustomizePage} /> */}
        <Route path="/helpcenter" exact component={HelpCenter} />
        <Route path="/helpcenter/products" exact component={ProductsHelp} />
        <Route path="/helpcenter/manage-order" exact component={OrderHelp} />
        <Route path="/helpcenter/customize-website" exact component={CustomizeWebsiteHelp} />
        <Route path="/helpcenter/create-account" exact component={CreateAccountHelp} />
        <Route path="/helpcenter/create-store" exact component={CreateStoreHelp} />
        <Route path="/helpcenter/payment-configuration" exact component={PaymentConfigurationHelp} />
        <Route path="/helpcenter/delivery-configuration" exact component={DeliveryConfigurationHelp} />
        <Route path="/helpcenter/reports-analytics" exact component={ReportsAnalytics} />
        <Route path="/helpcenter/basic-settings" exact component={BasicSettingsHelp} />
        <Route path="/helpcenter/marketing-branding" exact component={MarketingBrandingHelp} />
        <Route path="/helpcenter/basic" component={BasicHelp} />
        <Route path="/helpcenter/contactus" component={ContactUsHelp} />
        <Redirect to="/auth" />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  )
}
