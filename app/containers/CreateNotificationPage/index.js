import React, { useEffect, useState, useCallback } from 'react'

import { useHistory } from 'react-router'
import backImg from '../../images/icons/back.svg'
import MobileBack from 'images/android.png'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import TopNav from 'components/TopNav'
import ImageUpload from 'components/ImageUpload'
import { Form, Input, Radio, DatePicker, TimePicker, notification } from 'antd'

import {
  setCreateNotificationError,
  startUploadImage,
  createNotificationStatus,
  createNotification,
  resetData,
  setImage,
} from './actions'
import saga from './saga'
import reducer from './reducer'
import { makeSelectMerchantId, makeSelectStoreId, makeSelectStore, makeSelectNotificationData } from './selectors'
import ReviewModal from './ReviewModal'
import moment from 'moment'
import { getDate } from 'utils/UnixTimeStampToDate'
import MediaQuery from 'react-responsive'

const CreateNotification = ({
  store,
  storeId,
  merchantId,
  creationData,
  setCreationStatus,
  setCreationError,
  uploadImage,
  clearData,
  postNotification,
  setImageUrl,
}) => {
  useInjectReducer({ key: 'createNotification', reducer })
  useInjectSaga({ key: 'createNotification', saga })

  const [devicePreview, setDevicePreview] = useState('initial')
  const [audience, setAudience] = useState('ALL_REGISTERED')
  const [deliverySchedule, setDeliverySchedule] = useState('now')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [notificationImage, setNotificationImage] = useState(null)
  const [targetUrl, setTargetUrl] = useState('')

  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorTargetUrl, setErrorTargetUrl] = useState('')
  const [customTimeError, setCustomTimeError] = useState('')

  const history = useHistory()

  const [showReviewModal, setShowReviewModal] = useState(null)

  const showNotification = (type, message) => {
    notification.open({
      description: message,
      style: {
        color: 'white',
        background: type === 'error' ? 'red' : 'green',
      },
      placement: 'bottomRight',
    })
  }

  useEffect(() => {
    clearData()
    const data = history.location.state
    if (data) {
      setTitle(data.title)
      setMessage(data.message)
      if (data.image_url) {
        setNotificationImage(data.image_url)
        setImageUrl(data.image_url)
      }
      setTargetUrl(data.target_url)
      setAudience(data.audience_type)
      if (data.is_scheduled === 'Y') {
        setDeliverySchedule('custom')
        const date = getDate(data.schedule_time)
        setSelectedDate(moment(date).format('YYYY-MM-DD'))
        setSelectedTime(moment(date).format('hh:mm a'))
      } else {
        setDeliverySchedule('now')
        setSelectedDate(moment(new Date()).format('YYYY-MM-DD'))
        setSelectedTime(moment(new Date()).format('hh:mm a'))
      }
    } else {
      setDeliverySchedule('now')
      setSelectedDate(moment(new Date()).format('YYYY-MM-DD'))
      setSelectedTime(moment(new Date()).format('hh:mm a'))
    }
  }, [])

  useEffect(() => {
    if (creationData.isCreating === 'IN_PROGRESS' && creationData.isCreationError) {
      showNotification('error', 'An error occured!')
      /* Set creationStatus/isCreationError as false */
      setCreationStatus('')
      setCreationError(false)
    } else if (creationData.isCreating === 'DONE' && !creationData.isCreationError) {
      showNotification('success', `Notification ${deliverySchedule === 'now' ? `sent` : `scheduled`} successfully!`)
      setCreationStatus('')
      setCreationError(false)
      history.goBack()
    }
  })

  const checkValidityAndProceed = () => {
    /* Check if these fields are empty */
    if (!title) setErrorTitle('This field is required!')
    if (!message) setErrorMessage('This field is required!')
    if (!targetUrl) setErrorTargetUrl('This field is required!')
    if(!title||!message||!targetUrl) return;    
    if (deliverySchedule === 'custom') {
      if (!selectedDate || !selectedTime) return setCustomTimeError('These fields are required!')
    }
    /* If not then proceed to show the modal to review the data */

    const notiData = {
      title,
      message,
      targetUrl,
      imageUrl: creationData.uploadedImage,
      audienceType: audience,
      isScheduled: deliverySchedule === 'now' ? 'N' : 'Y',
      scheduleTime:
        deliverySchedule === 'now' ? null : moment(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD hh:mm a').format('X'),
    }
    setShowReviewModal(notiData)
  }

  return (
    <>
      {showReviewModal && (
        <ReviewModal
          close={() => setShowReviewModal(null)}
          data={showReviewModal}
          confirm={() => {
            postNotification(storeId, merchantId, showReviewModal)
            setShowReviewModal(null)
          }}
        />
      )}
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
            <div className="flex md:text-xl text-black font-medium" style={{ color: '#242424' }}>
              Create New Push Notification
            </div>
          </div>
          <TopNav />
        </div>
      </div>
      <div className="pushNotification-container bottomExtraMargin">
        <p className="font-bold text-lg">Notification Message</p>
        <Form className="pushNotificationPage-section" layout="vertical">
          <Form.Item className="font-bold" label="Title *">
            <Input
              className={`font-normal checkout-form-input ${errorTitle ? 'input-red' : ''}`}
              placeholder={errorTitle || 'Enter A Title'}
              value={title}
              onChange={e => {
                setErrorTitle('')
                setTitle(e.target.value)
              }}
            />
            <p className='text-red-500'>{errorTitle} </p>
          </Form.Item>
          <Form.Item className="font-bold" label="Message *">
            <Input
              className={`font-normal checkout-form-input ${errorMessage ? 'input-red' : ''}`}
              placeholder={errorMessage || 'Enter Notification Message'}
              value={message}
              onChange={e => {
                setErrorMessage('')
                setMessage(e.target.value)
              }}
            />
            <p className='text-red-500'>{errorMessage} </p>
          </Form.Item>
          <div className="notification-image-upload mb-8">
            <p className="font-bold">Image </p>
            <ImageUpload
              picture={notificationImage}
              remove={() => setNotificationImage('')}
              setPicture={setNotificationImage}
              onItemImageUpload={uploadImage}
              storeId={storeId}
              banner
            />
          </div>
          <Form.Item className="font-bold" label="Target URL *">
            <Input
              className={`font-normal checkout-form-input ${errorTargetUrl ? 'input-red' : ''}`}
              placeholder={errorTargetUrl || 'Paste URL of targeted Link to this notification'}
              value={targetUrl}
              onChange={e => {
                setErrorTargetUrl('')
                setTargetUrl(e.target.value)
              }}
            />
            <p className='text-red-500'>{errorTargetUrl} </p>
          </Form.Item>
          <div className="mb-8">
            <div className="device-preview-header flex justify-between items-center">
              <p className="font-bold">Device Preview </p>
              <div
                className="p-1 border rounded-md flex justify-between mb-4"
                style={{ borderColor: 'rgba(0,0,0,.25)', width: 'fit-content' }}
              >
                <button
                  onClick={() => setDevicePreview('initial')}
                  className={`px-2 py-1 rounded-md text-xs font-medium focus:outline-none ${devicePreview ===
                    'initial' && 'bg-secondary text-white'}`}
                >
                  Initial State
                </button>
                <button
                  onClick={() => setDevicePreview('expanded')}
                  className={`px-2 py-1 rounded-md text-xs font-medium focus:outline-none ${devicePreview ===
                    'expanded' && 'bg-secondary text-white'}`}
                >
                  Expanded State
                </button>
              </div>
            </div>
            {/* Android / IOS Preview */}
            <div className="notifications__preview">
              <div>
                <img src={MobileBack} />
                <div className={`collapsed ${devicePreview === 'expanded' && `flex-col justify-between items-start`}`}>
                  <div className={`${devicePreview === 'expanded' ? 'notiData_expanded' : `notiData `}`}>
                    <span className="storeName">{store.store_name}</span>
                    <span className="notiTitle">{title}</span>
                    <span className="notiMessage">{message}</span>
                  </div>
                  {notificationImage && (
                    <div className={`${devicePreview === 'expanded' ? 'notiImage_expanded' : 'notiImage'}`}>
                      <img src={notificationImage} />
                    </div>
                  )}
                </div>
                <span>Android</span>
              </div>
              <div>
                <img src={MobileBack} />
                <div className={`collapsed ${devicePreview === 'expanded' && `flex-col justify-between items-start`}`}>
                  {devicePreview !== 'expanded' ? (
                    <>
                      <div className="notiData">
                        <span className="storeName">{store.store_name}</span>
                        <span className="notiTitle">{title}</span>
                        <span className="notiMessage">{message}</span>
                      </div>
                      {notificationImage && (
                        <div className="notiImage">
                          <img src={notificationImage} />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="notiData_expanded" style={{ marginBottom: '0px !important' }}>
                        <span className="storeName mb-0">{store.store_name}</span>
                      </div>
                      {notificationImage && (
                        <div className="notiImage_expanded">
                          <img src={notificationImage} />
                        </div>
                      )}
                      <div className="notiData_expanded mt-1" style={{ marginBottom: '0px !important' }}>
                        <span className="notiTitle mb-0">{title}</span>
                        <span className="notiMessage">{message}</span>
                      </div>
                    </>
                  )}
                </div>
                <span>IOS</span>
              </div>
            </div>
          </div>
        </Form>
        <p className="font-bold text-lg">Audience</p>
        <div className="pushNotificationPage-section">
          <p className="font-bold">Choose your audience</p>
          <Radio.Group
            value={audience}
            className="Radio-Group"
            onChange={e => {
              setAudience(e.target.value)
            }}
          >
            <Radio className="font-semibold" value={'ALL_REGISTERED'} style={{ margin: '10px 0px' }}>
              Registered Browsers/ All customers
              <div className="radio-desc font-normal">
                Send this notification to all the users who have created an account in your store.
              </div>
            </Radio>
            <Radio className="font-semibold" value={'INACTIVE_CUSTOMERS'} style={{ margin: '10px 0px' }}>
              Idle/Inactive Customers
              <div className="radio-desc font-normal">
                Send this notification to the users who have not visited or placed an order in the past 6 months span.
              </div>
            </Radio>
            <Radio className="font-semibold" value={'ABANDONED_CART_CUSTOMERS'} style={{ margin: '10px 0px' }}>
              Cart Abandoners
              <div className="radio-desc font-normal">
                Send this notification to the users who have added items in the cart but haven't placed an order in the
                past 6 months span.
              </div>
            </Radio>
            <Radio className="font-semibold" value={'ORDERED_CUSTOMERS'} style={{ margin: '10px 0px' }}>
              Loyal customers
              <div className="radio-desc font-normal">
                Send this notification to all the users who have placed one or more orders in the past 6 months span.
              </div>
            </Radio>
          </Radio.Group>
        </div>
        <p className="font-bold text-lg">Delivery Schedule</p>
        <div className="pushNotificationPage-section">
          <p className="font-bold">When should the notification be sent?</p>

          <Radio.Group
            value={deliverySchedule}
            className="Radio-Group"
            onChange={e => {
              setDeliverySchedule(e.target.value)
            }}
          >
            <Radio value={'now'} style={{ margin: '5px 0px' }}>
              Immediately
            </Radio>
            <Radio value={'custom'} style={{ margin: '10px 0px' }}>
              Schedule a Time
            </Radio>
          </Radio.Group>
          {deliverySchedule === 'custom' && (
            <div className="w-full flex flex-col">
              <div className="picker-container w-full">
                <DatePicker
                  defaultValue={() => moment(selectedDate, 'YYYY-MM-DD')}
                  allowClear={false}
                  onChange={(date, dateString) => {
                    setCustomTimeError('')
                    setSelectedDate(dateString)
                  }}
                />
                <TimePicker
                  use12Hours
                  allowClear={false}
                  format="hh:mm a"
                  value={moment(selectedTime, 'hh:mm a')}
                  onSelect={time => {
                    setSelectedTime(moment(time).format('hh:mm a'))
                  }}
                />
              </div>
              {customTimeError && <p className="errorTxt text-red-500">{customTimeError}</p>}
            </div>
          )}
        </div>
        <MediaQuery minDeviceWidth={769}>
          <div className="review_and_send">
            <button
              onClick={e => {
                e.preventDefault()
                checkValidityAndProceed()
              }}
            >
              Review & Send
            </button>
          </div>
        </MediaQuery>
      </div>
      <MediaQuery maxDeviceWidth={769}>
        {!showReviewModal && (
          <div className="review_and_send">
            <button
              onClick={e => {
                e.preventDefault()
                checkValidityAndProceed()
              }}
            >
              Review & Send
            </button>
          </div>
        )}
      </MediaQuery>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  creationData: makeSelectNotificationData(),
  store: makeSelectStore(),
  storeId: makeSelectStoreId(),
  merchantId: makeSelectMerchantId(),
})

const mapDispatchToProps = dispatch => ({
  clearData: () => dispatch(resetData()),
  setImageUrl: imageUrl => dispatch(setImage(imageUrl)),
  uploadImage: (image, storeId) => dispatch(startUploadImage(image, storeId)),
  setCreationStatus: val => dispatch(createNotificationStatus(val)),
  setCreationError: val => dispatch(setCreateNotificationError(val)),
  postNotification: (storeId, merchantId, data) => dispatch(createNotification(storeId, merchantId, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNotification)
