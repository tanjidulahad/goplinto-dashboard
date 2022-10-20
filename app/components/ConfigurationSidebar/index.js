import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, NavLink } from 'react-router-dom'

import { Collapse } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { ConfigurationSidebar, StyledCollapseWrapper } from './styled'
import ColorSchemeSection from './ColorSchemeSection'
import LogoImgUpload from './LogoImgUpload'
import CoverPicUpload from './CoverPicUpload'
import RadioOption from './RadioOption'

const { Panel } = Collapse
// eslint-disable-next-line react/prop-types
const CpanelHeader = ({ title }) => (
  <label
    className="block p-1 text-base font-semibold leading-normal tracking-wider text-left uppercase cursor-pointer"
    htmlFor="tab-single-one"
  >
    {title}
  </label>
)

function ConfigurationSideBar(props) {
  // Render an anchor tag
  const {
    restaurantDetails,
    primaryColor,
    preview,
    onChangeResName,
    onSubmitColor,
    onUploadLogoImg,
    onUploadCoverPic,
    onSave,
    layout,
    onChangeLayout,
    storeData,
    apiStatus,
    customizePage,
    onUploadBannerToDb,
  } = props
  const { restaurantName } = restaurantDetails
  const history = useHistory()
  const handleNextClick = () => {
    onSave(customizePage, storeData.owner_id, storeData.store_id)
  }

  const onChangeLayoutValue = e => onChangeLayout(e.target.value)

  return (
    <ConfigurationSidebar preview={preview}>
      <div className="flex justify-between px-6 pb-6 border-b md:relative">
        <div>
          <NavLink to="/app" className="text-xl font-medium tracking-wide">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="mx-6">Back</span>
          </NavLink>
        </div>
        <div>
          <span className="text-lg font-semibold tracking-wider uppercase">Step 2 of 3</span>
        </div>
      </div>
      <StyledCollapseWrapper className="flex-1 w-full mx-auto mt-5 md:relative">
        <Collapse
          accordion
          defaultActiveKey={['3']}
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} transform="grow2" />
          )}
        >
          <Panel className="w-full overflow-hidden tab " header={<CpanelHeader title="Store Logo" />} key="1">
            <div className="px-3 py-1 overflow-hidden leading-normal text-left">
              <div className="mb-4">
                <label
                  className="block mb-2 text-xs font-medium tracking-wider text-gray-700 uppercase"
                  htmlFor="storeName"
                >
                  Store Name
                </label>
                <input
                  className="w-full h-12 px-3 py-2 text-sm font-medium leading-tight tracking-wide text-gray-700 border rounded appearance-none shadow-sm focus:outline-none focus:shadow-outline"
                  id="store-name"
                  type="text"
                  value={restaurantName}
                  onChange={onChangeResName}
                  placeholder="Your Store Name"
                  disabled
                />
              </div>
              <LogoImgUpload onUpload={onUploadLogoImg} store={storeData} />
            </div>
          </Panel>
          <Panel className="w-full overflow-hidden tab" header={<CpanelHeader title="Banner Image" />} key="2">
            <div className="px-3 py-1 overflow-hidden leading-normal text-left">
              <CoverPicUpload
                onUpload={onUploadCoverPic}
                store={storeData}
                pageState={customizePage}
                onUploadBannerToDb={onUploadBannerToDb}
              />
            </div>
          </Panel>
          <Panel className="w-full overflow-hidden tab " header={<CpanelHeader title="Items Layout" />} key="3">
            <div className="px-3 py-1 overflow-hidden leading-normal text-left">
              <div className="mb-5">
                <label
                  className="block mb-2 text-xs font-medium tracking-wider text-gray-700 uppercase"
                  htmlFor="restaurantName"
                >
                  Choose a layout
                </label>
              </div>
              <div className="mb-4" onChange={onChangeLayoutValue}>
                <RadioOption
                  isSelected={layout === 'grid'}
                  labelFor="config-side-bar-layout-grid"
                  value="grid"
                  optionIcon="fa-grip-horizontal"
                  optionName="Grid"
                  optionText="Grid View is a grid of images. It shows a product image with product information on the bottom"
                />
                <RadioOption
                  isSelected={layout === 'list'}
                  labelFor="config-side-bar-layout-list"
                  value="list"
                  optionIcon="fa-list"
                  optionName="List"
                  optionText="List view contains a small picture on the left side and product information on the right side"
                />
              </div>
            </div>
          </Panel>
          <Panel className="w-full overflow-hidden tab " header={<CpanelHeader title="Color Scheme" />} key="4">
            <ColorSchemeSection onSubmitColor={onSubmitColor} primaryColor={primaryColor} />
          </Panel>
        </Collapse>
      </StyledCollapseWrapper>
      {!apiStatus && <p className="text-red-500">*Something went wrong! Please try again later!</p>}
      <button
        type="button"
        onClick={handleNextClick}
        className="flex justify-between w-full px-8 py-4 text-xl font-medium tracking-wide text-white uppercase align-middle border-t bg-secondary-500 border-grey pin-b"
      >
        <p>Submit</p>
        <FontAwesomeIcon className="p-0 mt-2" icon={faChevronRight} />
      </button>
    </ConfigurationSidebar>
  )
}

ConfigurationSideBar.propTypes = {
  restaurantDetails: PropTypes.object,
  preview: PropTypes.bool,
  primaryColor: PropTypes.string,
  layout: PropTypes.string,
  onChangeResName: PropTypes.func,
  onSubmitColor: PropTypes.func,
  onUploadLogoImg: PropTypes.func,
  onChangeLayout: PropTypes.func,
  onUploadCoverPic: PropTypes.func,
  onSave: PropTypes.func,
}

export default ConfigurationSideBar
