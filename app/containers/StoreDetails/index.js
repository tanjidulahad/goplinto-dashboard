import React, { useState, useEffect } from 'react'

import { NavLink } from 'react-router-dom'

import { StyledTable } from 'components/StyledTable'
import { EditButton } from 'components/EditButton'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { connect } from 'react-redux'

import { useInjectReducer } from 'utils/injectReducer'

import { useInjectSaga } from 'utils/injectSaga'
import { useMediaQuery } from 'react-responsive'
import { createStructuredSelector } from 'reselect'
import TopNav from 'components/TopNav'
import Select from 'react-select'
import RingLoader from 'react-spinners/RingLoader'
import { customSelect, DropdownIndicator } from 'utils/dropdownConfig'
import {
  makeSelectMerchantId,
  makeSelectAvailableStoreTypes,
  makeSelectStoreDetails,
  makeSelectStoreId,
} from './selectors'
import { setStoreDetails, getStoreDetails, setStoreDesc, setStoreName, setStoreType } from './actions'
import  PaymentPromotionImages from "../../components/PaymentPromotionImages"
import saga from './saga'
import reducer from './reducer'

import backImg from '../../images/icons/back.svg'
import { validateContainOnlyWhitespace } from 'utils/validation'

const StoreDetails = ({
  storeDetails,
  storeTypes,
  merchantId,
  storeId,
  setStoreName,
  setStoreType,
  setStoreDesc,
  getStoreDetails,
  setStoreDetails,
}) => {
  useInjectReducer({ key: 'storeDetails', reducer })
  useInjectSaga({ key: 'storeDetails', saga })
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  const [edit, setEdit] = useState(false)

  const { storeName, storeType, storeDescription, loading } = storeDetails
  useEffect(() => {
    getStoreDetails(storeId)
  }, [])

  const [errors, showErrors] = useState({
    storeName: false,
    storeType: false,
    storeDescription: false,
  })
  const saveStore = () => {
    showErrors({
      storeName: false,
      storeType: false,
      storeDescription: false,
    })
    if (!storeName || validateContainOnlyWhitespace(storeName)) showErrors(prev => ({ ...prev, storeName: true }))
    if (!storeType) showErrors(prev => ({ ...prev, storeType: true }))
    if (!storeDescription||validateContainOnlyWhitespace(storeDescription)) showErrors(prev => ({ ...prev, storeDescription: true }))

    if (!storeName || !storeType || !storeDescription || validateContainOnlyWhitespace(storeName) || validateContainOnlyWhitespace(storeDescription)) return;
    setStoreDetails({
      storeId,
      merchantId,
      storeName,
      storeType,
      storeDescription,
    })
    setEdit(prev => !prev)
  }
  return (
    <div>
      {loading && (
        <div className="fixed bg-black opacity-25 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <RingLoader color="#F64C5D" size={150} />
        </div>
      )}
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between px-4 pt-4">
          <p className="flex text-xl font-semibold text-muted-med">
            <NavLink className="mr-2" to="/app/storeSettings">
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1" />
            </NavLink>
            Store Details
          </p>
          <TopNav />
        </div>
      </div>
      {!edit ? (
        <div className="px-4 py-4 md:px-10 md:py-8">
          <div className="flex justify-between">
            <p className="my-4 text-lg md:text-xl item-label-title">Store Details</p>
            <EditButton style={{ margin: '0.8rem 0px' }} onClick={() => setEdit(prev => !prev)} className="edit-btn">
              Edit
            </EditButton>
          </div>
          <Desktop>
            <StyledTable className="w-full overflow-hidden text-black bg-white shadow-lg tbl-rounded-top">
              <tbody>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">Store Name</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{storeName}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">Store Category</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{storeType.label}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">Description</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{storeDescription}</td>
                </tr>
              </tbody>
            </StyledTable>
            <div className="flex flex-row bg-white justify-start align-center border px-2 py-4 tbl-rounded-bottom">
              <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={18} />
              <span className="text-xs font-semibold text-muted-med">
                Your store name appears on your dashboard and website.
              </span>
            </div>
          </Desktop>
          <Mobile>
            <div className="h-screen">
              <div className="bg-white tbl-rounded-top shadow-lg px-4 py-4">
                <div className="flex flex-col py-2">
                  <label className="font-semibold mb-1 text-base item-label">Store Name</label>
                  <span className="text-sm item-sublabel font-normal">{storeName}</span>
                </div>

                <div className="flex flex-col py-2">
                  <label className="font-semibold mb-1 text-base item-label">Store Type</label>
                  <span className="text-sm item-sublabel font-normal">{storeType.label}</span>
                </div>

                <div className="flex flex-col py-2">
                  <label className="font-semibold mb-1 text-base item-label">Store Description</label>
                  <span className="text-sm item-sublabel font-normal">{storeDescription}</span>
                </div>
              </div>
              <div className="flex flex-row bg-white tbl-rounded-bottom justify-start align-center border px-2 py-2">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={12} />
                <span className="text-xs font-semibold text-muted-med">
                  Your store name appears on your dashboard and website.
                </span>
              </div>
            </div>
          </Mobile>
        </div>
      ) : (
        <div className="px-2 md:px-10 py-4 mx-2" style={{ marginBottom: '2%' }}>
          <div className="w-full mx-auto mt-6">
            <p className="my-4 text-lg md:text-xl item-label-title">Store Details</p>
          </div>
          <div className="w-full mx-auto bg-white tbl-rounded">
            <div className="inline-block w-full px-6 py-6 mb-4 st-form">
              <div className="mb-6 flex flex-wrap  w-full ">
                <div className="w-full md:w-1/2 md:px-2 mb-2">
                  <p className="mb-2 item-label">Store Name *</p>
                  <input
                    type="text"
                    className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                    value={storeName}
                    onChange={e => setStoreName(e.target.value)}
                    placeholder="Your Store's Name"
                  />
                  {errors.storeName && (
                    <span className="my-2 text-sm font-semibold text-secondary">Store Name is mandatory</span>
                  )}
                </div>
                <div className="w-full md:w-1/2">
                  <p className="mb-2 item-label">Store Category *</p>
                  <Select
                    className="w-full border border-gray-400 rounded-lg focus:outline-none"
                    style={{ outline: 'none' }}
                    value={storeType}
                    styles={customSelect}
                    options={storeTypes}
                    onChange={setStoreType}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                  />
                  {errors.storeType && (
                    <span className="my-2 text-sm font-semibold text-secondary">Store Category is mandatory</span>
                  )}
                </div>
              </div>

              <div className="w-full md:px-2 mb-2" style={{ paddingRight: '0.1rem' }}>
                <p className="mb-2 item-label">
                  Description * &nbsp;
                  <small className="text-muted-light">( upto 200 chars )</small>
                </p>

                <textarea
                  value={storeDescription}
                  className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                  placeholder="Enter short Description of your store"
                  onChange={e => setStoreDesc(e.target.value)}
                  rows="4"
                  maxLength="200"
                />
                {errors.storeDescription && (
                  <span className="my-2 text-sm font-semibold text-secondary">Store Description is mandatory</span>
                )}
              </div>
            </div>
            <hr />
            <div className="flex w-full px-4 py-4">
              <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light" size={12} />
              <span className="mt-1 text-xs font-semibold text-muted-med">
                Your store name appears on your dashboard and website.
              </span>
            </div>
          </div>

          <div className="bg-mob mt-10 py-2">
            <button onClick={saveStore} className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
              Save Changes
            </button>
          </div>
        </div>
      )}
    {!edit&&  <PaymentPromotionImages />  } 
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  storeDetails: makeSelectStoreDetails(),
  storeTypes: makeSelectAvailableStoreTypes(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
})

const mapDispatchToProps = dispatch => ({
  setStoreName: text => dispatch(setStoreName({ storeName: text })),
  setStoreType: text => dispatch(setStoreType({ storeType: text })),
  setStoreDesc: text => dispatch(setStoreDesc({ storeDesc: text })),
  getStoreDetails: storeId => dispatch(getStoreDetails({ storeId })),
  setStoreDetails: ({ storeId, merchantId, storeName, storeType, storeDescription }) =>
    dispatch(setStoreDetails({ storeId, merchantId, storeName, storeType, storeDesc: storeDescription })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreDetails)
