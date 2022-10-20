import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import onBoardStoreSaga from 'containers/OnBoardStore/saga'

import TopNav from 'components/TopNav'
import StoreCard from 'components/StoreCard'
import { toggleStore } from 'containers/OnBoardStore/actions'

import 'assets/GlobalStyles.css'

import saga from './saga'
import reducer from './reducer'

import { makeSelectStore, makeSelectStores } from './selectors'
import { getStoresByGroupId } from './actions'

const ManageStore = ({ stores, store, getStoresByGroupId, toggleStoreForMerchant }) => {
  const [id, setId] = useState(null)
  useInjectReducer({ key: 'manageStorePage', reducer })
  useInjectSaga({ key: 'manageStorePage', saga })
  useInjectSaga({ key: 'onBoardStore', saga: onBoardStoreSaga })

  useEffect(() => {
    getStoresByGroupId(store.group_id)
  }, [])

  return (
    <article>
      <Helmet>
        <title>Manage Store</title>
        <meta name="description" content="Manage Store" />
      </Helmet>
      <div className="mb-10">
        <div className="sticky bg-white mobile-topNav">
          <div className="flex justify-between px-4 pt-4 text-xl font-semibold">
            <p className="text-heavy">Manage Store</p>
            <TopNav />
          </div>
        </div>
      </div>
      <div className="store-card-container">
        {stores.map(store => (
          <div key={store.store_id}>
            <StoreCard
              store={store}
              onToggle={(storeId, storeBoolean) => {
                toggleStoreForMerchant(storeId, storeBoolean)
              }}
              setId={setId}
            />
          </div>
        ))}
      </div>
    </article>
  )
}

const mapStateToProps = createStructuredSelector({
  stores: makeSelectStores(),
  store: makeSelectStore(),
})

const mapDispatchToProps = dispatch => ({
  getStoresByGroupId: groupId => {
    dispatch(getStoresByGroupId(groupId))
  },
  toggleStoreForMerchant: (storeId, isOpen) => {
    dispatch(toggleStore(storeId, isOpen))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManageStore)
