import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router'
import backImg from '../../images/icons/back.svg'

import moment from 'moment'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { AiOutlineEllipsis, AiOutlineInfoCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import TopNav from 'components/TopNav'
import { StyledTableAlt } from 'components/StyledTableAlt'

import { Menu, Dropdown } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { useMediaQuery } from 'react-responsive'
import {
  deleteNotificationInDB,
  getNotifications,
  getTotalNotifications,
  resetNotifications,
  setPageIndex,
  setLoading,
} from './actions'
import saga from './saga'
import reducer from './reducer'
import { makeSelectMerchantId, makeSelectStoreId, makeSelectStore, makeSelectNotifications } from './selectors'
import { UnixTimeStampToDate } from 'utils/UnixTimeStampToDate'
import DeleteModal from './DeleteModal'
import { RingLoader } from 'react-spinners'
import DesktopTable from './DesktopTable'

const PushNotificationPage = ({
  store,
  storeId,
  merchantId,
  notificationsData,
  getInitialNotifications,
  resetData,
  getTotalNotifications,
  setPage,
  deleteNotification,
  setLoadingState,
}) => {
  useInjectReducer({ key: 'pushNotifications', reducer })
  useInjectSaga({ key: 'pushNotifications', saga })

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  const history = useHistory()
  const { pageIndex, totalPages, total, pageCnt, notifications, loading, fetched } = notificationsData
  const [toDelete, setToDelete] = useState(null)

  const menu = notificationData => (
    <Menu>
      <Menu.Item>
        <div
          className="p-2"
          onClick={e => {
            e.preventDefault()
            history.push({
              pathname: '/app/general/marketing&branding/create-notification',
              state: { ...notificationData },
            })
          }}
        >
          Duplicate Notification
        </div>
      </Menu.Item>
      <Menu.Item>
        <div
          className="p-2"
          onClick={e => {
            e.preventDefault()
            setToDelete(notificationData)
          }}
        >
          Remove
        </div>
      </Menu.Item>
    </Menu>
  )

  const Tag = ({ type }) => {
    var toReturn
    switch (type) {
      case 'error':
        toReturn = 'Error'
        break
      case 'pending':
        toReturn = 'Pending'
        break
      case 'delivered':
        toReturn = 'Delivered'
        break
      default:
        break
    }
    return <div className={`noti__${type}`}>{toReturn}</div>
  }

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    if (pageIndex === 1) getTotalNotifications(storeId)
    getInitialNotifications(storeId, pageIndex)
  }, [pageIndex])

  useEffect(() => {
    if (fetched) setLoadingState(false)
  }, [notifications])

  return (
    <>
      {toDelete && (
        <DeleteModal close={() => setToDelete(null)} storeId={storeId} data={toDelete} confirm={deleteNotification} />
      )}
      <div className="invisible-scrollbar" style={{ height: '100vh', overflowY: 'scroll', paddingBottom: '100px' }}>
        {!loading ? (
          <>
            <div className="sticky bg-white">
              <div className="flex justify-between p-4 border-b">
                <div className="flex items-center">
                  <div
                    onClick={() => history.goBack()}
                    className="flex mr-4 text-xl font-medium text-black hover:text-secondary"
                  >
                    <img
                      src={backImg}
                      style={{ height: '24px', width: '24px', cursor: 'pointer' }}
                      className="flex text-xl text-black font-medium ml-2 my-1"
                    />
                  </div>
                  <div className="flex text-xl text-black font-medium">Push Notification</div>
                </div>
                <TopNav />
              </div>
            </div>
            <div>
              {!notifications.length ? (
                <div className="bg-white mx-4 md:mx-10 mb-16" style={{ borderRadius: '12px', marginTop: '40px' }}>
                  <div className=" mx-4 h-64 flex flex-col justify-center items-center">
                    <p className="text-base text-center text-muted-med font-semibold">
                      Send push notifications to your customers.
                    </p>
                    <button
                      onClick={e => {
                        e.preventDefault()
                        history.push('/app/general/marketing&branding/create-notification')
                      }}
                      className="text-base cta-btn"
                      style={{ borderRadius: '8px', padding: '0.7rem 1.2rem' }}
                    >
                      Create Push Notification
                    </button>
                  </div>
                  <hr />
                  <div className="flex flex-row bg-white justify-start align-center px-2 py-4 tbl-rounded-bottom">
                    <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light font-semibold" size={18} />
                    <span className="text-xs font-normal text-muted-light font-semibold">
                      Sending push notifications can be useful to reach to your customers easily.
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="px-4 md:px-10 py-8 pb-4 flex items-center justify-between">
                    <h1 className="font-sans text-xl font-bold text-black-700  break-normal lg:mt-0 ">Notifications</h1>
                    <button
                      type="button"
                      className="add-notification-button cta-btn flex text-xs justify-evenly outline-none"
                      style={{ outline: 'none !important' }}
                      onClick={() => history.push('/app/general/marketing&branding/create-notification')}
                    >
                      <FaPlus style={{ alignItems: 'center', margin: '3px', cursor: 'pointer', outline: 'none' }} />{' '}
                      Push Notification
                    </button>
                  </div>
                  <Desktop>
                    <div className="px-10">
                      <DesktopTable
                        notifications={notifications}
                        pageIndex={pageIndex}
                        pageCnt={pageCnt}
                        totalPages={totalPages}
                        total={total}
                        menu={menu}
                        setPage={setPage}
                        Tag={Tag}
                      />
                    </div>
                  </Desktop>
                  <Mobile>
                    <div style={{ marginBottom: '100px' }} className=" flex flex-wrap px-4 ">
                      <div className="border-b-2 tbl-rounded-top w-full">
                        {notifications.map((notification, id) => {
                          return (
                            <table className="border-b-2 border-gray-400 w-full tbl-rounded-top" key={id}>
                              <tbody>
                                <tr>
                                  <td
                                    className="w-1/3 font-semibold item-label text-right"
                                    style={{
                                      paddingRight: '0.4rem',
                                      background: '#e8e9ee',
                                      fontSize: '0.92em',
                                      color: 'black',
                                    }}
                                  >
                                    Message
                                  </td>

                                  <td
                                    style={{
                                      background: '#FFFFFF',
                                      color: 'black',
                                      fontSize: '0.92rem',
                                      fontWeight: 'bold',
                                    }}
                                    className="p-4 w-2/3 font-medium item-sublabel"
                                  >
                                    <div className="flex flex-row" style={{ justifyContent: 'space-between' }}>
                                      <div className="overflow-ellipsis whitespace-nowrap font-semibold">
                                        {notification.title}
                                      </div>
                                      <br />
                                      <div className="relative">
                                        <Dropdown overlay={menu(notification)} trigger={['click']}>
                                          <button className="focus:outline-none text-sm gap-2">
                                            <AiOutlineEllipsis className="my-auto text-secondary" size={33} />
                                          </button>
                                        </Dropdown>
                                      </div>
                                    </div>
                                    <span className="overflow-ellipsis whitespace-nowrap color-grey font-normal text-xs">
                                      {notification.message}
                                    </span>
                                  </td>
                                </tr>
                                <tr className="w-full">
                                  <td
                                    className="w-1/3 font-semibold item-label text-right"
                                    style={{
                                      paddingRight: '0.4rem',
                                      background: '#e8e9ee',
                                      fontSize: '0.92em',
                                      color: 'black',
                                    }}
                                  >
                                    Status
                                  </td>
                                  <td
                                    style={{
                                      background: '#FFFFFF',
                                      color: 'black',
                                      fontSize: '0.92rem',
                                    }}
                                    className="w-2/3 p-4 font-semibold item-sublabel"
                                  >
                                    {notification.delivery_status === 'FAILURE' ? (
                                      <Tag type="error" />
                                    ) : notification.delivery_status === 'IN_PROGRESS' ? (
                                      <Tag type="pending" />
                                    ) : (
                                      <Tag type="delivered" />
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-1/3 p-4 font-semibold item-label text-right"
                                    style={{
                                      paddingRight: '0.4rem',
                                      background: '#e8e9ee',
                                      fontSize: '0.92em',
                                      color: 'black',
                                    }}
                                  >
                                    Delivery Time
                                  </td>
                                  <td
                                    style={{ background: '#FFFFFF' }}
                                    className="w-2/3 px-2 font-semibold item-sublabel"
                                  >
                                    <div>
                                      {notification.schedule_time
                                        ? UnixTimeStampToDate(notification.schedule_time)
                                        : UnixTimeStampToDate(notification.created_on)}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )
                        })}
                        <table className="w-full py-6">
                          <tbody>
                            <tr className="w-full" style={{ margin: '20px 0px !important' }}>
                              <th className="item-label font-semibold" style={{ background: '#fff' }} />
                              <th className="item-label font-semibold" style={{ background: '#fff' }} />
                              <th className="item-label font-semibold" style={{ background: '#fff' }} />
                              <th
                                className="w-full flex items-center item-label justify-end"
                                style={{
                                  background: '#fff',
                                  fontSize: 'large',
                                  color: '#242424BF',
                                  fontWeight: '500',
                                  height: '50px',
                                  padding: '10px',
                                }}
                              >
                                <span className="mr-4 flex-none">
                                  {pageCnt.slice(0, pageIndex).reduce((a, b) => a + b, 0) + 1} -{' '}
                                  {pageCnt.slice(0, pageIndex).reduce((a, b) => a + b, 0) + pageCnt[pageIndex]} of{' '}
                                  {total}
                                </span>
                                <span className="ml-4" className="flex-none flex justify-between">
                                  <LeftOutlined
                                    className="flex-none mr-4"
                                    style={{
                                      cursor: pageIndex === 1 ? 'not-allowed' : 'pointer',
                                      color: pageIndex === 1 ? 'gray' : 'black',
                                    }}
                                    onClick={e => {
                                      e.preventDefault()
                                      if (pageIndex !== 1) setPage(pageIndex - 1)
                                    }}
                                  />
                                  <RightOutlined
                                    className="flex-none"
                                    style={{
                                      cursor: pageIndex >= totalPages ? 'not-allowed' : 'pointer',
                                      color: pageIndex >= totalPages ? 'gray' : 'black',
                                    }}
                                    onClick={e => {
                                      e.preventDefault()
                                      if (pageIndex < totalPages) setPage(pageIndex + 1)
                                    }}
                                  />
                                </span>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Mobile>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="bg-black opacity-25 inset-0 z-50 w-full h-screen flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <RingLoader color="#F64C5D" size={150} />
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  store: makeSelectStore(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
  notificationsData: makeSelectNotifications(),
})

const mapDispatchToProps = dispatch => ({
  setLoadingState: val => dispatch(setLoading(val)),
  resetData: () => dispatch(resetNotifications()),
  setPage: pageNum => dispatch(setPageIndex(pageNum)),
  getTotalNotifications: storeId => dispatch(getTotalNotifications(storeId)),
  deleteNotification: (storeId, id) => dispatch(deleteNotificationInDB(storeId, id)),
  getInitialNotifications: (storeId, pageNum) => dispatch(getNotifications(storeId, pageNum)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PushNotificationPage)
