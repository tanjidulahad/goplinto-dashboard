import React from 'react'
import { NavLink } from 'react-router-dom'

import { Menu, Dropdown } from 'antd'
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'
import { AiOutlineEllipsis } from 'react-icons/ai'

import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts'
import Spin from '../Spin'
import MediaQuery, { useMediaQuery } from 'react-responsive'

function index({
  timePeriod,
  noOptions,
  title,
  value,
  subValue,
  loading,
  clickReport,
  data,
  currentDate,
  comparativeDate,
  mode,
  currency_symbol,
  setshowGenerateReportPopup,
  setReportPopupTitle
}) {
  const isMobile = useMediaQuery({
    query: '(max-width: 991px)',
  })

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink
          className="mr-4"
          to={{
            pathname: '/app/reports/view-report',
            state: {
              currentPage: title,
              timePeriod: timePeriod,
            },
          }}
        >
          View Report
        </NavLink>
      </Menu.Item>
    </Menu>
  )

  const CustomTooltip = ({ active, payload, label }) => {
    if (
      payload[0] &&
      (payload[0].payload.currentDate != null || payload[0].payload.comparativeDate != null) &&
      active
    ) {
      return (
        <div
          className="container flex flex-col mx-auto rounded-lg  px-4 pt-2 pb-2"
          style={{ backgroundColor: '#242424' }}
        >
          {payload[0] && payload[0].payload.hasOwnProperty('currentDate') && payload[0].payload.currentDate != null && (
            <span className=" text-white font-medium " style={{ fontSize: 12 }}>{`${
              payload[0].payload.currentDate
            } -  ${payload[0].value}`}</span>
          )}

          {payload[0] &&
            payload[0].payload.hasOwnProperty('currentDate') &&
            payload[0].payload.currentDate != null &&
            payload[0] &&
            payload[0].payload.hasOwnProperty('comparativeDate') &&
            payload[0].payload.comparativeDate != null && (
              <span className=" text-white text-opacity-50  font-light mt-2" style={{ fontSize: 10 }}>
                {' '}
                Compared to
              </span>
            )}

          {payload[0] &&
            payload[0].payload.hasOwnProperty('comparativeDate') &&
            payload[0].payload.comparativeDate != null && (
              <span className="  text-white font-medium" style={{ fontSize: 12 }}>{`${
                payload[0].payload.comparativeDate
              } -   ${payload[0].payload.hasOwnProperty('comparativeOrderCount') &&
                payload[0].payload.comparativeOrderCount}`}</span>
            )}
        </div>
      )
    }

    return null
  }

  const CustomizedAxisTick = props => {
    const { x, y, payload } = props

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={15}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
          style={{
            fill: 'rgba(36, 36, 36, 0.75)',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            lineHeight: '18px',
          }}
        >
          {payload.value}
        </text>
      </g>
    )
  }

  const CustomizedYAxisTick = props => {
    const { x, y, payload } = props

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dx={-5}
          textAnchor="end"
          fill="#666"
          transform="rotate(x)"
          style={{
            fill: 'rgba(36, 36, 36, 0.75)',
            fontSize: '11px',
            fontFamily: 'Montserrat',
            lineHeight: '18px',
          }}
        >
          {payload.value}
        </text>
      </g>
    )
  }

  return (
    <div className="mb-2 pb-4">
      <div className="p-4 bg-white rounded-lg ">
        <div className="flex justify-between">
          <div className="flex items-center ">
            <label className="item-label text-sm md:text-base font-medium">{title}</label>
          </div>
          <div className='flex'>
            {!noOptions &&
              <p className='cursor-pointer mx-5' style={{ color: "#8194f8" }} onClick={() => { setReportPopupTitle('Total Orders'); setshowGenerateReportPopup(true); }}>Export Report</p>}
            {!noOptions && (
              <div>
                <NavLink
                  to={{
                    pathname: '/app/reports/view-report',
                    state: {
                      currentPage: title,
                      timePeriod: timePeriod,
                      currency_symbol:currency_symbol
                    },
                  }}
                  style={{ color: "#8194f8" }}
                >
                  View Report
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-2 mb-4 justify-between flex-wrap">
          <div className="flex flex-row">
            <h2 className="text-black-pl text-xl   mb1 font-black">{value}</h2>
            <span
              className={`flex flex-row ml-2 text-xs font-semibold mt-2 ${
                parseFloat(subValue) > 0 ? ' text-success' : 'text-danger'
              }`}
            >
              {parseFloat(subValue) > 0 ? (
                <BsArrowUp className={`text-base font-semibold text-success flex-none`} size={20} />
              ) : (
                <BsArrowDown className={`text-base font-semibold  text-danger flex-none`} size={20} />
              )}
              {parseFloat(subValue) > 0 ? subValue : parseFloat(subValue) < 0 ? subValue.substring(1) : subValue}%
            </span>
          </div>

          <div className="flex flex-row items-center text-center">
            <span className="" style={{ backgroundColor: '#F64B5D', height: 4, width: 8 }} />
            <span className=" ml-4 md:ml-2 text-xs font-normal mr-2">
              {!loading && currentDate} {'   '}
            </span>
            <span className="" style={{ backgroundColor: '#F7949E', height: 2, width: 4, marginRight: 2 }} />
            <span className="" style={{ backgroundColor: '#F7949E', height: 2, width: 4, marginRight: 8 }} />
            <span className="text-xs font-normal  "> {!loading && comparativeDate}</span>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center h-32">
            <Spin />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              width={600}
              height={300}
              data={data}
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 15,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fcc7cd" stopOpacity={1} />
                  <stop offset="90%" stopColor="#feeff0" stopOpacity={0.3} />
                  <stop offset="5%" stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                height={60}
                label={{ position: 'insideBottomLeft', offset: 0 }}
                dy={15}
                tick={<CustomizedAxisTick />}
                scale="auto"
                interval={isMobile ? 'preserveEnd' : mode == 'Last7' ? 0 : mode == 'Last30' ? 2 : 1}
              />
              <YAxis tick={CustomizedYAxisTick} allowDecimals={false} type="number" domain={[0, 'dataMax + 1']} />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="currentOrderCount"
                fill="url(#colorUv)"
                stroke="rgba(246, 75, 93, 1)"
                strokeWidth={2}
                fillOpacity={1}
              />

              <Line
                type="monotone"
                dataKey="comparativeOrderCount"
                stroke="rgba(246, 75, 93, 0.6)"
                activeDot={{ r: 4 }}
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default index
