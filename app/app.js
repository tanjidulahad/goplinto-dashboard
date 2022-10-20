/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router/immutable'
import FontFaceObserver from 'fontfaceobserver'
import history from 'utils/history'
import 'sanitize.css/sanitize.css'
import './assets/tailwind.css'
import 'antd/dist/antd.min.css'

// Custom Split CSS
import './assets/GlobalStyles.css'
import './assets/FormOnly.css'
import './assets/LoginPage.css'
import './assets/PushNotificationPage.css'
import './assets/SidebarSection.css'
import './assets/MobOnly.css'
import './assets/WebsiteThemeSection.css'
import './assets/ProductSection.css'
import './assets/OrdersPage.css'
import './assets/DashboardPage.css'
import './assets/PlanExpired.css'
import './assets/VariantModal.css'
import './assets/ManageStore.css'
import './assets/ViewReport.css'

// Import root app
import App from 'containers/App'

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
import 'file-loader?name=.htaccess!./.htaccess' // eslint-disable-line import/extensions

import configureStore from './configureStore'

// Import i18n messages
import { translationMessages } from './i18n'

import 'file-loader?name=firebase-messaging-sw.js!./firebase-messaging-sw.js'

// Observe loading of Montserrat (to remove Montserrat, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Montserrat', {})

// When Montserrat is loaded, add a font-family using Montserrat to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded')
})
const MOUNT_NODE = document.getElementById('app')

const render = async messages => {
  // Create redux store with history
  const initialState = Immutable.Map()
  const store = await configureStore(initialState, history)
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  )
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'))
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/de.js')])) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err
    })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then(function(registration) {
      // eslint-disable-next-line no-console
      return registration.scope
    })
    .catch(function(err) {
      return err
    })
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}
