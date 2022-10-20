import React, { useState } from 'react'
import { makeSelectUser, makeSelectStore, makeSelectStoreGroupDetils, makeSelectStoreModules } from './selectors'
import { NavLink } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import ShareModal from 'components/ShareModal'

import { IoIosArrowForward } from 'react-icons/io'

import Reports from '../../images/icons/mobile-reports.png'
import Branding from '../../images/icons/mobile-marketing.png'
import Integration from '../../images/icons/mobile-integration.png'
import LiveStore from '../../images/icons/mobile-live-store.png'
import Share from '../../images/icons/mobile-share.png'
import helpIcon from '../../images/icons/help-mob.svg'
import inventoryLogo from '../../images/icons/prod-mob.svg'
import designIcon from '../../images/icons/design_red.png'
import addOnsIcon from '../../images/icons/addOnsLogo.svg'
import makeStoreUrl from 'utils/makeStoreUrl'
import globalEnums from 'utils/globalEnums'
import userRoles from 'utils/userRoles'
import NewFooter from 'components/Footer/newFooter'

const MorePage = ({ user, store, storeGroupDetails, storeSubscribedModules }) => {
  const [showShareModal, setShowShareModal] = useState(false)
const [ShowDesignPopUp, setShowDesignPopUp] = useState(false)
  const storeLink = makeStoreUrl(store.store_name, store.store_id)
  return (
    <div>
      <div className="sticky flex justify-between bg-white mobile-topNav">
        <div className="flex content-center pt-4 px-2 text-xl font-semibold">
          <p className="flex text-base font-semibold text-muted-med">More Options</p>
        </div>
      </div>
      <div className="flex p-4 border-b-2 border-gray-300 bg-white">
        <img style={{ borderRadius: '50%' }} className="w-1/4" src={user.profileImg} />
        <div className="flex flex-col pl-2 justify-center">
          <p className="font-semibold text-lg">{user.full_name}</p>
          <NavLink className="flex" to="/app/my-account">
            <div className="font-semibold text-xs text-secondary">My Account</div>
            <IoIosArrowForward className="my-auto self-center text-secondary" size={14} />
          </NavLink>
        </div>
      </div>
      <div className='mb-5'>
        {user.role_id !== userRoles.GROUP_ADMIN && (
          <>
            <NavLink className="flex px-4 pt-5 items-center bg-white" exact to="#" onClick={()=>setShowDesignPopUp(!ShowDesignPopUp)}>
              <img src={designIcon} className="ml-2" />
              <div className="ml-4 text-gray-600 font-semibold ">Designs</div>
            </NavLink>  
            <NavLink className="flex px-4 pt-5 items-center bg-white" exact to="/app/manage-items">
              <img src={inventoryLogo} />
              <div className="ml-4 text-gray-600 font-semibold ">Products</div>
            </NavLink>
            {storeSubscribedModules && storeSubscribedModules[globalEnums.REPORTS] &&
            <NavLink className="flex px-4 pt-5 items-center bg-white" to="/app/reports">
              <img src={Reports} />
              <div className="ml-4 text-gray-600 font-semibold ">Reports & Analytics</div>
            </NavLink>}
            {storeSubscribedModules && storeSubscribedModules[globalEnums.MARKETING] &&
            <NavLink className="flex px-4 pt-5 items-center bg-white" to="/app/general/marketing&branding">
              <img src={Branding} />
              <div className="ml-4 text-gray-600 font-semibold ">Marketing & Branding</div>
            </NavLink>}
            {storeSubscribedModules && storeSubscribedModules[globalEnums.GOPLINTO_ADDONS] &&
            <NavLink className="flex px-4 pt-5 items-center bg-white" to="/app/general/add-ons">
              <img src={addOnsIcon} />
              <div className="ml-4 text-gray-600 font-semibold ">Add Ons</div>
            </NavLink>}
            {storeSubscribedModules && storeSubscribedModules[globalEnums.THIRD_PARTY_SOURCE_INTEGRATION] &&
            <NavLink className="flex px-4 pt-5 items-center bg-white" to="/app/integrations">
              <img src={Integration} />
              <div className="ml-4 text-gray-600 font-semibold ">Integrations</div>
            </NavLink>}
          </>
        )}
        {user.role_id !== userRoles.GROUP_ADMIN || (user.role_id === userRoles.GROUP_ADMIN && storeGroupDetails.group_domain_url) ? (
          <>
            <a
              href={user.role_id === userRoles.GROUP_ADMIN ? storeGroupDetails.group_domain_url : storeLink}
              target="_blank"
              rel="noopener noreferrer"
              title="Visit your store!"
              className="flex px-4 pt-5 items-center bg-white"
            >
              <img src={LiveStore} />
              <div className="ml-4 text-gray-600 font-semibold ">View Live Store</div>
            </a>
            <div
              className="flex px-4 pt-5 items-center bg-white"
              onClick={e => {
                e.preventDefault()
                setShowShareModal(true)
              }}
            >
              <img src={Share} />
              <div className="ml-4 text-gray-600 font-semibold ">Share Store</div>
            </div>
          </>
        ) : null}
      <NavLink className="flex px-4 pt-5 items-center bg-white" to="/helpcenter">
        <img src={helpIcon} />
        <div className="ml-4 text-gray-600 font-semibold ">Help & FAQs</div>
      </NavLink>
      </div>

      {showShareModal && (
        <ShareModal
          close={e => {
            e.preventDefault()
            setShowShareModal(false)
          }}
          storeUrl={user.role_id === userRoles.GROUP_ADMIN ? storeGroupDetails.group_domain_url : storeLink}
        />
      )}
        {ShowDesignPopUp && (
        <div className="flex justify-center items-center backdrop">      
          <div className='bg-white rounded-md p-5 mx-5 mr-8'>
            <div className='flex justify-end' onClick={() => setShowDesignPopUp(false)}>
            <button className='font-bold text-lg border-transparent'>X</button>
            </div>
          <p className='font-medium text-lg px-2'>Designs are only available on website.</p>          
          </div>
          </div>
      )}
      <NewFooter/> 
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  store: makeSelectStore(),
  storeGroupDetails: makeSelectStoreGroupDetils(),
  storeSubscribedModules: makeSelectStoreModules()
})

export default connect(
  mapStateToProps,
  null,
)(MorePage)
