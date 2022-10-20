import React from 'react'

const backdrop_style = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  opacity: '1',
  zIndex: '200',
  position: 'absolute',
  height: '100vh',
  width: '100vw',
  left: '0',
  top: '0',
}

const closeIcon_style = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  height: '50px',
  width: '50px',
  color: 'white',
  cursor: 'pointer',
}

function Backdrop({ close }) {
  return (
    <div className="flex justify-center items-center" style={backdrop_style}>
      <div style={closeIcon_style}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={close}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  )
}

export default Backdrop
