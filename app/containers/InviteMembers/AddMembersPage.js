import React, { useState,useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import 'assets/PickUpAddress.css'
import { createStructuredSelector } from 'reselect'
import { useInjectReducer } from 'utils/injectReducer'
import { Helmet } from 'react-helmet'

import { useInjectSaga } from 'utils/injectSaga'
import reducer from './reducer'
import saga from './saga'
import {
    setInviteData,
    setInviteError,
    setInviteType,
    setMemberDetails,
    setMemberName,
    setMemberRole,
} from './actions'
import {
    makeSelectInviteMemberInfo,
    makeSelectMemberName,
    makeSelectInviteVia,
    makeSelectMemberRole,
    makeSelectInviteData,
    makeSelectGlobalUser,
    makeSelectInviteError,
    makeSelectInviteErrorMsg,
} from './selectors'
import { connect } from 'react-redux'
import { Menu, Dropdown, Radio, notification } from 'antd'
import '../../assets/CouponPage.css'
import { useHistory, useLocation } from 'react-router-dom'
import {validateEmail} from "../../utils/validation"
import ExtendedNavBar from 'components/TopNav/extendedNavBar'

const AddMembersPage = ({
    MemberName,
    InviteType,
    InviteData,
    MemberRole,
    setMemberName,
    setInviteType,
    setInviteData,
    setMemberRole,
    setMemberDetails,
    GlobalUser,
    inviteError,
    inviteErrorMsg,
    setInviteError
}) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    const loc=useLocation();

    const [errors, seterrors] = useState({
        MemberNameError:false,
        inviteTypeError: false,
        inviteDataError: false,
        roleError: false,
        invalidEmail:false,
    })
   

    useInjectReducer({ key: 'inviteMemberInfo', reducer })
    useInjectSaga({ key: 'inviteMemberInfo', saga })
    useEffect(() => {
    setInviteError("")
    }, [])

    const InviteMenu = () => {
        return (
            <Menu
                className="rounded-lg p-2 w-full"
                style={{ boxShadow: '0px 4px 12px #00000029', maxHeight: '95vh', overflow: 'auto' }}
            >
                <Menu.Item
                    key={1}
                    onClick={() => {
                        setInviteType('number')
                        setInviteData('')
                    }}
                >
                    <span type="button" className="flex justify-between  font-semibold text-sm">
                        <p style={{ color: 'rgba(36,36,36,0.7)' }}>Number</p>
                    </span>
                </Menu.Item>
                <Menu.Item
                    key={2}
                    onClick={() => {
                        setInviteType('Mail Id')
                        setInviteData('')
                    }}
                >
                    <span type="button" className="flex justify-between  font-semibold text-sm">
                        <p style={{ color: 'rgba(36,36,36,0.7)' }}>Mail Id</p>
                    </span>
                </Menu.Item>
            </Menu>
        )
    }
    const history=useHistory()
    function SendInvite() {
        if (!MemberName || !InviteData|| !MemberRole.roleName || !InviteType || !validateEmail(InviteData))
        {

            if (!MemberName)
            {
                seterrors(prev => ({ ...prev, MemberNameError: true }))
            }
            if (!InviteData){
                seterrors(prev => ({ ...prev, inviteDataError: true }))
            }
            if (!MemberRole.roleName){
                seterrors(prev => ({ ...prev, roleError: true }))
            }
            if (!InviteType){
                seterrors(prev => ({ ...prev, inviteTypeError: true }))                
            }        
            seterrors({
                MemberNameError: MemberName?false:true,
                inviteDataError: InviteData ? false : true,
                roleError: MemberRole.roleName ? false : true,
                inviteTypeError: InviteType ? false : true,
                invalidEmail:validateEmail(InviteData)||!InviteData?false:true,
            })     
        }
        else{
                setMemberDetails({
                    storeId: loc.state.storeId ? loc.state.storeId : GlobalUser.storeId,
                    merchantId: loc.state.merchantId?loc.state.merchantId:GlobalUser.merchantId,
                    MemberName,
                    InviteData,
                    MemberRole,
                    InviteType,
                    userId:loc.state.userId,
                    edit: loc.state && loc.state.btnText === 'Save Changes' ?true:false,
                })
            }
        }

        if(inviteError===true)
        {
            notification.error({
                message: inviteErrorMsg,
                placement: "bottomRight",
            })
        }
        else if(inviteError===false)
        {
            notification.success({
                message: loc.state && loc.state.btnText === 'Save Changes'  ? "Details Edited Successfully" : 'Invite Sent Successfully!!',
                placement: "bottomRight",
            })
            history.push("/app/manage-members")
            setInviteError("")
        }

    const [memberRole, setmemberRole] = useState(loc.state && loc.state.memberRole)
   
    return (
        <div>
             <Helmet>
                <title>Invite Members</title>
                <meta name="description" content="Invite Members Page" />
            </Helmet>

            <ExtendedNavBar noHelp onBack={()=>history.goBack()} text={loc.state && loc.state.btnText === "Save Changes" ? "Edit Staff Role" : "Invite New People" }  />
               
        <div
            className={isTablet ? 'mx-10 px-10 py-5' : 'mx-3 mt-5 pt-5 mb-10 pb-10'}
            style={{ overflowx: !isTablet && 'auto' }}
            >
           
                <div className={isTablet ? 'mx-10 my-10' : 'm-0 mb-10 pb-10'}>
                    <p className="font-bold text-lg">Invite New People</p>
                    <div className={isTablet ? 'rounded-xl bg-white px-10 pt-5' : 'rounded-xl bg-white p-5'}>
                        <div className={isTablet ? 'flex justify-between' : ''}>
                            <div className="w-full mr-10">
                                <p className="font-semibold text-md">Name *</p>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    className="pickup__address__input"
                                    value={MemberName}
                                    onChange={e => { setInviteError(""); setMemberName(e.target.value); seterrors(prev => ({ ...prev, MemberNameError: false })) }}
                                    disabled={loc.state&&loc.state.btnText==="Save Changes"}
                                />
                            {errors.MemberNameError && (
                                <span className="my-2 text-sm font-semibold text-secondary">Name is mandatory</span>
                                )
                            }
                            </div>
                            <div className={isTablet ? 'w-full ml-10' : 'w-full'}>
                                <p className="font-semibold text-md">Invite Via. *</p>
                                <div className="flex bg-white rounded-lg font-semibold shadow-sm mb-2">
                                    <Dropdown
                                        trigger={['none']}
                                        overlay={InviteMenu}
                                        onClick={(e)=>{e.preventDefault();setInviteError("")}}
                                        className="flex justify-between capitalize focus:outline-none"
                                        placement="bottomCenter"
                                        arrow
                                        disabled={loc.state && loc.state.btnText === "Save Changes"}
                                        >
                                        <div
                                            className="flex font-medium px-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                                            style={{
                                                border: '1px solid #DDD',
                                                background: '#fbfbfb',
                                                justifyContent: 'space-around',
                                                width: isTablet ? '28%' : '40%',
                                                borderTopRightRadius: '0px',
                                                borderBottomRightRadius: '0px',
                                                borderRight: '0',
                                            }}
                                            >
                                            <p className="my-auto mx-auto">{InviteType}</p>
                                        </div>
                                    </Dropdown>
                                    <input
                                        type={InviteType === 'number' ? 'number' : 'text'}
                                        placeholder={InviteType&&((InviteType === 'number') ? 'Enter Phone Number' : 'Enter Mail Id')}
                                        className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                                        value={InviteData}
                                        onChange={e => { setInviteError(""); setInviteData(e.target.value); seterrors(prev => ({ ...prev, inviteDataError: false,invalidEmail:false })) }}
                                        style={{ width: '72%', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
                                        disabled={loc.state && loc.state.btnText === "Save Changes"}
                                        />
                                </div>
                            {errors.inviteDataError && (
                            <span className="my-2 pt-5 text-sm font-semibold text-secondary">Invite Data is mandatory</span>
                            )
                        }  
                         {errors.invalidEmail && (
                            <span className="my-2 pt-5 text-sm font-semibold text-secondary">Mail Id is Invalid</span>
                            )
                        }
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div>
                            <p className="font-bold">Choose a Role *</p>
                            <Radio.Group
                                value={memberRole}
                                className="Radio-Group"
                                onChange={e => {
                                    e.preventDefault()
                                    setInviteError("")
                                    setmemberRole(e.target.value)
                                    setMemberRole(e.target.value, e.target.id)
                                }}
                                >
                                <Radio className="font-semibold" value={'GROUP_ADMIN'} id={2} style={{ margin: '10px 0px' }}>
                                    Admin
                                    <div className="radio-desc font-normal">Has full access to manage & edit site.</div>
                                </Radio>
                                <Radio className="font-semibold" value={'MANAGER'} id={3} style={{ margin: '10px 0px' }}>
                                    Manager
                                    <div className="radio-desc font-normal">
                                        Can view and manage store products, orders, sales channels, store settings, shipping and tax.
                                    </div>
                                </Radio>
                                <Radio className="font-semibold" value={'OPERATOR'} id={4} style={{ margin: '10px 0px' }}>
                                    Cashier/Operator
                                    <div className="radio-desc font-normal">Can view and manage store products, orders.</div>
                                </Radio>
                            </Radio.Group>
                        {errors.roleError && (
                            <span className="my-2 text-sm font-semibold text-secondary">Role is mandatory</span>
                            )
                        }
                        </div>
                        <div
                            className="text-sm font-medium flex justify-start w-full my-auto"
                            style={{
                                color: '#242424bf',
                                borderTop: '1px solid #24242467',
                                minHeight: '5vh',
                                alignItems: 'center',
                                padding: isTablet?"30px 20px":"10px 0px",
                                width:"108%",
                                margin: isTablet ? '20px -40px 20px -40px' : '5px -10px',
                            }}
                        >
                            <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light flex-none" size={18} />
                            <span>Invite people to work on this site, assign them roles and set their permissions.</span>
                        </div>
                    </div>
                        <div className={isTablet ? "bg-mob mt-10" :"flex flex-row-reverse bg-mob mt-10"}>
                       

                        <button
                            className="cta-btn"
                            style={{padding:!isTablet&&"11px 22px"}}
                            onClick={(e) => {
                                e.preventDefault()
                                SendInvite()
                            }}
                            >
                            {loc.state&&loc.state.btnText}
                        </button>                          

                    </div>
                </div>
            
        </div>
</div>
    )
}

const mapStateToProps = createStructuredSelector({
    InviteMemberInfo: makeSelectInviteMemberInfo(),
    MemberName: makeSelectMemberName(),
    InviteType: makeSelectInviteVia(),
    InviteData: makeSelectInviteData(),
    MemberRole: makeSelectMemberRole(),
    GlobalUser: makeSelectGlobalUser(),
    inviteError: makeSelectInviteError(),
    inviteErrorMsg: makeSelectInviteErrorMsg(),
})

const mapDispatchToProps = dispatch => ({
    setMemberName: val => dispatch(setMemberName(val)),
    setInviteType: val => dispatch(setInviteType(val)),
    setInviteData: val => dispatch(setInviteData(val)),
    setMemberRole: (roleName, roleId) => dispatch(setMemberRole(roleName, roleId)),
    setInviteError: (val) => dispatch(setInviteError(val)),
    setMemberDetails: ({ storeId, merchantId, MemberName, InviteData, MemberRole, InviteType,userId,edit }) =>
        dispatch(setMemberDetails({ storeId, merchantId, MemberName, InviteData, MemberRole, InviteType,userId,edit })),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddMembersPage)
