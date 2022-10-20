import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { AiOutlineEllipsis, AiOutlineInfoCircle } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import moment from 'moment'
import { Menu, Dropdown } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useMediaQuery } from 'react-responsive'
import {
  resetNotifications,
  setPageIndex,
  setLoading,
  deleteCoupon,
  setCouponStatus,
  getCoupons,
  getAllCouponTypes,
  getTotalCoupons,
} from './actions'
import saga from './saga'
import reducer from './reducer'
import {
  makeSelectMerchantId,
  makeSelectStoreId,
  makeSelectStore,
  makeSelectNotifications,
  makeSelectCoupons,
} from './selectors'
import couponMessagePrint from './couponMessagePrint'
import DeleteModal from './DeleteModal'
import { RingLoader } from 'react-spinners'
import 'assets/CouponPage.css'
import DesktopTable from './DesktopTable'
import DeactivateModal from './DeactivateModal'
import ExtendedNavBar from 'components/TopNav/extendedNavBar'
const PushCouponPage = ({
  storeId,
  notificationsData,
  couponsData,
  getInitialCoupons,
  setPage,
  changeCouponStatus,
  deleteCouponWithId,
  setLoadingState,
  getCouponTypes,
  getTotalCoupons,
  store
}) => {
  useInjectReducer({ key: 'couponsReducer', reducer })
  useInjectSaga({ key: 'couponsSaga', saga })

  const Desktop = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 992 })
    return isTablet ? children : null
  }

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 991 })
    return isMobile ? children : null
  }

  const history = useHistory()
  const { pageIndex, totalPages, total, pageCnt, coupons, loading, fetched, fetchedType } = notificationsData
  const [toDelete, setToDelete] = useState(null)
  const [toDeactivate, setToDeactivate] = useState(null)
  const [reloadAfterStatusChangeToActivate, setReloadAfterStatusChangeToActivate] = useState(false)
  const [reloadAfterStatusChangeToDeactivate, setReloadAfterStatusChangeToDeactivate] = useState(false)
  const [reloadAfterDelete, setReloadAfterDelete] = useState(false)
  const [reloadData, setReloadData] = useState(false)

  const menu = coupon => (
    <Menu>
      <Menu.Item>
        <NavLink
          to={{
            pathname: '/app/general/marketing&branding/create-coupons',
            state: { couponId: coupon.coupon_id, couponObj: coupon },
          }}
        >
          <div className="p-2">Edit</div>
        </NavLink>
      </Menu.Item>
      {coupon.coupon_status == 'INACTIVE' && (
        <Menu.Item>
          <div
            className="p-2"
            onClick={e => {
              e.preventDefault()
              changeCouponStatus(coupon.coupon_id, 'ACTIVE')
              setReloadAfterStatusChangeToActivate(true)
            }}
          >
            Activate
          </div>
        </Menu.Item>
      )}
      {coupon.coupon_status == 'ACTIVE' && (
        <Menu.Item>
          <div
            className="p-2"
            onClick={e => {
              e.preventDefault()
              setToDeactivate(coupon)
            }}
          >
            Deactivate
          </div>
        </Menu.Item>
      )}
      {coupon.coupon_status == 'SCHEDULED' && (
        <Menu.Item>
          <div
            className="p-2"
            onClick={e => {
              e.preventDefault()
              setToDeactivate(coupon)
            }}
          >
            Deactivate
          </div>
        </Menu.Item>
      )}

      <Menu.Item>
        <div
          className="p-2"
          onClick={e => {
            e.preventDefault()
            setToDelete(coupon)
          }}
        >
          Remove
        </div>
      </Menu.Item>
    </Menu>
  )

  useEffect(() => {
    getTotalCoupons(storeId)
  }, [pageIndex])
  useEffect(() => {
    getInitialCoupons(storeId, pageIndex)
  }, [pageIndex,reloadData])

  useEffect(() => {
    setPage(1)
    getCouponTypes()
  }, [])

  useEffect(() => {
    if (fetched) setLoadingState(false)
  }, [couponsData])

  useEffect(() => {
    setReloadAfterStatusChangeToActivate(false)
    setReloadData(true)
  }, [reloadAfterStatusChangeToActivate])

  useEffect(() => {
    setReloadAfterStatusChangeToDeactivate(false)
    setReloadData(true)
  }, [reloadAfterStatusChangeToDeactivate])

  useEffect(() => {
    if (reloadAfterDelete === true) {
      setReloadAfterDelete(false)
      getTotalCoupons(storeId)
      setReloadData(true)
    }
  }, [reloadAfterDelete])

  useEffect(() => {
    setReloadData(false)
  }, [reloadData])

  const Tag = ({ type }) => {
    var toReturn
    switch (type) {
      case 'EXPIRED':
        toReturn = 'Expired'
        break
      case 'INACTIVE':
        toReturn = 'Not Active'
        break
      case 'ACTIVE':
        toReturn = 'Active'
        break
      case 'SCHEDULED':
        toReturn = 'Scheduled'
        break
      case 'LIMIT_EXCEEDED':
        toReturn = 'Limit Over'
      default:
        break
    }
    return <div className={`coup__${type}`}>{toReturn}</div>
  }

  return (
    <>
      {toDeactivate && (
        <DeactivateModal
          close={() => setToDeactivate(null)}
          data={toDeactivate}
          confirm={changeCouponStatus}
          setReloadAfterStatusChangeToDeactivate={setReloadAfterStatusChangeToDeactivate}
          reloadAfterStatusChangeToDeactivate={reloadAfterStatusChangeToDeactivate}
        />
      )}
      {toDelete && (
        <DeleteModal
          close={() => setToDelete(null)}
          data={toDelete}
          storeId={storeId}
          pageNum={pageIndex}
          confirm={deleteCouponWithId}
          setReloadAfterDelete={setReloadAfterDelete}
          reloadAfterDelete={reloadAfterDelete}
        />
      )}

      <div className="invisible-scrollbar couponPage-container" >
        {!loading ? (
          <>
            <ExtendedNavBar text={"Coupons"} onBack={() => history.goBack()} noHelp />
            <div>
              {!couponsData.length ? (
                <div className="bg-white mx-4 md:mx-10 mb-16 mt-10">
                  <div className=" mx-4 h-64 flex flex-col justify-center items-center">
                    <p className="text-sm text-center text-muted-med font-medium">Create and manage your coupons</p>
                    <button
                      onClick={e => {
                        e.preventDefault()
                        history.push('/app/general/marketing&branding/create-coupons')
                      }}
                      className="text-sm cta-btn createCouponBtn"
                    >
                      Create Coupons
                    </button>
                  </div>
                  <hr />
                  <div className="flex flex-row bg-white justify-start align-center px-2 py-4 tbl-rounded-bottom">
                    <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-light font-semibold" size={18} />
                    <span className="text-xs text-muted-light font-medium">
                      Offering discounts can be a powerful marketing strategy for your online store
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="px-4 md:px-10 py-8 pb-4 flex items-center justify-between">
                    <h1 className="font-sans text-xl font-bold text-black-700  break-normal lg:mt-0 ">Coupons</h1>
                    <button
                      type="button"
                        className="add-notification-button cta-btn flex text-xs justify-evenly outline-none addCouponBtn"
                      onClick={() => history.push('/app/general/marketing&branding/create-coupons')}
                    >
                        <FaPlus className='plusSymbolInBtn' />{' '}
                      Coupons
                    </button>
                  </div>
                  <Desktop>
                    <div className="px-10">
                      <DesktopTable
                        pageIndex={pageIndex}
                        pageCnt={pageCnt}
                        totalPages={totalPages}
                        total={total}
                        menu={menu}
                        setPage={setPage}
                        Tag={Tag}
                        couponAPI={couponsData}
                        storeCurrencySymbol={store.currency_symbol}
                      />
                    </div>
                  </Desktop>
                  <Mobile>
                      <div className=" flex flex-wrap px-4 b-100px">
                      <div className="border-b-2 tbl-rounded-top w-full">
                        {couponsData.map((coupon, id) => {
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
                            <table className="border-b-2 border-gray-400 w-full tbl-rounded-top" key={id}>
                              <tbody>
                                <tr>
                                  <td
                                    className="w-1/3   px-4 font-semibold item-label text-right couponsTableHeading">
                                    <span>
                                      Coupon <br /> Details
                                    </span>
                                  </td>

                                  <td className="p-4 w-2/3 font-medium item-label bg-white">
                                    <div className="flex flex-row justify-between">
                                      <div className="overflow-ellipsis flex flex-col whitespace-nowrap font-semibold">
                                        <span className='coupon_name'>
                                          {coupon.coupon_name}
                                        </span>

                                        <span className="text-xs font-normal">
                                          {coupon.coupon_code + '  .  ' + couponMessagePrint(coupon)}
                                        </span>
                                      </div>

                                      <br />
                                      <div className="relative">
                                        <Dropdown overlay={menu(coupon)} trigger={['click']}>
                                          <button className="focus:outline-none text-sm gap-2">
                                            <AiOutlineEllipsis className="my-auto text-secondary" size={33} />
                                          </button>
                                        </Dropdown>
                                      </div>
                                    </div>
                                    <span className="overflow-ellipsis whitespace-nowrap color-grey font-normal text-xs">
                                      {coupon.coupon_type}
                                    </span>
                                  </td>
                                </tr>
                                <tr className="w-full">
                                  <td className="w-1/3 px-4 font-semibold item-label text-right couponsTableHeading"/>
                                  <td className="w-2/3 p-4 font-semibold item-sublabel bg-white"
                                  >
                                    <Tag type={coupon.coupon_status} />                                    
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="w-1/3 p-4 font-semibold item-label text-right couponsTableHeading">
                                    Time <br /> Span
                                  </td>
                                  <td 
                                  className="w-2/3 px-4 font-semibold item-sublabel bg-white"
                                  >
                                    <div className="mb-2" >
                                      {formatedTimeSpan}
                                    </div>
                                    <div
                                      className="font-semibold couponTimeSpan bg-white">
                                      {coupon.max_coupon_limit != null
                                        ? coupon.used_coupon_count + '/' + coupon.max_coupon_limit + ' used'
                                        : coupon.used_coupon_count + ' used'}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )
                        })}
                        <table className="w-full py-6">
                          <tbody>
                              <tr className="w-full tableBodyMargin">
                                <th className="item-label font-semibold bg-white" />
                                <th className="item-label font-semibold bg-white"  />
                                <th className="item-label font-semibold bg-white" />
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
                                  {totalPages}
                                </span>
                                <span className="ml-4 flex-none flex justify-between">
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
  couponsData: makeSelectCoupons(),
})

const mapDispatchToProps = dispatch => ({
  setLoadingState: val => dispatch(setLoading(val)),
  resetData: () => dispatch(resetNotifications()),
  setPage: pageNum => dispatch(setPageIndex(pageNum)),
  getInitialCoupons: (storeId, pageNum) => dispatch(getCoupons(storeId, pageNum)),
  changeCouponStatus: (couponId, couponStatus) => dispatch(setCouponStatus(couponId, couponStatus)),
  deleteCouponWithId: (couponId, storeId, pageNum) => dispatch(deleteCoupon(couponId, storeId, pageNum)),
  getTotalCoupons: storeId => dispatch(getTotalCoupons(storeId)),
  getCouponTypes: () => dispatch(getAllCouponTypes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PushCouponPage)
