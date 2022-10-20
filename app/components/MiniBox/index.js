import React from 'react'
import { Tooltip, Menu } from 'antd'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'

function index({ title, value, toggleText, subValue, clickReport, type, data,currency_symbol }) {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => clickReport()}>Generate Report</a>
      </Menu.Item>
    </Menu>
  )

  const renderList = () => (
    <div className="flex justify-between  mb-4 ">
      <div>
        <label className=" text-sm text-gray-800">Test</label>
      </div>
      <div>
        <label className="item-label text-sm md:text-medium font-normal">56</label>
      </div>
      <div className="flex font-semibold text-center  text-success justify-center">
        <BsArrowUp className="text-base font-semibold text-success hover:text-black flex-none" size={20} />
        <span className=" font-semibold text-gray-200 text-success">5.7%</span>
      </div>
    </div>
  )

  return (
    <div className=" mb-2">
      <div className="px-4 py-4 bg-white rounded-lg ">
        <div className="flex">
          <div className="flex items-center ">
            <label className="item-label text-sm md:text-base font-medium">{title}</label>
            <Tooltip title={toggleText} arrowPointAtCenter color="#242424">
              <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light hover:text-black flex-none" size={20} />
            </Tooltip>
          </div>
        </div>
        <div className="flex mt-4">
          <h2 className="text-black-pl text-xl   mb1 font-black">{currency_symbol+value}</h2>
          {type == 'list' && (
            <span
              className={`flex flex-row ml-2 font-semibold mt-2 ${parseFloat(subValue) > 0 ? ' text-success' : 'text-danger'
                } `}
            >
              {parseFloat(subValue) > 0 ? (
                <BsArrowUp className={`text-base font-semibold  text-success flex-none`} size={20} />
              ) : (
                <BsArrowDown className={`text-base font-semibold  text-danger flex-none`} size={20} />
              )}
              {parseFloat(subValue) > 0 ? subValue : parseFloat(subValue) < 0 ? subValue.substring(1) : subValue}%
            </span>
          )}
        </div>

        {type != 'list' && (
          <span
            className={`flex flex-row font-semibold mt-2 ${parseFloat(subValue) > 0 ? 'text-success' : 'text-danger'
              }  `}
          >
            {parseFloat(subValue) > 0 ? (
              <BsArrowUp className={`text-base font-semibold  text-success flex-none`} size={20} />
            ) : (
              <BsArrowDown className={`text-base font-semibold  text-danger flex-none`} size={20} />
            )}
            {parseFloat(subValue) > 0 ? subValue : parseFloat(subValue) < 0 ? subValue.substring(1) : subValue}
          </span>
        )}

        {type == 'list' && <div className="mt-8">{data && data.map(list => renderList(list))}</div>}
      </div>
    </div>
  )
}

export default index
