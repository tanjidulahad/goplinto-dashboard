import React, { useRef, useState } from 'react'
import trash from '../../images/icons/trash-2.svg'

const GridImageUpload = ({ setCountAdd, countAdd }) => {
  const inputImage = useRef(0)
  const [img, setImg] = useState(null)
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
    <div className="mr-4 my-5">
      {img ? (
        <div className="w-56" style={{ width: '224px' }}>
          <img
            style={{
              width: '224px',
              maxWidth: '224px',
              height: '224px',
              maxHeight: '224px',
            }}
            src={URL.createObjectURL(img)}
            alt="Goplinto"
          />
          <button
            type="button"
            className="flex text-secondary font-semibold text-xs"
            onClick={e => {
              e.preventDefault()
              const removeToCount = countAdd.filter(item => item != img)
              setCountAdd(removeToCount)
              setImg(null)
            }}
            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            <img src={trash} height={18} width={18} alt="Remove Image" />
            <span className="mt-1 ml-2">Remove Image</span>
          </button>
        </div>
      ) : (
        <label className="w-64 flex flex-col items-center px-4 py-8 text-center bg-gray-300 border-2 border-dashed rounded-lg cursor-pointer border-secondary-400 text-secondary hover:text-secondary-600 hover:border-secondary-600">
          <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="text-gray-600 text-base">Upload Image</span>
          <span className="text-gray-600 text-xs">(Recommended Size 780 x 350)</span>
          <input
            type="file"
            className="hidden"
            accept=".jpeg, .jpg, .png"
            ref={inputImage}
            onChange={e => {
              if (checkSize('inputImage')) {
                setImg(e.target.files[0])
                const addToCount = [...countAdd, e.target.files[0]]
                setCountAdd(addToCount)
              }
            }}
          />
        </label>
      )}
    </div>
  )
}

export default GridImageUpload
