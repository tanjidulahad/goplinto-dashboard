import React, { memo, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { ThemeProvider } from 'styled-components'

import DynamicPreviewPage from 'components/DynamicPreviewPage'
import ConfigurationSidebar from 'components/ConfigurationSidebar'

import { useHistory } from 'react-router-dom'

import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import {
  changeRestaurantName,
  savePrimaryColor,
  togglePreviewState,
  uploadLogoImg,
  uploadCoverPic,
  saveConfigToS3,
  changeItemLayout,
  saveDisplaySettings,
  saveBannerToDb,
} from './actions'
import {
  makeSelectRestaurantName,
  makeSelectCustomizePage,
  makePreviewState,
  makeSelectStoreState,
  makeSelectApiStatus,
  makePageStatus,
} from './selectors'
import reducer from './reducer'
import saga from './saga'
import { onPageLoad, setPageSubmissionStatus } from 'containers/App/actions'

export function CustomizePage({
  onChangeResName,
  restaurantName,
  pageState,
  onSubmitColor,
  onChangeColorValue,
  onTogglePreviewState,
  onUploadLogoImg,
  onUploadCoverPic,
  onChangeLayout,
  onSaveSettings,
  preview,
  store,
  onUploadBannerToDb,
  apiStatus,
  onPageLoad,
  pageStatus,
  togglePageSubmissionStatus,
}) {
  useInjectReducer({ key: 'customizePage', reducer })
  useInjectSaga({ key: 'customizePage', saga })

  const history = useHistory()

  const theme = {
    primary_color: pageState.theme.primary_color,
    layout: pageState.layout,
  }
  useEffect(() => {
    onPageLoad(true)
    togglePageSubmissionStatus(false)
  }, [])

  useEffect(() => {
    if (pageStatus) {
      history.push('/app/manage-items')
    }
  })

  return (
    <div>
      <Helmet>
        <title>Customize</title>
        <meta name="description" content="Customize Page" />
      </Helmet>
      <div className="flex flex-wrap md:flex-row-reverse">
        {/* <!--Main Content--> */}
        <ThemeProvider theme={theme}>
          <DynamicPreviewPage
            restaurantDetails={{
              restaurantName,
              restLogoUrl: pageState.restLogoUrl,
              coverImgUrl: pageState.coverImgUrl,
            }}
            preview={preview}
            onTogglePreview={onTogglePreviewState}
          />
        </ThemeProvider>
        {/* <!--Sidebar--> */}
        <ConfigurationSidebar
          restaurantDetails={{
            restaurantName,
            restLogoUrl: pageState.restLogoUrl,
            coverImgUrl: pageState.coverImgUrl,
          }}
          onChangeResName={onChangeResName}
          onChangeColorValue={onChangeColorValue}
          onSubmitColor={onSubmitColor}
          onUploadLogoImg={onUploadLogoImg}
          onUploadCoverPic={onUploadCoverPic}
          preview={preview}
          onSave={onSaveSettings}
          layout={pageState.layout}
          onChangeLayout={onChangeLayout}
          storeData={store}
          customizePage={pageState}
          onUploadBannerToDb={onUploadBannerToDb}
          apiStatus={apiStatus}
        />
      </div>
    </div>
  )
}

CustomizePage.propTypes = {
  pageState: PropTypes.object,
  restaurantName: PropTypes.string,
  onChangeResName: PropTypes.func,
  onSubmitColor: PropTypes.func,
  onChangeColorValue: PropTypes.func,
  onTogglePreviewState: PropTypes.func,
  onUploadLogoImg: PropTypes.func,
  onUploadCoverPic: PropTypes.func,
  onChangeLayout: PropTypes.func,
  onSave: PropTypes.func,
  preview: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
  pageState: makeSelectCustomizePage(),
  restaurantName: makeSelectRestaurantName(),
  preview: makePreviewState(), // Use selectors and read this from state
  store: makeSelectStoreState(),
  apiStatus: makeSelectApiStatus(),
  pageStatus: makePageStatus(),
})

function mapDispatchToProps(dispatch) {
  return {
    onChangeResName: evt => dispatch(changeRestaurantName(evt.target.value)),
    onSubmitColor: colorScheme => {
      dispatch(savePrimaryColor(colorScheme))
    },
    onTogglePreviewState: () => dispatch(togglePreviewState()),
    onSave: () => dispatch(saveConfigToS3()),
    onUploadLogoImg: (file, storeId) => dispatch(uploadLogoImg(file, storeId)),
    onUploadCoverPic: (file, storeId) => dispatch(uploadCoverPic(file, storeId)),
    onChangeLayout: value => dispatch(changeItemLayout({ value })),
    onSaveSettings: (customizeData, merchantId, storeId) =>
      dispatch(saveDisplaySettings(customizeData, merchantId, storeId)),
    onUploadBannerToDb: (url, merchantId, storeId) => dispatch(saveBannerToDb(url, merchantId, storeId)),
    onPageLoad: value => dispatch(onPageLoad(value)),
    togglePageSubmissionStatus: value => dispatch(setPageSubmissionStatus(value)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(CustomizePage)
