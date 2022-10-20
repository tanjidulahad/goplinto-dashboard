import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { StyledTableAlt } from 'components/StyledTableAlt'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import { useMediaQuery } from 'react-responsive'
import { Desktop, numberInputValidation } from 'utils/validation'
import TopNav from 'components/TopNav'
import saga from './saga'
import reducer from './reducer'
import { getTaxes, setEdit, setNewTax, setTaxDesc, setTaxName, setTaxPercentage, updateTax } from './actions'
import { makeSelectStoreId, makeSelectStoreTax } from './selectors'
import backImg from '../../images/icons/back.svg'
import NewFooter from 'components/Footer/newFooter'
const StoreTax = ({
  storeTax,
  storeId,
  getStoreTax,
  setEdit,
  setTaxName,
  setTaxPercentage,
  setTaxDesc,
  setNewTax,
  updateTax,
}) => {
  useInjectReducer({ key: 'storeTax', reducer })
  useInjectSaga({ key: 'storeTax', saga })
  const { taxes, edit, currentTax } = storeTax
  useEffect(() => {
    getStoreTax({ storeId })
    setEdit(false)
  }, [])

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 992 })
  const [errors, showErrors] = useState({
    taxName: false,
    taxRate: false,
    taxDesc: false,
  })
  return (
    <div>
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between px-4 pt-4">
          <p className="flex text-xl font-semibold text-muted-med">
            <NavLink className="mr-2" to="/app/storeSettings">
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1" />
            </NavLink>
            Store Tax
          </p>
          <TopNav />
        </div>
      </div>
      {!taxes.length && !edit ? (
        <div className="h-screen">
          <div className="bg-white mx-4 md:mx-10 mb-16" style={{ borderRadius: '12px' }}>
            <div className=" mx-4 h-64 flex flex-col justify-center mt-10 items-center">
              <p className="text-base text-center font-semibold text-muted-med">
                Your Store Isn’t Collecting Tax at the Moment
              </p>
              <button
                onClick={() => {
                  setEdit(true)
                  setTaxName('')
                  setTaxPercentage('')
                  setTaxDesc('')
                  setNewTax(true)
                }}
                className="text-base cta-btn"
                style={{ borderRadius: '8px', padding: '0.7rem 1.2rem' }}
              >
                Add Tax
              </button>
            </div>
            <hr />
            <div className="flex flex-row bg-white justify-start align-center px-2 py-4 tbl-rounded-bottom">
              <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-med font-semibold" size={18} />
              <span className="text-xs font-normal text-muted-med font-semibold">
                Create as many taxes as you want and apply them directly!
              </span>
            </div>
          </div>
        </div>
      ) : !edit ? (
        <div className="px-4 mar-128 md:px-8">
          <div className="flex  justify-between mt-10">
            <p className="my-4 text-lg md:text-xl item-label-title">Store Tax</p>
            <button
              onClick={() => {
                setEdit(true)
                setTaxName('')
                setTaxPercentage('')
                setTaxDesc('')
                setNewTax(true)
              }}
              className="mb-4 cta-btn-tax px-3"
            >
              <i className="fas fa-plus" />
              &nbsp;Tax
            </button>
          </div>
          <div className="order-last bg-white rounded-lg tbl-rounded-top shadow-lg">
            <Desktop>
              <StyledTableAlt>
                <tbody>
                  <tr className="w-full tbl-rounded-top">
                    <th className="text-base item-label font-semibold">Tax Name</th>
                    <th className="text-base item-label font-semibold">Tax Rate</th>
                    <th className="text-base item-label font-semibold">Description</th>
                    <th className="text-base item-label font-semibold" />
                  </tr>
                  {taxes &&
                    taxes.map(tax => (
                      <tr
                        onClick={() => {
                          setEdit(true)
                          setTaxName(tax.item_tax_code)
                          setTaxPercentage(tax.tax_rate)
                          setTaxDesc(tax.tax_code_desc === 'null' ? '' : tax.tax_code_desc)
                          setNewTax(false)
                        }}
                        className="cursor-pointer settings"
                      >
                        <td className="item-sublabel" style={{ fontSize: '0.92rem' }}>
                          {tax.item_tax_code}
                        </td>
                        <td className="item-sublabel" style={{ fontSize: '0.92rem' }}>
                          {tax.tax_rate}%
                        </td>

                        <td className="flex justify-between item-sublabel" style={{ fontSize: '0.92rem' }}>
                          {(!tax.tax_code_desc || tax.tax_code_desc === 'null') ? '' : tax.tax_code_desc}
                        </td>
                        <td>
                          <IoIosArrowForward
                            className="px-1 py-1 my-auto mr-5 bg-white rounded-full text-secondary"
                            size={25}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </StyledTableAlt>
              <hr />
              <div className="flex flex-row bg-white justify-start align-center border px-2 py-4 tbl-rounded-bottom">
                <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-med font-semibold" size={18} />
                <span className="text-xs text-muted-med font-semibold">
                  Create as many taxes as you want and apply them directly!
                </span>
              </div>
            </Desktop>
            <Mobile>
              <div className=" flex flex-wrap ">
                {taxes &&
                  taxes.map(tax => (
                    <div className="border-b-2 tbl-rounded-top w-full">
                      <table className="w-full tbl-rounded-top">
                        <tr
                          onClick={() => {
                            setEdit(true)
                            setTaxName(tax.item_tax_code)
                            setTaxPercentage(tax.tax_rate)
                            setTaxDesc(tax.tax_code_desc === 'null' ? '' : tax.tax_code_desc)
                            setNewTax(false)
                          }}
                          className=""
                        >
                          <td
                            style={{
                              paddingLeft: '1rem',
                              background: '#e8e9ee',
                              width: '5rem',
                            }}
                          />
                          <td className="px-4 text-xs font-bold text-right text-secondary">Edit</td>
                        </tr>
                        <tr
                          onClick={() => {
                            setEdit(true)
                            setTaxName(tax.item_tax_code)
                            setTaxPercentage(tax.tax_rate)
                            setTaxDesc(tax.tax_code_desc === 'null' ? '' : tax.tax_code_desc)
                            setNewTax(false)
                          }}
                          className=""
                        >
                          <td
                            className="w-1/3 font-semibold item-label text-right"
                            style={{
                              paddingBottom: '1rem',
                              paddingTop: '1rem',
                              paddingLeft: '0.7rem',
                              paddingRight: '0.4rem',
                              background: '#e8e9ee',
                              fontSize: '0.92em',
                            }}
                          >
                            Tax Name
                          </td>
                          <td className="w-2/3 px-2 font-medium item-sublabel">{tax.item_tax_code}</td>
                        </tr>

                        <tr
                          onClick={() => {
                            setEdit(true)
                            setTaxName(tax.item_tax_code)
                            setTaxPercentage(tax.tax_rate)
                            setTaxDesc(tax.tax_code_desc === 'null' ? '' : tax.tax_code_desc)
                            setNewTax(false)
                          }}
                          className="w-full "
                        >
                          <td
                            className="w-1/3 font-semibold item-label text-right"
                            style={{
                              paddingBottom: '1rem',
                              paddingTop: '1rem',
                              paddingLeft: '0.7rem',
                              paddingRight: '0.4rem',
                              background: '#e8e9ee',
                              fontSize: '0.92em',
                            }}
                          >
                            Tax Rate
                          </td>
                          <td className="w-2/3 px-2 font-semibold item-sublabel">{tax.tax_rate}%</td>
                        </tr>

                        <tr
                          onClick={() => {
                            setEdit(true)
                            setTaxName(tax.item_tax_code)
                            setTaxPercentage(tax.tax_rate)
                            setTaxDesc(tax.tax_code_desc === 'null' ? '' : tax.tax_code_desc)
                            setNewTax(false)
                          }}
                          className="w-full "
                        >
                          <td
                            className="w-1/3 font-semibold item-label text-right"
                            style={{
                              paddingBottom: '1rem',
                              paddingTop: '1rem',
                              paddingLeft: '0.5rem',
                              paddingRight: '0.4rem',
                              background: '#e8e9ee',
                              fontSize: '0.92em',
                            }}
                          >
                            Description
                          </td>
                          <th className="px-2 text-sm w-2/3 font-semibold item-sublabel">
                            {' '}
                            {!tax.tax_code_desc || tax.tax_code_desc === 'null' ? '' : tax.tax_code_desc}
                          </th>
                        </tr>
                      </table>
                    </div>
                  ))}
              </div>
              <div className="flex px-6 py-4 border-t ">
                <AiOutlineInfoCircle className="mr-4" size={25} />
                <span className="mt-1 text-xs font-semibold text-muted-med">
                  Create as many taxes as you want and apply them directly!{' '}
                </span>
              </div>
            </Mobile>
          </div>
        </div>
      ) : (
        <div className="h-full px-6  mar-128">
          <div className="mt-4 md:mt-8">
            <p className="my-4 text-lg md:text-xl item-label-title">Tax Details</p>
          </div>
          <div className="bg-white rounded-lg mt-4 md:mt-8">
            <div className="inline-block w-full px-6 py-6 mb-4 st-form">
              <div className="flex flex-wrap w-full mb-6">
                <div className="w-full mb-2 md:w-1/2 px-2">
                  <p className="mb-2 text-base item-label">Tax Name *</p>
                  <input
                    type="text"
                    className="w-full px-2 py-2 mb-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                    value={currentTax.taxName}
                    placeholder="Enter a Name for Tax"
                    onChange={e => setTaxName(e.target.value)}
                    disabled={!currentTax.new}
                  />
                  {errors.taxName && (
                    <span className="my-2 text-sm font-semibold text-secondary">Tax Name is mandatory</span>
                  )}
                </div>
                <div className="w-full mb-2 md:w-1/2 px-2">
                  <p className="mb-2 text-base item-label">Tax Rate *</p>
                  <input
                    type="number"
                    className="w-full px-2 py-2 border mb-2 border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="0"
                    value={currentTax.taxPercentage}
                    onKeyDown={e=>numberInputValidation(e)}
                    onChange={e => setTaxPercentage(e.target.value)}
                  />
                  {errors.taxRate && (
                    <span className="my-2 text-sm font-semibold text-secondary">Tax Rate is mandatory</span>
                  )}
                </div>
              </div>
              <div className="px-2">
                <p className="mb-2 text-base item-label">
                  Description <small className="text-xs font-semibold text-muted-med">( Upto 200 chars )</small>
                </p>
                <textarea
                  value={currentTax.taxDesc}
                  onChange={e => setTaxDesc(e.target.value)}
                  rows="4"
                  maxLength="200"
                  placeholder="Give a description for your Tax"
                  className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                />
              </div>
            </div>
            <div className="flex flex-row bg-white justify-start align-center border-t px-2 py-4 tbl-rounded-bottom">
              <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-med" size={18} />
              <span className="text-xs font-semibold text-muted-med">
                Create as many taxes as you want and apply them directly!
              </span>
            </div>
          </div>
          <div className="bg-mob mt-10 py-2">
            <button
              onClick={() => {
                showErrors({
                  taxName: false,
                  taxRate: false,
                })
                if (!currentTax.taxName && !currentTax.taxPercentage) return showErrors(prev => ({ ...prev, taxName: true , taxRate: true }))
                if (!currentTax.taxName) return showErrors(prev => ({ ...prev, taxName: true }))
                if (!currentTax.taxPercentage) return showErrors(prev => ({ ...prev, taxRate: true }))

                updateTax({
                  storeId,
                  taxCode: currentTax.taxName,
                  taxRate:
                    currentTax.taxPercentage[currentTax.taxPercentage.length - 1] === '%'
                      ? currentTax.taxPercentage.substring(0, currentTax.taxPercentage.length - 1)
                      : currentTax.taxPercentage,
                  taxDesc: currentTax.taxDesc,
                  edit: currentTax.new,
                })
                setEdit(false)
              }}
              className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn"
            >
              Add Tax
            </button>
            <button
              onClick={() => setEdit(false)}
              className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn"
              style={{marginRight:'8px'}}
            >
              back
            </button>
          </div>
        </div>
      )}
      {!edit && <NewFooter/>   }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  storeTax: makeSelectStoreTax(),
  storeId: makeSelectStoreId(),
})
const mapDispatchToProps = dispatch => ({
  getStoreTax: ({ storeId }) => dispatch(getTaxes({ storeId })),
  setEdit: boolean => dispatch(setEdit({ boolean })),
  setTaxName: text => dispatch(setTaxName({ text })),
  setTaxPercentage: text => dispatch(setTaxPercentage({ text })),
  setTaxDesc: text => dispatch(setTaxDesc({ text })),
  setNewTax: boolean => dispatch(setNewTax({ boolean })),
  updateTax: ({ storeId, taxCode, taxRate, taxDesc, edit }) =>
    dispatch(updateTax({ storeId, taxCode, taxRate, taxDesc, edit })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreTax)
