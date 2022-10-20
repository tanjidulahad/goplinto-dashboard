/**
 *
 * This component shall contain all unauthorized routes like
 * Login * Register * 404 pages * Forgot Password * Email verification
 */

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import Auth from 'containers/Auth/Loadable'
// import NotFoundPage from 'containers/NotFoundPage/Loadable'

const UnauthorizedLayout = () => (
  <div className="unauthorized-layout">
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
      {/* <Route path="" component={NotFoundPage} /> */}
    </Switch>
  </div>
)

export default UnauthorizedLayout
