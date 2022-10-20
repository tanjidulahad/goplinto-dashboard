import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Route, Redirect, useHistory } from 'react-router-dom'

import { makeSelectLoginState } from 'containers/Auth/selectors'
const AuthorizedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  const history = useHistory()
  useEffect(() => {
    if (!isLoggedIn) history.push('/auth')
  })

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectLoginState(),
})

export default connect(mapStateToProps)(AuthorizedRoute)
