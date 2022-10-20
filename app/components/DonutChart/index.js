import React from 'react'
import { Avatar, Menu, Dropdown, Tooltip } from 'antd'
import { BsArrowUp, BsThreeDots } from 'react-icons/bs'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Doughnut, Chart } from 'react-chartjs-2'
import { FcTreeStructure } from 'react-icons/fc'
import Spin from '../Spin'

function index({ title, toggleText, clickReport, point, loading }) {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => clickReport()}>Generate Report</a>
      </Menu.Item>
    </Menu>
  )

  const data = {
    labels: ['Unique', 'Returning'],
    datasets: [
      {
        label: '# of Votes',
        data: point,
        backgroundColor: ['#f64b5d', '#f7949e'],
        hoverBackgroundColor: ['#f64b5d', 'rgba(255, 99, 132, 0.4)'],
        borderColor: ['rgba(255, 99, 132, 1)', '#f7949e'],
        borderWidth: 1,
        hoverOffset: 8,
        borderAlign: 'inner',
        legend: {
          display: true,
          position: 'right',
        },
      },
    ],
    text: '45',
  }

  return (
    <div className="w-full md:w:1/3 mb-2 pb-2 w-full">
      <div className="p-4 bg-white rounded-lg ">
        <div className="flex justify-between mb-2">
          <div className="flex items-center ">
            <label className="item-label text-sm md:text-base font-medium">{title}</label>

            <Tooltip title={toggleText} arrowPointAtCenter color="#242424">
              <AiOutlineInfoCircle className="mr-2 ml-2 text-muted-light hover:text-black flex-none" size={20} />
            </Tooltip>
          </div>

          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <BsThreeDots className="mr-2 ml-2 text-muted-light hover:text-black flex-none" size={20} />
            </a>
          </Dropdown>
        </div>

        {
          loading ? (<div className="flex justify-center align-center items-center " style={{ height: 255 }}>
            <Spin />
          </div>) : (
            <Doughnut
              data={data}
              width={290}
              height={255}
              options={{
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: false,
                },
                maintainAspectRatio: true,
                responsive: true,
              }}
            />
          )}
      </div>
    </div>
  )
}

export default index
