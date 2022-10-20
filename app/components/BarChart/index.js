import React from 'react'
import { Menu, Dropdown } from 'antd'
import { NavLink } from 'react-router-dom'

import { AiOutlineEllipsis } from 'react-icons/ai'
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import Spin from '../Spin'

function index({ timePeriod, noOptions, title, value, subValue, loading, data, currentDate, comparativeDate, currency_symbol, setshowGenerateReportPopup, setReportPopupTitle}) {
  const [focusBar, setFocusBar] = React.useState(null)

  const CustomTooltip = ({ active, payload, label }) => {
    if (
      payload[0] &&
      (payload[0].payload.currentDate != null || payload[0].payload.comparativeDate != null) &&
      active
    ) {
      return (
        <div className="container flex flex-col rounded-lg  px-4 pt-2 pb-2" style={{ backgroundColor: '#242424' }}>
          {payload[0] && payload[0].payload.hasOwnProperty('currentDate') && payload[0].payload.currentDate != null && (
            <span className=" text-white font-medium " style={{ fontSize: 12 }}>{`${
              payload[0].payload.currentDate
              } - ${currency_symbol+payload[0].value}`}</span>
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
              <span className="flex-1 text-white font-medium" style={{ fontSize: 12 }}>{`${
                payload[0].payload.comparativeDate
              } -   ${currency_symbol+payload[0].payload.hasOwnProperty('comparativeSales') &&
                payload[0].payload.comparativeSales}`}</span>
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
          dy={10}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
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
    <div className="md:w:2/3 w-full mb-2 pb-4">
      <div className="p-4 bg-white rounded-lg ">
        <div className="flex justify-between">
            <label className="item-label text-sm md:text-base font-medium">{title}</label>
         <div className='flex'>
            {!noOptions && 
            <p className='cursor-pointer mx-5' style={{ color: "#8194f8" }} onClick={() => { setReportPopupTitle('Total Sales'); setshowGenerateReportPopup(true); } }>Export Report</p>}
          {!noOptions && (
            <div>
              <NavLink
                  to={{
                    pathname: '/app/reports/view-report',
                    state: {
                      currentPage: title,
                      timePeriod: timePeriod,
                      currency_symbol: currency_symbol,
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
            <h2 className="text-black-pl text-xl   mb1 font-black">{currency_symbol+value}</h2>
            <span
              className={`flex flex-row ml-2 text-xs font-semibold mt-2 ${
                parseFloat(subValue) > 0 ? ' text-success' : 'text-danger'
              }`}
            >
              {parseFloat(subValue) > 0 ? (
                <BsArrowUp className={`text-base font-semibold  text-success flex-none`} size={20} />
              ) : (
                <BsArrowDown className={`text-base font-semibold  text-danger flex-none`} size={20} />
              )}
              {parseFloat(subValue) > 0 ? subValue : parseFloat(subValue) < 0 ? subValue.substring(1) : subValue}%
            </span>
          </div>

          <div className="flex flex-row  items-center text-center">
            <span className="" style={{ backgroundColor: '#F64B5D', height: 12, width: 12 }} />
            <span className=" ml-2 text-xs font-normal mr-4  ">
              {!loading && currentDate} {'   '}
            </span>
            <span className="mr-2" style={{ backgroundColor: '#F7949E', height: 12, width: 12 }} />
            <span className="text-xs font-normal  "> {!loading && comparativeDate}</span>
          </div>
        </div>
        <span className={`flex  ml-2 text-xs font-normal mt-4 mb-4 `}>Sales Over Time</span>

        {loading ? (
          <div className="flex justify-center h-32">
            <Spin />
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height={300}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 15,
            }}
          >
            <BarChart
              width={600}
              height={500}
              data={data}
              margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
              onMouseMove={state => {
                if (state.isTooltipActive) {
                  setFocusBar(state.activeTooltipIndex)
                } else {
                  setFocusBar(null)
                }
              }}
            >
              {' '}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{ position: 'insideBottomLeft', offset: 0 }}
                scale="auto"
                dy={15}
                height={60}
                tick={<CustomizedAxisTick />}
                minTickGap={10}
                tickSize={4}
                dx={20}
                interval={'preserveEnd'}
                type="category"
              />
              <YAxis tick={<CustomizedYAxisTick />} type="number" domain={[0, 'dataMax + 200']} allowDecimals={false} />
              <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
              <Bar dataKey="currentSales" fill="#F64B5D" barSize={7} strokeWidth={10} radius={[10, 10, 0, 0]}>
                {data &&
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={focusBar === index ? '#CF2638' : '#F64B5D'} />
                  ))}
              </Bar>
              <Bar
                dataKey="comparativeSales"
                fill="#F7949E"
                strokeWidth={5}
                fillOpacity={0.8}
                barSize={7}
                radius={[10, 10, 0, 0]}
              >
                {data &&
                  data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={focusBar === index ? '#DE7D87' : '#F7949E'} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default index
