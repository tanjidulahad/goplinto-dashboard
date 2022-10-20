import React, { useCallback, useEffect, useState, useRef } from 'react'
import MediaQuery from 'react-responsive'
import { uploadFileToS3 } from 'services/s3'
import request from 'utils/request'

import { Modal, Input, Dropdown, Checkbox } from 'antd'
import { uploadImage } from 'containers/App/saga'
import trash from '../../images/icons/trash-2.svg'
const VariantImageUpload = ({ picture, setPicture, onItemImageUpload, storeId, remove, itemImages, variant }) => {
  const [selectedImages, setSelectedImages] = useState([])
  const [dropdownVisibility, setDropdownVisibility] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [showDeleteImage, setShowDeleteImage] = useState(false)
  const inputImage = useRef(0)
  const modalImage = useRef(0)
  const checkSize = inpField => {
    let inpCheck = inputImage
    if (inpField === 'modalImage') {
      inpCheck = modalImage
    }
    if (inpCheck.current.files.length > 0) {
      for (let i = 0; i <= inpCheck.current.files.length - 1; i++) {
        const fsize = inpCheck.current.files.item(i).size
        const file = Math.round(fsize / 1024)
        if (file > 4096) {
          alert('File too big.')
          return false
        }
        return true
      }
    }
  }
  const uploadVariantImage = useCallback(
    async imgFile => {
      const { name, type } = imgFile
      const requestURL = `${
        process.env.DASHBOARD_SERVICE_BASE_URL
      }customize/upload-image&filename=${name}&fileType=${type}&storeId=${storeId}`
      try {
        const imgData = await request(requestURL)
        await uploadFileToS3(imgData, imgFile)
        const imageUrl = imgData.fileKey !== '' ? `https://dsa0i94r8ef09.cloudfront.net/${imgData.fileKey}` : ''
        if (imageUrl) {
          setPicture([imageUrl])
          setDropdownVisibility(false)
        }
      } catch (err) {
        console.log(err)
      }
    },
    [storeId],
  )
  const variantImages = [
    variant.imgUrl1,
    variant.imgUrl2,
    variant.imgUrl3,
    variant.imgUrl4,
    variant.imgUrl5,
    variant.imgUrl6,
  ].filter(variantImage => variantImage)
  const imageList = itemImages.filter(itemImage => itemImage && !variantImages.includes(itemImage))
  const menu = () => (
    <div className="image-select-popUp p-6">
      <div className="item-label mb-2">Choose from your primary images or upload a new image</div>
      <div className="flex my-6 gap-2">
        <div className="flex gap-2">
          {imageList.map(image => (
            <div
              onClick={() => {
                if (variantImages.length + selectedImages.length < 6 || selectedImages.includes(image)) {
                  setSelectedImages(prev => {
                    if (prev.includes(image)) {
                      return prev.filter(img => img !== image)
                    }
                    return [...prev, image]
                  })
                }
              }}
              style={{
                boxShadow: selectedImages.includes(image) ? '0px 0px 0px 1px #f64b5d' : '',
              }}
              className={`imageSelect-image flex flex-col items-center text-center bg-gray-300 rounded-md ${
                variantImages.length + selectedImages.length < 6 || selectedImages.includes(image)
                  ? 'cursor-pointer imageSelect-selectable-image'
                  : null
              } text-secondary hover:text-secondary-600`}
            >
              <img className=" rounded-md" src={image} />
              {variantImages.length + selectedImages.length >= 6 && !selectedImages.includes(image) ? (
                <div className="popUp-image-overlay" />
              ) : null}
              {selectedImages.includes(image) && (
                <svg
                  style={{ position: 'absolute', top: '-7px', right: '-7px' }}
                  className="w-5 h-5"
                  viewBox="0 0 200 200"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="checkmark-outline" fillRule="nonzero">
                      <path
                        d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z"
                        id="Shape"
                        fill="#F64B5D"
                      />
                      <polygon
                        id="Path"
                        fill="#FFFFFF"
                        points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338"
                      />
                    </g>
                  </g>
                </svg>
              )}
            </div>
          ))}
        </div>

        <label className="popUp-image-upload flex flex-col items-center text-center bg-gray-300 border-2 border-dashed rounded-md cursor-pointer border-secondary-400 text-secondary hover:text-secondary-600 hover:border-secondary-600">
          <svg
            style={{ margin: 'auto' }}
            className="w-6 md:w-8 h-6 md:h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <input
            type="file"
            className="hidden"
            accept=".jpeg, .jpg, .png"
            ref={inputImage}
            onChange={e => {
              if (checkSize('inputImage')) {
                uploadVariantImage(e.target.files[0])
              }
            }}
          />
        </label>
      </div>
      <div className="flex justify-between items-center py-2">
        <Checkbox
          disabled={variantImages.length + imageList.length > 6}
          className="selectAll-checkbox"
          value={selectAll}
          onChange={e => {
            setSelectAll(e.target.checked)
            if (e.target.checked) setSelectedImages(imageList)
            else setSelectedImages([])
          }}
        >
          Select all
        </Checkbox>
        <button
          onClick={() => {
            setPicture(selectedImages)
            setDropdownVisibility(false)
          }}
          className="cta-btn rounded-lg text-white focus:outline-none"
          style={{
            transition: 'all .15s ease',
            whiteSpace: 'nowrap',
            borderRadius: '5px',
            padding: '5px 20px',
            fontWeight: '500',
          }}
        >
          Done
        </button>
      </div>
    </div>
  )
  return (
    <div className="w-full px-1 md:px-2">
      {picture ? (
        <div>
          <div className="variant-image-container flex items-center">
            <MediaQuery minDeviceWidth={1024}>
              <img
                alt="Item Image"
                style={{ aspectRatio: '1/1' }}
                className="variant-image w-full rounded-lg"
                src={picture && picture}
              />
              <div className="variant-image-overlay rounded-lg " onClick={remove}>
                <img className="variant-delete-icon" src={trash} height={18} width={18} alt="Remove Image" />
              </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1023}>
              <img
                onClick={() => {
                  setShowDeleteImage(true)
                }}
                alt="Item Image"
                style={{ aspectRatio: '1/1' }}
                className="variant-image w-full rounded-lg"
                src={picture && picture}
              />
              {showDeleteImage && (
                <div className="variant-image-overlay rounded-lg " onClick={remove}>
                  <img className="variant-delete-icon" src={trash} height={18} width={18} alt="Remove Image" />
                </div>
              )}
            </MediaQuery>
          </div>
        </div>
      ) : (
        <div>
          <Dropdown
            onClick={() => setDropdownVisibility(true)}
            visible={dropdownVisibility}
            overlay={menu()}
            trigger={['click']}
            placement="topCenter"
            arrow
          >
            <div
              style={{ aspectRatio: '1/1' }}
              className="flex flex-col items-center w-full text-center bg-gray-300 border-2 border-dashed rounded-md cursor-pointer border-secondary-400 text-secondary hover:text-secondary-600 hover:border-secondary-600"
            >
              <svg
                style={{ margin: 'auto' }}
                className="w-6 md:w-8 h-6 md:h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  )
}

export default VariantImageUpload
