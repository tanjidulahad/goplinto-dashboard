import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'

import { StyledTable } from 'components/StyledTable'
import { EditButton } from 'components/EditButton'
import TopNav from 'components/TopNav'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import reducer from './reducer'
import { makeSelectBankInfo, makeSelectMerchantId, makeSelectStoreId } from './selectors'
import saga from './saga'
import backImg from '../../images/icons/back.svg'
import {
  getBankDetails,
  setAccountName,
  setAccountNo,
  setBankDetails,
  setBankName,
  setBranch,
  setIfscCode,
} from './actions'
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import { numberInputValidation, validateContainOnlyWhitespace, validateIFSCCode, validateOnlyNumber } from 'utils/validation'

const BankDetails = ({
  bankInfo,
  storeId,
  merchantId,
  setBankName,
  setAccountName,
  setAccountNo,
  setIfscCode,
  setBranch,
  getBankDetails,
  setBankDetails,
}) => {
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }
  useInjectReducer({ key: 'bankInfo', reducer })
  useInjectSaga({ key: 'bankInfo', saga })
  const [edit, setEdit] = useState(false)
  const { bankName, accountName, accountNo, ifscCode, branch } = bankInfo
  useEffect(() => {
    getBankDetails({ storeId, merchantId })
  }, [])
  const [errors, showErrors] = useState({
    bankName: false,
    accountName: false,
    accountNo: false,
    InvalidAccountNo: false,
    ifscCode: false,
    branch: false,
    invalidIfscCode: false,
  })
  const saveBank = () => {
    showErrors({
      bankName: false,
      accountName: false,
      accountNo: false,
      InvalidAccountNo: false,
      ifscCode: false,
      branch: false,
      invalidIfscCode: false,
    })
    if (!bankName || validateContainOnlyWhitespace(bankName)) showErrors(prev => ({ ...prev, bankName: true }))
    if (!accountName || validateContainOnlyWhitespace(accountName)) showErrors(prev => ({ ...prev, accountName: true }))
    if (!accountNo) showErrors(prev => ({ ...prev, accountNo: true }))
    if (accountNo && (accountNo.length < 9 || accountNo.length > 18) || !validateOnlyNumber(accountNo)) showErrors(prev => ({ ...prev, InvalidAccountNo: true }))
    if (!ifscCode) showErrors(prev => ({ ...prev, ifscCode: true }))
    if (!branch || validateContainOnlyWhitespace(branch)) showErrors(prev => ({ ...prev, branch: true }))
    if (ifscCode && !validateIFSCCode(ifscCode)) showErrors(prev => ({ ...prev, invalidIfscCode: true }))
    if (!bankName || !accountName || !accountNo || !ifscCode || (accountNo.length < 9 || accountNo.length > 18)|| !branch || !validateIFSCCode(ifscCode) || validateContainOnlyWhitespace(bankName) || validateContainOnlyWhitespace(accountName) || validateContainOnlyWhitespace(branch)) return;
    setBankDetails({ storeId, merchantId, bankName, accountName, accountNo, ifscCode, branch })
    setEdit(prev => !prev)
  }
  return (
    <div className="">
      <div className="sticky bg-white mobile-topNav">
        <div className="flex justify-between pt-4">
          <p className="flex text-xl font-semibold text-muted-med">
            <NavLink className="mr-2" to="/app/storeSettings">
              <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1" />
            </NavLink>
            Bank Details
          </p>
          <TopNav />
        </div>
      </div>
      {!edit ? (
        <div className="px-4 py-4 md:px-10 md:py-8">
          <div className="flex justify-between">
            <p className="my-4 text-lg md:text-xl item-label-title">Bank Details</p>
            <EditButton style={{ margin: '0.8rem 0px' }} onClick={() => setEdit(prev => !prev)} className="edit-btn">
              Edit
            </EditButton>
          </div>

          <Desktop>
            <StyledTable className="w-full overflow-hidden bg-white tbl-rounded-top shadow-lg">
              <tbody>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">Bank Name</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{bankName}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">Account Name</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{accountName}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">Account Number</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{accountNo}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">IFSC Code</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{ifscCode}</td>
                </tr>
                <tr>
                  <td className="px-8 py-4 border item-label font-semibold">Branch</td>
                  <td className="px-8 py-4 border item-sublabel font-normal">{branch}</td>
                </tr>
              </tbody>
            </StyledTable>
            <div className="flex w-full px-4 py-4 tbl-rounded-bottom bg-white">
              <AiOutlineInfoCircle className="mr-2 ml-4" size={18} />
              <span className="text-xs font-semibold text-muted-light">
                Bank details are important to get your settlements.
              </span>
            </div>
          </Desktop>

          <Mobile>
            <div className="h-screen">
              <div className="bg-white tbl-rounded-top" style={{ padding: '1.2rem 1.4rem' }}>
                <div className="flex flex-col py-2">
                  <label className="font-medium mb-1 text-sm item-label">Bank Name</label>
                  <span className="text-sm font-semibold item-sublabel ">{bankName}</span>
                </div>

                <div className="flex flex-col py-2">
                  <label className="font-medium mb-1 text-sm item-label">Account Type</label>
                  <span className="text-sm font-semibold item-sublabel ">{accountName || 'NIL'}</span>
                </div>

                <div className="flex flex-col py-2">
                  <label className="font-medium mb-1 text-sm item-label">Account Number</label>
                  <span className="text-sm font-semibold item-sublabel ">{accountNo || 'NIL'}</span>
                </div>

                <div className="flex flex-col py-2">
                  <label className="font-medium mb-1 text-sm item-label">IFSC Code</label>
                  <span className="text-sm font-semibold item-sublabel ">{ifscCode || 'NIL'}</span>
                </div>

                <div className="flex flex-col py-2">
                  <label className="font-medium mb-1 text-sm item-label">Branch</label>
                  <span className="text-sm font-semibold item-sublabel ">{branch || 'NIL'}</span>
                </div>
              </div>
              <div className="flex w-full px-2 py-4 border-t tbl-rounded-bottom bg-white">
                <AiOutlineInfoCircle className="mr-2 ml-4" size={18} />
                <span className="text-xs self-center font-semibold text-muted-med">
                  Bank details are important to get your settlements.
                </span>
              </div>
            </div>
          </Mobile>
        </div>
      ) : (
        <div className=" mx-4 h-screen mar-128 px-2 md:px-10">
          <div className="w-full mx-auto mt-6">
            <p className="my-4 text-lg md:text-xl item-label-title">Bank Details</p>
          </div>

          <div className="w-full my-80  mx-auto rounded-lg">
            <div className=" bg-white tbl-rounded">
              <div className="inline-block w-full px-4 py-4  md:px-6  md:py-6 ">
                <div className="my-4">
                  <div className="inline-block w-full">
                    <div className="mb-4 flex flex-wrap  w-full ">
                      <div className="w-full md:w-1/2 md:px-4 mb-2">
                        <p className="mb-2 item-label">Bank Name *</p>
                        <input
                          type="text"
                          placeholder="Name of the bank"
                          value={bankName}
                          onChange={e => setBankName(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        />
                        {errors.bankName && (
                          <span className="my-2 text-sm font-semibold text-secondary">Bank Name is mandatory</span>
                        )}
                      </div>
                      <div className="w-full md:w-1/2">
                        <p className="mb-2 item-label">Account Number *</p>
                        <input
                          type="number"
                          placeholder="Enter account number"
                          value={accountNo}
                          onKeyDown={e => numberInputValidation(e)}
                          onChange={e => setAccountNo(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        />
                        {errors.accountNo && (
                          <span className="my-2 text-sm font-semibold text-secondary">Account Number is mandatory</span>
                        )}   
                        {errors.InvalidAccountNo && (
                          <span className="my-2 text-sm font-semibold text-secondary">Invalid Account Number</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block w-full ">
                    <div className="mb-4 flex flex-wrap  w-full ">
                      <div className="w-full md:w-1/2 md:px-4 mb-2">
                        <p className="mb-2 item-label">Account Name *</p>
                        <input
                          type="text"
                          placeholder="Enter account holder's name"
                          value={accountName}
                          onChange={e => setAccountName(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        />
                        {errors.accountName && (
                          <span className="my-2 text-sm font-semibold text-secondary">Account Name is mandatory</span>
                        )}
                      </div>
                      <div className="w-full md:w-1/2">
                        <p className="mb-2 item-label">IFSC Code *</p>
                        <input
                          value={ifscCode}
                          placeholder="Enter IFSC Code"
                          onKeyDown={e =>( e.key === " ")&& e.preventDefault()}
                          onChange={e => setIfscCode(e.target.value)}
                          type="text"
                          className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        />
                        {errors.ifscCode && (
                          <span className="my-2 text-sm font-semibold text-secondary">IFSC Code is mandatory</span>
                        )}    
                        {errors.invalidIfscCode && (
                          <span className="my-2 text-sm font-semibold text-secondary">Invalid IFSC Code</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="inline-block w-full ">
                    <div className="mb-4 flex flex-wrap  w-full ">
                      <div className="w-full md:w-1/2 md:px-4">
                        <p className="mb-2 item-label">Branch *</p>
                        <input
                          type="text"
                          placeholder="Enter branch name"
                          value={branch}
                          onChange={e => setBranch(e.target.value)}
                          className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                        />
                        {errors.branch && (
                          <span className="my-2 text-sm font-semibold text-secondary">Branch is mandatory</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex w-full px-4 py-4 text-muted-light">
                <AiOutlineInfoCircle className="mr-4" size={25} />
                <span className="mt-1 text-xs font-semibold text-muted-med">
                  Bank details are important to get your settlements.
                </span>
              </div>
            </div>

            <div className="bg-mob mt-10 py-2">
              <button onClick={saveBank} className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {!edit &&  <PaymentPromotionImages />   }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  bankInfo: makeSelectBankInfo(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
})

const mapDispatchToProps = dispatch => ({
  setBankName: bankName => dispatch(setBankName({ bankName })),
  setAccountName: accountName => dispatch(setAccountName({ accountName })),
  setAccountNo: accountNo => dispatch(setAccountNo({ accountNo })),
  setIfscCode: ifscCode => dispatch(setIfscCode({ ifscCode })),
  setBranch: branch => dispatch(setBranch({ branch })),
  getBankDetails: ({ storeId, merchantId }) => dispatch(getBankDetails({ storeId, merchantId })),
  setBankDetails: ({ storeId, merchantId, bankName, accountName, accountNo, ifscCode, branch }) =>
    dispatch(setBankDetails({ storeId, merchantId, bankName, accountName, accountNo, ifscCode, branch })),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankDetails)
