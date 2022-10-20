import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { StyledTableAlt } from 'components/StyledTableAlt'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import 'assets/PickUpAddress.css'
import userIcon from '../../images/icons/user.png'
import { Helmet } from 'react-helmet'
import { createStructuredSelector } from 'reselect'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import reducer from './reducer'
import saga from './saga'
import {
  setInviteData,
  setInviteType,
  setMemberDetails,
  setMemberName,
  setMemberRole,
  getMemberDetails,
  setMemberUserId,
  setInviteError,
} from './actions'
import { makeSelectInviteMemberInfo, makeSelectGlobalUser, makeSelectAllMembersDetails } from './selectors'
import { connect } from 'react-redux'
import { Menu, Dropdown, notification } from 'antd'
import '../../assets/CouponPage.css'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { NavLink, useHistory } from 'react-router-dom'
import convertDate from 'utils/convertDate'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
import NewFooter from 'components/Footer/newFooter'

const InviteMembers = ({
  setMemberName,
  setInviteType,
  setInviteData,
  setMemberRole,
  setMemberUserId,
  GlobalUser,
  AllMembersDetails,
  setMemberDetails,
  getMemberDetails,
  setInviteError,
}) => {
  const isTablet = useMediaQuery({ minWidth: 992 })
  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  const history=useHistory();
  useInjectReducer({ key: 'inviteMemberInfo', reducer })
  useInjectSaga({ key: 'inviteMemberInfo', saga })

  useEffect(() => {
    getMemberDetails({ storeId: GlobalUser.storeId })
    setInviteError("")
  }, [] )
  
  const [memberRole, setmemberRole] = useState('')
  const menu = val => (
    <Menu>
      {val.record_status === 'PENDING' && (
        <Menu.Item key={1}>
          <div
            className="p-2"
            onClick={e => {
              e.preventDefault()
              setMemberDetails({
                storeId: GlobalUser.storeId,
                merchantId: GlobalUser.merchantId,
                MemberName: val.full_name,
                InviteData: val.email_id ? val.email_id : val.phone,
                MemberRole: { roleName: val.role_name, roleId: val.role_id },
                InviteType: val.email_id ? 'email' : 'number',
                userId: val.merchant_id,
                edit:false,
                resending:true,
              })
              notification.success({
                message:  'Invite Sent Successfully!!',
                placement: "bottomRight",
              })
            }}
            >
            Resend Invite
          </div>
        </Menu.Item>
      )}

      <Menu.Item key={2}>
        <NavLink
          to={{
            pathname: '/app/manage-members/member',
            state: {
              memberObject: val,
              storeId: GlobalUser.storeId,
              merchantId: GlobalUser.merchantId,
              memberRole: val.role_name,
              btnText: 'Save Changes',
              userId: val.merchant_id,
            },
          }}
          onClick={() => {
            setMemberName(val.full_name)
            setMemberRole(val.role_name, val.role_id)
            setInviteData(val.email_id ? val.email_id : val.phone)
            setmemberRole(val.role_name)
            setMemberUserId(val.merchant_id)
            setInviteType(val.email_id ? 'email' : 'number')
          }}
          style={{ color: '#312522' }}
          >
          <div className="p-2">Edit Role</div>
        </NavLink>
      </Menu.Item>
    </Menu>
  )
  useEffect(() => {
    getMemberDetails({ storeId: GlobalUser.storeId })
  }, [window.location.pathname])

  return (
    <>
      <Helmet>
        <title>Invite Members</title>
        <meta name="description" content="Invite Members Page" />
      </Helmet>

      <ExtendedNavBar text={"Invite Staff Members"} noHelp onBack={()=>history.goBack()} />
      <div className={isTablet ? 'mx-10 my-10 p-10' : 'mx-3 mt-5 pt-5 mb-10 pb-10'} style={{ overflow: 'hidden' }}>
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-lg">Staff Members</h1>
            <NavLink
              to={{
                pathname: '/app/manage-members/member',
                state: {
                  storeId: GlobalUser.storeId,
                  merchantId: GlobalUser.merchantId,
                  btnText: 'Send Invite',
                },
              }}
            >
              <button
                style={{ background: '#f64b5d' }}
                className={'mb-5 mt-0 p-2 text-white rounded-md text-md font-semibold '}
                onClick={() => {
                  setMemberName('')
                  setInviteData('')
                  setInviteType('Mail Id')
                  setmemberRole('')
                  setMemberUserId('')
                  setMemberRole('', '')
                }}
              >
                Invite People
              </button>
            </NavLink>
          </div>
          <div className="bg-white rounded-lg">
            <Desktop>
              <StyledTableAlt>
                <tbody>
                  <tr className="w-full tbl-rounded-top" style={{ background: '#1A24551A' }}>
                    <th style={{ padding: isTablet && '0px 30px' }}>Name</th>
                    <th style={{ padding: isTablet && '0px 30px' }}>Role</th>
                    <th style={{ padding: isTablet && '0px 30px' }}>Joined On</th>
                    <th />
                  </tr>
                  {AllMembersDetails &&
                    AllMembersDetails.length > 0 &&
                    AllMembersDetails.map((val, idx) => {
                      return (
                        <tr key={idx}>
                          <td className="px-5" style={{ paddingTop: '20px', paddingBottom: '15px' }}>
                            <div className="flex">
                              <img
                                src={idx === 0 ? GlobalUser.profileImg : userIcon}
                                className="my-auto"
                                style={{ height: '40px', width: '40px', borderRadius: '50%' }}
                              />
                              <div className="ml-4">
                                <p className="font-bold mb-0">{val.full_name}</p>
                                <span className="font-medium text-gray-600 text-sm">
                                  {val.email_id ? val.email_id : val.phone}
                                </span>
                              </div>
                            </div>
                            <hr
                              className="z-1  mt-5"
                              style={{ width: idx != AllMembersDetails.length - 1 ? '280%' : '0%' }}
                            />
                          </td>
                          <td className="flex align-middle">{val.role_name}</td>

                          {idx === 0 ? (
                            <td style={{ padding: '0px' }}>
                              <span className="bg-gray-300 p-2 text-sm rounded-md">Primary Owner</span>
                              <span className="mt-2 text-sm mx-1">{convertDate(val.create_date)}</span>
                            </td>
                          ) : (
                            <td style={{ padding: '0px' }}>
                              {val.record_status === 'PENDING' ? (
                                <p
                                  className="p-2 text-sm rounded-md mx-2"
                                  style={{ background: '#FF8C501A', color: '#FF8C50', width: '80px' }}
                                >
                                  Pending
                                </p>
                              ) : (
                                <p>{convertDate(val.create_date)}</p>
                              )}
                            </td>
                          )}
                          <td className="cursor-pointer text-red-500 font-bold text-xl" style={{ padding: '0px' }}>
                            {idx !== 0 && (
                              <Dropdown overlay={menu(val)} trigger={['click']}>
                                <button className="focus:outline-none text-md gap-2">
                                  <AiOutlineEllipsis
                                    className="my-auto mr-5"
                                    style={{ color: 'rgba(0,0,0, 0.5)' }}
                                    size={33}
                                  />
                                </button>
                              </Dropdown>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </StyledTableAlt>
            </Desktop>
            <Mobile>
              <div className="flex flex-wrap">
                {AllMembersDetails &&
                  AllMembersDetails.map((val, idx) => (
                    <div className="border-b-2 tbl-rounded-top w-full" key={idx}>
                      <table className="w-full tbl-rounded-top">
                        <tbody style={{ overflowx: !isTablet && 'auto' }}>
                          <tr>
                            <td
                              style={{
                                paddingLeft: '1rem',
                                background: '#eeeff2',
                                width: '5rem',
                              }}
                            />
                            <td className="px-4 text-xs font-bold text-right text-secondary">
                              {idx !== 0 && (
                                <Dropdown overlay={menu(val)} trigger={['click']}>
                                  <button className="focus:outline-none text-md gap-2">
                                    <AiOutlineEllipsis
                                      className="my-auto mr-5"
                                      style={{ color: 'rgba(0,0,0, 0.5)' }}
                                      size={33}
                                    />
                                  </button>
                                </Dropdown>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="w-1/3 font-semibold item-label text-right"
                              style={{
                                padding: '1rem',
                                background: '#e8e9ee',
                                fontSize: '0.92em',
                              }}
                            >
                              Name
                            </td>
                            <td className="w-2/3 px-1 font-medium item-sublabel">
                              <div className="flex">
                                <img
                                  src={idx === 0 ? GlobalUser.profileImg : userIcon}
                                  className="my-auto"
                                  style={{ height: '40px', width: '40px', borderRadius: '50%' }}
                                />
                                <div className="my-auto ml-4">
                                  <p className="font-bold mb-0">{val.full_name}</p>
                                </div>
                              </div>
                              <div className='flex justify-center'>

                                  <span className="font-medium text-gray-600 text-sm">
                                    {val.email_id ? val.email_id : val.phone}
                                  </span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="w-1/3 font-semibold item-label text-right"
                              style={{
                                padding: '1rem',
                                background: '#e8e9ee',
                                fontSize: '0.92em',
                              }}
                            >
                              Role
                            </td>
                            <td className="w-2/3 px-2 font-medium item-sublabel">{val.role_name}</td>
                          </tr>
                          <tr>
                            <td
                              className="w-1/3 font-semibold item-label text-right"
                              style={{
                                padding: '1rem',
                                paddingLeft:"0.5rem",
                                background: '#e8e9ee',
                                fontSize: '0.92em',
                              }}
                            >
                              Joined On
                            </td>
                            {idx === 0 ? (
                              <td className='px-2'>
                                <span className="bg-gray-300 p-1 py-2 text-xs rounded-md ">Primary Owner</span>
                                <br />
                                <p className="mt-2 text-sm font-semibold mx-1">{convertDate(val.create_date)}</p>
                              </td>
                            ) : (
                              <td>
                                {val.record_status === 'PENDING' ? (
                                  <span
                                    className="p-2 text-sm rounded-md mx-2"
                                    style={{ background: '#FF8C501A', color: '#FF8C50' }}
                                  >
                                    Pending
                                  </span>
                                ) : (
                                  <span className="font-semibold">{convertDate(val.create_date)}</span>
                                )}
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
              </div>
            </Mobile>

            <div
              className="text-sm font-medium flex justify-start w-full my-auto"
              style={{
                padding: '5px',
                color: '#242424bf',
                borderTop: '1px solid #24242467',
                minHeight: '5vh',
                padding: '20px',
                alignItems: 'center',
              }}
            >
              <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light flex-none" size={18} />
              <span>Invite people to work on this site, assign them roles and set their permissions.</span>
            </div>
          </div>
        </div>
      </div>
    <NewFooter/>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  InviteMemberInfo: makeSelectInviteMemberInfo(),
  GlobalUser: makeSelectGlobalUser(),
  AllMembersDetails: makeSelectAllMembersDetails(),
})

const mapDispatchToProps = dispatch => ({
  setMemberName: val => dispatch(setMemberName(val)),
  setInviteType: val => dispatch(setInviteType(val)),
  setInviteData: val => dispatch(setInviteData(val)),
  setMemberRole: (roleName, roleId) => dispatch(setMemberRole(roleName, roleId)),
  setMemberUserId: userId => dispatch(setMemberUserId(userId)),
  getMemberDetails: ({ storeId }) => dispatch(getMemberDetails({ storeId })),
  setMemberDetails: ({ storeId, merchantId, MemberName, InviteData, MemberRole, InviteType, userId, edit, resending }) =>
    dispatch(setMemberDetails({ storeId, merchantId, MemberName, InviteData, MemberRole, InviteType, userId, edit, resending })),
  setInviteError: (val) => dispatch(setInviteError(val)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InviteMembers)