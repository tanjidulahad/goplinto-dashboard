import React from 'react'
import { UnixTimeStampToDate } from 'utils/UnixTimeStampToDate'
import 'assets/DesktopPushNotificationTable.css'
import { Dropdown } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { AiOutlineEllipsis } from 'react-icons/ai'

const DesktopTable = ({ notifications, pageIndex, pageCnt, totalPages, total, setPage, menu, Tag }) => {
  return (
    <div className="deskNotiTable">
      <div className="noti__header__row">
        <div className="message">Message</div>
        <div className="status">Status</div>
        <div className="delivery__time">Delivery Time</div>
        <div className="placeholder__div" />
      </div>
      {notifications.map((notification, id) => {
        return (
          <div className="notification__row" key={id}>
            <div className="noti__data">
              <div className="title">{notification.title}</div>
              <div className="message">{notification.message}</div>
            </div>
            <div className="noti__status">
              {notification.delivery_status === 'FAILURE' ? (
                <Tag type="error" />
              ) : notification.delivery_status === 'IN_PROGRESS' ? (
                <Tag type="pending" />
              ) : (
                <Tag type="delivered" />
              )}
            </div>
            <div className="noti__delivery_time">
              {notification.schedule_time
                ? UnixTimeStampToDate(notification.schedule_time)
                : UnixTimeStampToDate(notification.created_on)}
            </div>
            <div className="noti__options">
              <Dropdown overlay={menu(notification)} trigger={['click']}>
                <button className="focus:outline-none text-md gap-2">
                  <AiOutlineEllipsis className="my-auto mr-5" style={{ color: 'rgba(0,0,0, 0.5)' }} size={33} />
                </button>
              </Dropdown>
            </div>
          </div>
        )
      })}
      <div className="noti__pagination">
        <span
          className="mr-8 flex-none"
          style={{ letterSpacing: '0.43px', color: '#242424BF', fontSize: 'medium', fontWeight: '500' }}
        >
          {pageCnt.slice(0, pageIndex).reduce((a, b) => a + b, 0) + 1} -{' '}
          {pageCnt.slice(0, pageIndex).reduce((a, b) => a + b, 0) + pageCnt[pageIndex]} of {total}
        </span>
        <span className="ml-4" className="flex-none flex justify-between">
          <LeftOutlined
            className="flex-none mr-8"
            style={{
              cursor: pageIndex === 1 ? 'not-allowed' : 'pointer',
              color: pageIndex === 1 ? 'gray' : 'black',
              fontSize: 'large',
              fontWeight: '600',
            }}
            onClick={e => {
              e.preventDefault()
              if (pageIndex > 1) setPage(pageIndex - 1)
            }}
          />
          <RightOutlined
            className="flex-none"
            style={{
              cursor: pageIndex < totalPages ? 'pointer' : 'not-allowed',
              color: pageIndex < totalPages ? 'black' : 'gray',
              fontSize: 'large',
              fontWeight: '600',
            }}
            onClick={e => {
              e.preventDefault()
              if (pageIndex < totalPages) setPage(pageIndex + 1)
            }}
          />
        </span>
      </div>
    </div>
  )
}

export default DesktopTable
