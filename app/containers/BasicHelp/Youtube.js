import React from 'react'

function Youtube(props) {
  return (
    <div>
      <iframe
        width="100%"
        height="100%"
        src={props.src}
        id="youtube"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default Youtube
