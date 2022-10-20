import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { NavLink } from 'react-router-dom'

import { connect } from 'react-redux'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'

import Card from 'components/Card'
import CardSubtext from 'components/CardSubtext'
import FormPage from './Form'
import saga from './saga'
import reducer from './reducer'
import { getBankData, submitBankData } from './actions'

const key = 'bank'

const BankPage = ({ bank, merchantId, storeId, getBankInformation }) => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const {
    IFSC: storeIfsc,
    account_name: storeAccountName,
    account_no: storeAccountNo,
    bank_name: storeBankName,
    branch: storeBankBranch,
  } = bank
  const [bankName, setBankName] = useState(storeBankName || '')
  const [branch, setBranch] = useState(storeBankBranch || '')
  const [accountName, setAccountName] = useState(storeAccountName || '')
  const [accountNumber, setAccountNumber] = useState(storeAccountNo || '')
  const [ifscCode, setIfscCode] = useState(storeIfsc || '')

  useEffect(() => {
    getBankInformation(storeId, merchantId)
  }, [])

  return (
    <article>
      <Helmet>
        <title>Bank Details</title>
        <meta name="description" content="Bank Page" />
      </Helmet>

      <FormPage className="flex flex-col w-full px-10 my-10 lg:w-4/5">
        <div className="flex">
          <h1 className="flex items-center px-2 mt-12 mb-6 font-sans text-xl font-bold text-gray-700 uppercase break-normal lg:mt-0 md:text-2xl">
            Bank Details
            <NavLink
              className="mx-4 text-lg text-blue-500 uppercase"
              to={{ pathname: '/app/edit/information', state: { firstTime: false, pageParam: 'bank-information' } }}
            >
              Edit
            </NavLink>
          </h1>
        </div>

        <Card>
          <div>
            <div>
              <CardSubtext text="Bank Name" />
              <input
                placeholder="Indian Overseas Bank"
                required
                className="block w-1/2 form-input focus:bg-white"
                id=""
                type="text"
                value={bankName}
                name="resName"
                disabled
              />
            </div>
            <div className="mt-8">
              <CardSubtext text="Account Name" />
              <input
                placeholder="John Doe"
                className="block w-1/2 form-input focus:bg-white"
                id=""
                required
                type="text"
                value={accountName}
                name="resName"
                disabled
              />
            </div>
            <div className="mt-8">
              <CardSubtext text="Account Number" />
              <input
                placeholder="1234 5678 91011"
                className="block w-1/2 form-input focus:bg-white"
                id=""
                required
                type="number"
                value={accountNumber}
                name="resName"
                disabled
              />
            </div>
            <div className="mt-8">
              <CardSubtext text="IFSC Code" />
              <input
                placeholder="CODE0000A"
                required
                className="block w-1/2 form-input focus:bg-white"
                id=""
                type="text"
                value={ifscCode}
                name="resName"
                disabled
              />
            </div>
            <div className="mt-8">
              <CardSubtext text="Branch" />
              <input
                placeholder="Thiruvanmiyur"
                className="block w-1/2 form-input focus:bg-white"
                id=""
                required
                type="text"
                value={branch}
                name="resName"
                disabled
              />
            </div>
          </div>
        </Card>
      </FormPage>
    </article>
  )
}

const mapStateToProps = state => ({
  merchantId: state.get('global').user.merchantId,
  storeId: state.get('global').store.store_id,
  bank: state.get('global').bank,
})
const mapDispatchToProps = dispatch => ({
  submitBankInformation: (merchantId, storeId, bankData) => dispatch(submitBankData(merchantId, storeId, bankData)),
  getBankInformation: (storeId, merchantId) => dispatch(getBankData(storeId, merchantId)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankPage)
