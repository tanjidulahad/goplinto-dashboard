import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { useLocation } from 'react-router-dom'

import { onPageLoad } from 'containers/App/actions'
import StoreDisplaySettingsPage from 'containers/StoreDisplaySettingsPage'

const getPageName = name => name.split('-').join(' ')

const EditInformation = ({ pageStatus, apiStatus, onPageLoad }) => {
  const location = useLocation()
  const { firstTime, pageParam } = location.state

  const pageName = getPageName(pageParam)
  useEffect(() => {
    onPageLoad(true)
  }, [])

  return (
    <article>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Home page" />
      </Helmet>
      {pageName === 'display info' && (
        <StoreDisplaySettingsPage firstTime={firstTime} apiStatus={apiStatus} pageStatus={pageStatus} />
      )}
    </article>
  )
}

const mapStateToProps = state => ({
  pageStatus: state.get('global').pageStatus,
  apiStatus: state.get('global').apiStatus,
})

const mapDispatchToProps = dispatch => ({
  onPageLoad: value => dispatch(onPageLoad(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditInformation)
