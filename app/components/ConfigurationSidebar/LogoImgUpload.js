import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LogoImgUpload = ({ onUpload, store }) => {
  const [picture, setPicture] = useState(null)
  const onChangePicture = e => {
    setPicture(URL.createObjectURL(e.target.files[0]))
    onUpload(e.target.files[0], store.store_id)
  }
  const removePicture = () => {
    setPicture(null)
  }
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium tracking-wide text-gray-700 uppercase" htmlFor="restaurantLogo">
        {' '}
        Store Logo
      </label>
      <div className="flex flex-row h-32">
        <div>
          {picture ? (
            <div className="flex flex-col w-32 h-32">
              <img alt="restaurant logo" className="rounded-lg" src={picture && picture} />
            </div>
          ) : (
            <label className="flex flex-col items-center w-32 h-32 px-4 py-8 text-center bg-gray-300 border-2 border-dashed rounded-lg cursor-pointer border-secondary-400 text-secondary hover:text-secondary-600 hover:border-secondary-600">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-xs font-medium tracking-wide text-gray-700">Upload Image</span>
              <input type="file" className="hidden" onChange={onChangePicture} />
            </label>
          )}
        </div>

        <div className="p-6 mx-2 text-xs">
          <p>
            ( You can upload jpg, png format. It is recommended that the logo is with minimum resolution of 256 X 256 )
          </p>
        </div>
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

LogoImgUpload.propTypes = {
  onUpload: PropTypes.func,
}
export default LogoImgUpload
