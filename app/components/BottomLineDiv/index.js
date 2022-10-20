import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const BottomLineDiv = ({text}) => {
  return (
    <div>
          <hr />
          <div className="flex flex-row bg-white justify-start align-center px-2 py-4 tbl-rounded-bottom">
              <AiOutlineInfoCircle className="mr-2 ml-4 text-muted-med font-semibold" size={18} />
              <span className="text-xs text-muted-med font-semibold">
                  {text}
              </span>
          </div>
    </div>
  )
}

export default BottomLineDiv