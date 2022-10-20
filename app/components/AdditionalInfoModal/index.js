import React, { useCallback, useEffect, useState } from 'react'
import 'assets/AdditionalInfoModal.css'
import ImageUpload from 'components/ImageUpload'
import trash from 'images/icons/trash-2.svg'
import MediaQuery from 'react-responsive'
import { uploadFileToS3 } from 'services/s3'
import request from 'utils/request'

const AdditionalInfoModal = ({ item, closeModal, onSave, onDelete, storeId, setShowSaveButton }) => {
  const [data, setData] = useState({ ...item })
  const [uploadError, setUploadError] = useState(null)
  const [titleError, setTitleError] = useState(null)
  const [descError, setDescError] = useState(null)

  const [hasUploaded, setHasUploaded] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (item.edit) {
      if (isValid) {
        onSave(data)
      }
    }
    if (hasUploaded && isValid) {
      onSave(data)
    }
  }, [hasUploaded, isValid, data])

  const onChangehandler = (e,val)=> {
    e.preventDefault()
    setUploadError(null)
    setTitleError(null)
    setDescError(null)
    const newData = { ...data }
    newData[`${e.target.name}`] = val?e.target.value.slice(0,val):e.target.value
    setData(newData)
  }

  const saveChanges = useCallback(
    e => {
      e.preventDefault()
      let flag = true
      const regexCheck = new RegExp('^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+')
      if (item.type === 'video') {
        if (data.videoLink === '') {
          setUploadError('This field is required')
          flag = false
        } else if (!regexCheck.test(data.videoLink)) {
          setUploadError('Please enter a valid youtube url')
          flag = false
        }
      } else if (item.type === 'image') {
        if (uploadError) {
          flag = false
        } else if (data.imageUrl === '') {
          setUploadError('This field is required')
          flag = false
        }
      }
      if (data.title === '') {
        setTitleError('This field is required')
        flag = false
      }
      if (data.desc === '') {
        setDescError('This field is required')
        flag = false
      }
      if (flag) {
        setIsValid(true)
        setShowSaveButton(true)
      }
    },
    [data],
  )

  const uploadImage = useCallback(
    async (imgFile, storeId) => {
      const { name, type } = imgFile
      const requestURL = `${
        process.env.DASHBOARD_SERVICE_BASE_URL
      }customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`
      try {
        const imgData = await request(requestURL)
        await uploadFileToS3(imgData, imgFile)
        const imageUrl = imgData.fileKey !== '' ? `https://dsa0i94r8ef09.cloudfront.net/${imgData.fileKey}` : ''
        setHasUploaded(true)
        setData({ ...data, imageUrl })
        setUploadError(null)
      } catch (err) {
        setHasUploaded(false)
        setUploadError('An error occured!')
      }
    },
    [data, storeId],
  )

  useEffect(() => {
    const fetchImage = async () => {
      const link = data.videoLink
      let videoId
      let thumbnail
      try {
        const regexCheck = new RegExp('^(http(s)?://)?((w){3}.)?youtu(be|.be)?(.com)?/.+')
        if (regexCheck.test(link)) {
          const arr = link.split('=')
          videoId = arr[arr.length - 1]
          thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          setData({ ...data, imageUrl: thumbnail })
          setHasUploaded(true)
        }
      } catch (err) {
        setHasUploaded(false)
        setUploadError(err.message)
      }
    }
    fetchImage()
  }, [data.videoLink])

  return (
    <>
      {/* Backdrop */}
      <div className="flex justify-center items-center backdrop" />
      <div className="additionalInfo__modal">
        {/* Top Heading and close button */}
        <div className="additionalInfo__modal__top">
          <span>Additional Info</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-5 flex-none cursor-pointer"
            viewBox="0 0 20 20"
            fill="#242424BF"
            onClick={closeModal}
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="additionalInfo__modal__bottom">
          {/* Main Content */}
          <h4 className='mt-0'>{item.type === 'video' ? 'Embed Video *' : 'Image *'}</h4>
          {item.type === 'video' && (
            <>
              <input
                placeholder="Paste a YouTube link of your video"
                value={data.videoLink}
                name="videoLink"
                onChange={e=>onChangehandler(e)}
              />
              {uploadError && <p className="errTxt">{uploadError}</p>}
            </>
          )}
          {item.type === 'image' && (
            <>
              <div style={{ maxWidth: '100%', maxHeight: '200px', margin: '10px 0' }}>
                <ImageUpload
                  setShowSaveButton={setShowSaveButton}
                  picture={data.imageUrl}
                  onItemImageUpload={uploadImage}
                  setPicture={() => {}}
                  remove={() => setData({ ...data, imageUrl: '' })}
                  storeId={storeId}
                  banner
                />
              </div>
              {uploadError && <p className="errTxt">{uploadError}</p>}
            </>
          )}
          <h4>Title *<span> ( upto 50 chars. )</span></h4>
          <input placeholder="Enter a Title" value={data.title} name="title" onChange={e=>onChangehandler(e,50)} />
          {titleError && <p className="errTxt">{titleError}</p>}
          <h4>
            Description *<span> ( upto 200 chars. )</span>
          </h4>
          <textarea
            placeholder="Enter Product Description"
            maxLength="500"
            value={data.desc}
            name="desc"
            onChange={e=>onChangehandler(e,200)}
          />
          {descError && <p className="errTxt">{descError}</p>}
          {item.edit ? (
            <MediaQuery maxDeviceWidth={426}>
              <span className="addInfo__delete__section" onClick={() => { onDelete(data);setShowSaveButton(true)}} >
                <img src={trash} style={{ height: '15px', width: '15px', marginRight: '4px' }} />
                Delete Section
              </span>
            </MediaQuery>
          ) : null}
          <MediaQuery minDeviceWidth={426}>
            <div className="modal__actions">
              {item.edit ? (
                <span onClick={() => {onDelete(data);setShowSaveButton(true)}}>
                  <img src={trash} style={{ height: '15px', width: '15px', marginRight: '4px' }} />
                  Delete Section
                </span>
              ) : null}
              <button onClick={saveChanges}>Save Changes</button>
            </div>
          </MediaQuery>
        </div>
      </div>
      <MediaQuery maxDeviceWidth={426}>
        <div className="modal__actions">
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </MediaQuery>
    </>
  )
}

export default AdditionalInfoModal
