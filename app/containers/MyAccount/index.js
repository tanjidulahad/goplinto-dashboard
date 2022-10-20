import React from 'react'
import { makeSelectUser, makeSelectStore, makeSelectStoreModules } from './selectors'
import { NavLink, useHistory } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import backImg from '../../images/icons/back.svg'

import { LOGOUT } from 'containers/Auth/constants'
import PaymentPromotionImages from 'components/PaymentPromotionImages'
import { makeSelectCurrentSubscriptionPlan } from '../PaymentPlanPage/selectors'
import PaymentPlanPageSaga from '../PaymentPlanPage/saga'
import paymentPlanReducer from '../PaymentPlanPage/reducer'
import { useInjectSaga } from 'utils/injectSaga'
import { useInjectReducer } from 'utils/injectReducer'
import userRoles from 'utils/userRoles'
import globalEnums from 'utils/globalEnums'
import Config_Submodules from 'utils/configSettingsSubmodules'

const MyAccountsPage = ({ user, store, logoutHandler, planName, storeSubscribedModules }) => {
  useInjectSaga({ key: 'subscriptionPlans', saga: PaymentPlanPageSaga })
  useInjectReducer({ key: 'subscriptionPlans', reducer: paymentPlanReducer })
  let history = useHistory()
  const configEnums = storeSubscribedModules && storeSubscribedModules[globalEnums.GOPLINTO_CONFIG_SETTINGS];
  return (
    <div className="bg-white">
      <div className="sticky flex justify-between  mobile-topNav">
        <div className="flex items-center px-2 text-xl font-semibold">
          <div className="mr-4 text-muted-med" onClick={() => history.goBack()}>
            <img src={backImg} style={{ height: '24px', width: '24px' }} className="ml-2 mr-2 my-1 cursor-pointer" />
          </div>
          <div className="fflex text-base font-semibold text-muted-med">My Account</div>
        </div>
      </div>
      <div className="flex p-4 border-b-2 border-gray-300 ">
        <img style={{ borderRadius: '50%' }} className="w-1/4" src={user.profileImg} />
        <div className="flex flex-col pl-2 justify-center">
          <div className="font-semibold text-lg">{user.full_name}</div>
        </div>
      </div>
      <div className="mx-4 border-b-2 py-2 border-gray-300">
        <NavLink className="flex py-4 items-center " to="/app/my-profile">
          <div className="ml-4 text-gray-600 font-semibold ">My Profile</div>
        </NavLink>
   {(planName.length !== 0 && planName[planName.length - 1] && planName[planName.length - 1].subscription_plan) !=="ENTERPRISE"&&
        <NavLink className="flex py-4 items-center " to="/app/general/payment-plan">
          <div className="text-secondary ml-4 text-gray-600 font-semibold ">Upgrade Plan</div>
        </NavLink>}
        {configEnums && configEnums.submodules[Config_Submodules.BILLING] &&<NavLink className="flex py-4 items-center " to="/app/billing">
          <div className="ml-4 text-gray-600 font-semibold ">Billing History</div>
        </NavLink>}
        {configEnums && configEnums.submodules[Config_Submodules.INVITE_MEMBERS]&& <NavLink className="flex py-4 items-center " to="/app/manage-members">
          <div className="ml-4 text-gray-600 font-semibold ">Invite Staff Member</div>
        </NavLink>}
      </div>
      <div className="mx-4 border-b-2 py-2 border-gray-300">
        <NavLink className=" p-4" to="/helpcenter">
          <div className="ml-4 font-normal text-gray-600 font-semibold" style={{ color: 'rgba(36,36,36,0.7)' }}>
            Help & FAQ
          </div>
        </NavLink>
      </div>
      <div className=" p-4" type="button" onClick={logoutHandler}>
        <div className="ml-4 font-normal text-gray-600 font-semibold" style={{ color: 'rgba(36,36,36,0.7)' }}>
          Logout
        </div>
      </div>
      <PaymentPromotionImages />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({ user: makeSelectUser(), store: makeSelectStore(),
  planName:makeSelectCurrentSubscriptionPlan(),
  storeSubscribedModules:makeSelectStoreModules(),
})

const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch({ type: LOGOUT }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyAccountsPage)
