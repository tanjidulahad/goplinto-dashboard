import React from 'react'

import Backdrop from 'components/Backdrop'

const classes = {
  zIndex: '400',
  opacity: '400',
  position: 'absolute',
  top: '10%',
  left: '10%',
  maxWidth: '80%',
  minWidth: '80%',
  maxHeight: '80%',
  minHeight: '80%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function ExampleImage({ show, close, children }) {
  return show ? (
    <div>
      <Backdrop close={close} />
      <div style={classes}>{children}</div>
    </div>
  ) : null
}

export default ExampleImage
