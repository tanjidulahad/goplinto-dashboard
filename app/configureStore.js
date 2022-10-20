/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist-immutable'
import { REHYDRATE } from 'redux-persist/lib/constants'
import createActionBuffer from 'redux-action-buffer'
// import { persistStore, persistReducer, autoRehydrate } from 'redux-persist'
import Immutable, { fromJS } from 'immutable'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import createReducer from './reducers'

export default function configureStore(initialState = Immutable.Map(), history) {
  let composeEnhancers = compose
  const reduxSagaMonitorOptions = {}

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    composeEnhancers =
      process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose
    // NOTE: Uncomment the code below to restore support for Redux Saga
    // Dev Tools once it supports redux-saga version 1.x.x
    // if (window.__SAGA_MONITOR_EXTENSION__)
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)]

  const enhancers = [
    applyMiddleware(...middlewares),
    autoRehydrate({ log: false }),
    applyMiddleware(
      createActionBuffer(REHYDRATE), // make sure to apply this after redux-thunk et al.
    ),
  ]

  return new Promise((resolve, reject) => {
    try {
      const store = createStore(createReducer, fromJS(initialState), composeEnhancers(...enhancers))
      // Extensions
      store.runSaga = sagaMiddleware.run
      store.injectedReducers = {} // Reducer registry
      store.injectedSagas = {} // Saga registry
      // Make reducers hot reloadable, see http://mxs.is/googmo
      /* istanbul ignore next */
      if (module.hot) {
        module.hot.accept('./reducers', () => {
          store.replaceReducer(createReducer(store.injectedReducers))
        })
      }

      persistStore(
        store,
        {
          blacklist: ['language', 'router'],
        },
        () => resolve(store),
      )
    } catch (e) {
      reject(e)
    }
  })
}
