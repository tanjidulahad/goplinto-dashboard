// TODO: REFACTOR CONTAINER
import React, { memo, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { NavLink } from 'react-router-dom'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import Select from 'react-select'
import CreateStoreModal from 'components/Modal'
import reducer from './reducer'
import saga from './saga'

import FormPage from './Form'
import { createStore, getStoreData, updateStore } from './actions'
import { RETAIL } from './constants'

const key = 'home'

export function HomePage({ store, storeId, merchantId, updateStoreDetails, createStoreForMerchant, getStore }) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const storeTypes = [{ value: RETAIL, label: 'Retail' }]

  const {
    store_name: storeName,
    store_desc: storeDesc,
    primary_email: storeEmail,
    primary_phone: storePhone,
    is_open_today: isOpenToday,
  } = store

  const [bussinessName, setBussinessName] = useState(storeName || '')
  const [description, setDescription] = useState(storeDesc || '')
  const [email, setEmail] = useState(storeEmail || '')
  const [phone, setPhone] = useState(storePhone || '')
  const [storeType, setStoreType] = useState(storeTypes[0])

  const [storeOpen, setStoreOpen] = useState(isOpenToday === 'Y')

  const noStore = storeId === null

  const [showCreateStore, setShowCreateStore] = useState(noStore)

  useEffect(() => {
    if (storeId) {
      getStore(storeId)
    }
  }, [])

  return (
    <article>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Home page" />
      </Helmet>
      <FormPage className="flex flex-col w-full px-10 my-10 lg:w-4/5">
        {/* <!--Title--> */}
        <div className="flex">
          <h1 className="flex items-center px-2 mt-12 mb-6 font-sans text-xl font-bold text-gray-700 uppercase break-normal lg:mt-0 md:text-2xl">
            Store Details{' '}
            <NavLink
              className="mx-4 text-lg text-blue-500 uppercase"
              to={{ pathname: '/app/edit/information', state: { firstTime: false, pageParam: 'store-info' } }}
            >
              Edit
            </NavLink>
          </h1>
        </div>

        {/* <!--Card--> */}
        <div className="w-full p-8 mt-5 leading-normal text-gray-800 bg-white rounded-lg lg:mt-0">
          {/* <!--Title--> */}
          <div className="my-2">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Store Name
            </label>
            <input
              placeholder="D.C Central Kitchen "
              className="block w-1/2 form-input focus:bg-white"
              id=""
              type="text"
              value={bussinessName}
              name="resName"
              disabled
            />
          </div>
          <div className="my-10">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Store Description
            </label>
            <input
              placeholder="Italian, Cafe"
              required
              className="block w-1/2 form-input focus:bg-white"
              id=""
              type="text"
              value={description}
              name="resName"
              disabled
            />
          </div>
          <div className="my-10">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Store Type
            </label>
            <Select
              isDisabled
              className="w-1/2"
              defaultValue={storeType}
              options={storeTypes}
              onChange={setStoreType}
            />
            <input tabIndex={-1} style={{ opacity: 0, height: 0 }} value={storeType} required />
          </div>

          <div className="my-10">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Is your store open?
            </label>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input type="checkbox" checked={storeOpen} disabled className="hidden" />
                  <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner toggle__line" />
                  <div className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow toggle__dot" />
                </div>
              </label>
            </div>
          </div>
        </div>
        {/* <!--/Card--> */}

        <hr className="mb-6 bg-gray-300" />

        <h1 className="flex items-center px-2 mt-12 mb-6 font-sans text-xl font-bold text-gray-700 uppercase break-normal lg:mt-0 md:text-2xl">
          Contact Details
        </h1>

        {/* <!--Card--> */}
        <div className="w-full p-8 mt-5 leading-normal text-gray-800 bg-white rounded-lg lg:mt-0">
          {/* <!--Title--> */}
          <div className="">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Email Id
            </label>
            <input
              placeholder="your.name@example.com"
              className="block w-1/2 form-input focus:bg-white"
              id=""
              type="email"
              required
              value={email}
              name="resName"
              disabled
            />
          </div>
          <div className="w-full py-8 mt-5 leading-normal text-gray-800 bg-white rounded-lg lg:mt-0">
            <label id="section1" htmlFor="resName" className="mb-4 item-label">
              Phone Number
            </label>
            <input
              placeholder="98765 43210"
              className="block w-1/2 form-input focus:bg-white"
              id=""
              type="tel"
              value={phone}
              required
              name="resName"
              disabled
            />
          </div>
        </div>
      </FormPage>
      {/* <!--/Section container-->
       */}
      {showCreateStore && (
        <CreateStoreModal
          title="New Store"
          placeholder="Your Super Store's Name"
          attributeName={bussinessName}
          setAttributeName={setBussinessName}
          closeModal={() => setShowCreateStore(false)}
          onCreateAttribute={() => {
            createStoreForMerchant(merchantId, bussinessName)
            setShowCreateStore(false)
          }}
        >
          <FormPage>
            <input
              className="w-full form-input"
              type="text"
              placeholder="Your Super Store's Name"
              value={bussinessName}
              onChange={e => setBussinessName(e.target.value)}
            />
          </FormPage>
        </CreateStoreModal>
      )}
    </article>
  )
}

HomePage.propTypes = {}

const mapStateToProps = state => ({
  storeId: state.get('global').user.storeId,
  merchantId: state.get('global').user.merchantId,
  store: state.get('global').store,
})

export function mapDispatchToProps(dispatch) {
  return {
    updateStoreDetails: (storeDetails, merchantId, storeId) => dispatch(updateStore(storeDetails, merchantId, storeId)),
    createStoreForMerchant: (merchantId, storeName) => dispatch(createStore(merchantId, storeName)),
    getStore: storeId => dispatch(getStoreData(storeId)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(HomePage)
