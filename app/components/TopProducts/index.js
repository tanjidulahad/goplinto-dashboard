import React from 'react'
import { Avatar, Menu } from 'antd'
import { useMediaQuery } from 'react-responsive'

const IMG_PLACEHOLDER = 'https://dsa0i94r8ef09.cloudfront.net/general/Img+Placeholder.png'

function index({ title, data, setReportPopupTitle, setshowGenerateReportPopup, storeCurrency}) {
  const isTablet=useMediaQuery({minWidth:500});
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => clickReport()}>Generate Report</a>
      </Menu.Item>
    </Menu>
  )

  const renderList = (list, i) => {
    const { item_name, item_img_url, unit_price, total_quantity_ordered, total_sales, total_cart_adds,total_item_views } = list
    return (
      <tr
        className={`h-24 pt-8  ${i != 2 ? 'border-b-2 border-gray-50' : ' '}   text-center`}
        style={{ paddingBottom: '1rem' }}
      >
        <td className="text-left">
          <div className="flex flex-row">
            <Avatar
              size={64}
              shape="square"
              src={
                item_img_url && item_img_url != undefined && typeof item_img_url == 'string'
                  ? item_img_url
                  : IMG_PLACEHOLDER
              }
            />
            <div className="ml-4 flex justify-center items-center">
              <h4 className="text-xs md:text-sm font-bold md:font-medium">{item_name}</h4>
            </div>
          </div>
        </td>
        <td>
          <label className="item-label text-sm md:text-medium font-normal">{total_item_views}</label>
        </td>
        <td>
          <label className="item-label text-sm md:text-medium font-normal">{total_cart_adds}</label>
        </td>
        <td>
          <label className="item-label text-sm md:text-medium font-normal">{total_quantity_ordered}</label>
        </td>
        <td className=" font-semibold  text-center">
          <div className="flex flex-row justify-center">
            <span className={`font-semibold text-gray-700 `}>{storeCurrency} {total_sales}</span>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className=" w-full mb-2 pb-4">
      <div className="p-4 bg-white rounded-lg overflow-auto h-295">
        <div className="flex justify-between">
            <label className="item-label text-sm md:text-base font-medium">{title}</label>
          <p className='cursor-pointer mx-5' style={{ color: "#8194f8" }} onClick={() => { setReportPopupTitle('Item Sales'); setshowGenerateReportPopup(true); }}>Export Report</p>
        </div>

        <div className="mt-4">
          <table className="w-full min-w-450">
            <thead className="mb-2">
              <th className="text-muted-med text-sm font-normal text-left top-products-itemName">
                Items
              </th>
              <th className="text-muted-med text-sm font-normal">Views</th>
              <th className="text-muted-med text-sm font-normal">Added to cart</th>
              <th className="text-muted-med text-sm font-normal">Units Sold</th>
              <th className="text-muted-med text-sm font-normal">Revenue</th>
            </thead>
            <tbody className="overflow-hidden">{data && data.map((list, i) => renderList(list, i))}</tbody>
          </table>
          {data.length == 0 && (
            <div className="flex justify-center items-center h-12 ">
              <span>No Records</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default index
