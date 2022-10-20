import React from 'react'
import { makeSelectUser, makeSelectStore } from './selectors'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import defaultProfileImage from '../../images/icons/user.png'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import NewFooter from 'components/Footer/newFooter'

const MyProfile = ({ user, store }) => {
  return (
    <div>
      <ExtendedNavBar text={"My Profile"} noHelp/>
      <div className="p-4">
        <p className="font-semibold text-lg">Profile Details</p>
        <div className="rounded-lg bg-white mb-16">
          {<div className="flex p-4">
            <img style={{ borderRadius: '50%' }} className="w-1/6 h-56" src={user.profileImg ?user.profileImg:defaultProfileImage} />
          </div>}
          <div className="flex flex-col text-base font-semibold px-4 py-2 justify-center">
            Name
            <p className="font-normal mt-2 p-2 border-2 rounded-md border-gray-300 ">{user.full_name}</p>
          </div>
          <div className="flex flex-col text-base font-semibold px-4 py-2 justify-center">
            Mail Id
            <p className="font-normal mt-2 p-2 border-2 rounded-md border-gray-300 ">{user.email}</p>
          </div>
          <div className="flex flex-col text-base font-semibold px-4 py-2 justify-center">
            Phone Number
            <p className="font-normal mt-2 p-2 border-2 rounded-md border-gray-300 ">{store.primary_phone}</p>
          </div>
        </div>
      </div>
      <NewFooter/>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({ user: makeSelectUser(), store: makeSelectStore() })

export default connect(
  mapStateToProps,
  null,
)(MyProfile)
