import React from 'react'

import { useHistory } from 'react-router'
import MediaQuery from 'react-responsive'

import { useInjectReducer } from 'utils/injectReducer'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { makeSelectStore } from './selectors'
import appReducer from 'containers/App/reducer'
import TopNav from 'components/TopNav'

import planUpgraded from '../../images/planUpgraded.svg'
import makeStoreUrl from 'utils/makeStoreUrl'

const PlanUpgradationPage = ({ store, location }) => {
  const history = useHistory()

  const { planName } = location.state
  useInjectReducer({ key: 'app', reducer: appReducer })

  return (
    <>
      <div>
        <div className="sticky bg-white mobile-topNav">
          <div className="flex justify-between px-4 pt-4 text-xl font-semibold">
            <p className="text-heavy">Upgrade Your Plan</p>
            <TopNav />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col justify-center items-center ">
          <div className="w-full md:w-3/4 leading-normal text-gray-800 px-4">
            <div>
              <br />
              <br />
            </div>
            <div className="bg-white rounded-lg shadow-lg">
              <div className=" px-2 py-2 md:px-3 md:py-4 text-center">
                <img src={planUpgraded} style={{ width: '50%', height: '50%', margin: '0 auto' }} />
                <br />
                <p className="font-semibold text-base text-secondary">
                  Hooray! <span className="text-black">Your plan is upgraded to</span> {planName}!
                </p>
                <br />
                <p className="font-semibold text-base text-black-pl">
                  Your store
                  <br />
                  <a
                    className="text-sm font-semibold px-1 text-black-pl"
                    href={`${makeStoreUrl(store.store_name, store.store_id)}`}
                    target="_blank"
                  >
                    {`${makeStoreUrl(store.store_name, store.store_id).slice(8)}`}
                  </a>{' '}
                  <br />
                  is live!
                </p>
              </div>
            </div>
            <MediaQuery maxDeviceWidth={1100}>
              <br />
              <br />
              <br />
              <br />
              <br />
            </MediaQuery>
          </div>
          <MediaQuery minDeviceWidth={1100}>
            <div className="flex flex-row-reverse justify-center mt-4 mb-4">
              <button
                onClick={() => {
                  history.push('/app')
                }}
                className="px-4 py-2 text-white rounded-lg bg-secondary cta-btn"
              >
                {' '}
                Done
              </button>
            </div>
          </MediaQuery>
          <MediaQuery maxDeviceWidth={1100}>
            <div className="w-full bottomButtons bg-white items-center place-items-center text-center">
              <button
                onClick={() => {
                  history.push('/app')
                }}
              >
                {' '}
                Done
              </button>
            </div>
          </MediaQuery>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  store: makeSelectStore(),
})

export default connect(mapStateToProps)(PlanUpgradationPage)
