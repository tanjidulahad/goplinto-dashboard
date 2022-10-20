import React, { useEffect, useState, useRef } from 'react'
import { Modal, Input } from 'antd'
import trash from '../../images/icons/trash-2.svg'
const ImageUpload = ({
  picture,
  setPicture,
  onItemImageUpload,
  storeId,
  remove,
  bannerImage,
  setShowSaveButton,
  imageType = '',
  banner = false,
  bannerIdx = -1,
  icon = false,
}) => {
  const [showBannerImageModal, toggleBannerModal] = useState(false)
  const [uploadedBanner, uploadBanner] = useState(null)
  const [bannerLink, onBannerLinkChange] = useState(null)
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
  return (
    <div>
      {picture ? (
        <div className="">
          <div className="flex items-center">
            <img alt="Item Image" className={`${banner ? `w-56` : 'w-32'} h-32 rounded-lg`} src={picture && picture} />
          </div>
          {picture && (
            <div className="flex items-center mt-4 text-xs">
              <button
                type="button"
                className="flex text-secondary font-semibold text-xs"
                onClick={(e) => {
                  e.preventDefault()
                  remove()
                  setShowSaveButton && setShowSaveButton(true)
                }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                <img src={trash} height={18} width={18} alt="Remove Image" />
                <span className="mt-1 ml-2">Remove Image</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div onClick={() => (bannerImage ? toggleBannerModal(true) : null)}>
          <label
            className={`flex flex-col items-center ${banner ? 'w-56' : icon ? 'w-16' : 'w-32'} ${icon ? 'h-16' : 'h-32'
              } px-4 py-8 text-center bg-gray-300 border-2 border-dashed rounded-lg cursor-pointer border-secondary-400 text-secondary hover:text-secondary-600 hover:border-secondary-600`}
          >
            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>

            <span className="mt-2 text-xs font-medium tracking-wide text-gray-700">
              {icon ? (
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>Upload</span>
              ) : (
                <span>Upload {imageType} Image </span>
              )}
            </span>
           {  !bannerImage&& <input
              type="file"
              className="hidden"
              accept=".jpeg, .jpg, .png"
              ref={inputImage}
              onChange={e => {
                setShowSaveButton && setShowSaveButton(true)
                if (checkSize('inputImage')) {
                  if (bannerImage) {
                    uploadBanner(e.target.files[0])
                  } else if (!banner || (banner && bannerIdx === -1)) {
                    setPicture(URL.createObjectURL(e.target.files[0]))
                    onItemImageUpload(e.target.files[0], storeId)
                  } else {
                    setPicture(URL.createObjectURL(e.target.files[0]))
                  }
                }
              }}
            />}
          </label>
        </div>
      )}
      <div>
        {bannerImage ? (
          <Modal
            title="Upload Banner Image"
            visible={showBannerImageModal}
            onOk={() => {
              setPicture(uploadedBanner, bannerLink)
              uploadBanner(null)
              toggleBannerModal(false)
            }}
            onCancel={() => {
              uploadBanner(null)
              toggleBannerModal(false)
            }}
            style={{ padding: '1rem' }}
          >
            {uploadedBanner ? (
              <img
                style={{
                  width: '100%',
                  height: '250px',
                  margin: 'auto',
                }}
                src={URL.createObjectURL(uploadedBanner)}
              />
            ) : (
              <div>
                <label
                  className={`flex flex-col items-center ${banner ? 'w-56' : 'w-32'
                    } h-32 px-4 py-8 mx-4 text-center bg-gray-300 border-2 border-dashed rounded-lg cursor-pointer border-secondary-400 text-secondary hover:text-secondary-600 hover:border-secondary-600 mx-4`}
                >
                  <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-xs font-medium tracking-wide text-gray-700">Upload {imageType} Image</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpeg, .jpg, .png"
                    ref={modalImage}
                    onChange={e => {
                      if (checkSize('modalImage')) {
                        if (bannerImage) {
                          uploadBanner(e.target.files[0])
                        } else if (!banner || (banner && bannerIdx === -1)) {
                          setPicture(URL.createObjectURL(e.target.files[0]))
                          onItemImageUpload(e.target.files[0], storeId)
                        } else {
                          setPicture(URL.createObjectURL(e.target.files[0]))
                        }
                      }
                    }}
                  />
                </label>
              </div>
            )}
            <div className="mt-4">
              <label className="item-label" htmlFor="link">
                Link
              </label>
              <Input
                style={{ borderRadius: '5px', margin: '10px 0' }}
                label="Link"
                id="link"
                placeholder="Paste a link"
                value={bannerLink}
                onChange={e => {
                  onBannerLinkChange(e.target.value)
                }}
              />
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  )
}

export default ImageUpload
