import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CoverPicUpload = ({ onUpload, store, onUploadBannerToDb, pageState }) => {
  const [picture, setPicture] = useState(null)
  const onChangePicture = e => {
    setPicture(URL.createObjectURL(e.target.files[0]))
    onUpload(e.target.files[0], store.store_id)
    onUploadBannerToDb(pageState.coverImgUrl, store.owner_id, store.store_id)
  }
  const removePicture = () => {
    setPicture(null)
  }
  return (
    <div className="mb-4">
      <label className="block mb-2 text-xs font-medium tracking-wider text-gray-700 uppercase" htmlFor="restaurantName">
        Store Banner Image
      </label>
      <div>
        {picture ? (
          <div className="w-full h-32">
            <img alt="restaurant logo" className="object-cover w-full h-32 rounded-lg" src={picture && picture} />
          </div>
        ) : (
          <label className="flex flex-col items-center w-full h-32 px-4 py-8 text-center bg-gray-300 border-2 border-dashed rounded-lg cursor-pointer text-secondary-400 border-secondary-400 hover:text-secondary-600 hover:border-secondary-600">
            <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-xs font-medium tracking-wide text-gray-700">Upload Image</span>
            <input type="file" className="hidden" onChange={onChangePicture} />
          </label>
        )}
      </div>
      <div className="p-2 text-xs">
        <p>
          ( You can upload jpg, png format. It is recommended that the image is in 16:9 ratio with minimum resolution of
          1600 X 800 )
        </p>
      </div>
      {picture && (
        <div className="flex flex-row mt-5 text-xs">
          <label className="px-4 py-1 mr-5 text-white bg-green-600 rounded-md ">
            <span className="inline-block align-middle"> Replace Image</span>
            <input type="file" className="hidden" onChange={onChangePicture} />
          </label>
          <button
            type="button"
            className="px-4 py-1 mr-5 text-green-600 bg-transparent border-2 border-green-600 rounded-md hover:bg-green-400"
            onClick={removePicture}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

CoverPicUpload.propTypes = {
  onUpload: PropTypes.func,
}
export default CoverPicUpload
