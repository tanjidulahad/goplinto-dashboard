/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'

import history from 'utils/history'
import globalReducer from 'containers/App/reducer'
import languageProviderReducer from 'containers/LanguageProvider/reducer'
import authProviderReducer from 'containers/Auth/reducer'
import inventoryReducer from 'containers/InventoryPage/reducers'
import { LOGOUT } from 'containers/Auth/constants'
import manageInventoryReducer from 'containers/ManageInventory/reducer'

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(state, action, injectedReducers = {}) {
  switch (action.type) {
    case LOGOUT:
      state = undefined
      break
    default:
  }
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    authReducer: authProviderReducer,
    router: connectRouter(history),
    inventory: inventoryReducer,
    ManageInventoryState: manageInventoryReducer,
    ...injectedReducers,
  })

  const mergeWithRouterState = connectRouter(history)
  return mergeWithRouterState(rootReducer).apply(null, [state, action])
}
