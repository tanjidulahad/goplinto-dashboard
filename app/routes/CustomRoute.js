import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import TopNav from 'components/TopNav'

import Loader from 'components/LoadingIndicator'
import { getSubscribedModules } from 'containers/App/actions'
import { makeSelectStoreId, makeSelectSubscribedModules, makeSelectUser } from '../containers/StoreInfoPage/selectors'

const CustomRoute = ({ component: Component, user, subscribedTo, storeId, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      subscribedTo.fetched ? (
        <Component {...props} />
      ) : (
        <>
          <div className="sticky bg-white mobile-topNav">
            <div className="flex justify-end items-center px-4 py-4">
              <TopNav />
            </div>
          </div>
          <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Loader />
            </div>
          </div>
        </>
      )
    }
  />
)

const mapStateToProps = createStructuredSelector({
  storeId: makeSelectStoreId(),
  subscribedTo: makeSelectSubscribedModules(),
  user: makeSelectUser(),
})

export default connect(mapStateToProps)(CustomRoute)
