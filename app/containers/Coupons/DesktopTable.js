import React, { useState, useEffect } from 'react'
import couponMessagePrint from './couponMessagePrint'
import 'assets/DesktopPushNotificationTable.css'
import { Dropdown } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { AiOutlineEllipsis } from 'react-icons/ai'
import moment from 'moment'

const DesktopTable = ({ couponAPI, pageIndex, pageCnt, totalPages, total, setPage, menu, Tag, storeCurrencySymbol}) => {
   const [couponsApi, setCouponsApi] = useState([])


  useEffect(() => {

    setCouponsApi(couponAPI)

  }, [])
  return (
    <div className="deskNotiTable">
      <div className="noti__header__row">
        <div className="message text-sm">Coupon Details</div>
        <div className="status" />
        <div className="delivery__time text-sm">Time Span</div>
        <div className="status" />
        <div className="placeholder__div" />
      </div>
      {couponsApi.map((coupon, id) => {
        let start_time = parseInt(coupon.start_time.toString().concat('000'))

        let formatedTimeSpan
        if (coupon.start_time && coupon.end_time != null) {
          let end_time = parseInt(coupon.end_time.toString().concat('000'))
          formatedTimeSpan =
            moment(start_time)
              .utc(true)
              .format('DD MMM ') +
            ' - ' +
            moment(end_time)
              .utc(true)
              .format('D MMM YY')
        } else {
          formatedTimeSpan = moment(start_time)
            .utc(true)
            .format('DD MMM YY')
        }

        return (
          <div className="notification__row" key={id}>
            <div className="noti__data">
              <div className="title" style={{ fontWeight: 500 }}>
                {coupon.coupon_name}
              </div>
              <div className="text-xs text-muted-light font-large">
                <span style={{ fontWeight: 520 }}>{'' + coupon.coupon_code + ' . ' + couponMessagePrint(coupon, storeCurrencySymbol)}</span>
              </div>
            </div>
            <div className="noti__status">
              <Tag type={coupon.coupon_status} />
            </div>
            <div className="noti__delivery_time">
              <span className="text-xs text-muted-light font-medium" style={{ fontWeight: 520 }}>
                {formatedTimeSpan}
              </span>
            </div>
            <div className="noti__used mt-2">
              <p className="text-xs text-muted-light font-normal" style={{ fontWeight: 520 }}>
                {coupon.max_coupon_limit != null
                  ? coupon.used_coupon_count + '/' + coupon.max_coupon_limit + ' used'
                  : coupon.used_coupon_count + ' used'}
              </p>
            </div>
            <div className="noti__options">
              <Dropdown overlay={menu(coupon)} trigger={['click']}>
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
          {pageCnt.slice(0, pageIndex).reduce((a, b) => a + b, 0) + pageCnt[pageIndex]} of {totalPages}
        </span>
        <span className="ml-4 flex-none flex justify-between">
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
              cursor: pageIndex >= totalPages ? 'not-allowed' : 'pointer',
              color: pageIndex >= totalPages ? 'gray' : 'black',
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
