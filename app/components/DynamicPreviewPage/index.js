import React from 'react'
import PropTypes from 'prop-types'

import { DynamicPageComponent, PageHeader, HeaderContentWrapper, Logo, PageBody, ItemsSection } from './styled'

function DynamicPreviewPage(props) {
  // Render an anchor tag
  const { restaurantDetails, preview, onTogglePreview } = props
  const { restaurantName, restLogoUrl, coverImgUrl } = restaurantDetails
  return (
    <DynamicPageComponent preview={preview}>
      <PageHeader img={coverImgUrl}>
        <HeaderContentWrapper>
          {restLogoUrl && <Logo className="w-1/6 " src={restLogoUrl} />}
          <div className="flex flex-col w-5/6 ml-6">
            <h1 id="title-section">{restaurantName || 'Your Magical Store Name'}</h1>
            <h2 id="cuisine-section">Cafe, Continental, Italian, Fast Food</h2>
            {/* <!-- Other Info Section--> */}
            <div className="flex mt-5 text-white">
              <div id="star-rating">
                <i className="mr-2 fas fa-star" />
                <i className="mr-2 fas fa-star" />
                <i className="mr-2 fas fa-star" />
                <i className="mr-2 fas fa-star" />
                <i className="mr-2 text-gray-800 fas fa-star" />
              </div>
              <span className="ml-2 tracking-widest">4.0</span>
              <span className="ml-10 tracking-widest">₹ 200</span>
              <i className="p-0 mt-1 ml-4 fas fa-user-alt" />
              <span className="ml-2 text-xs text-gray-500">per person</span>
              <span className="ml-10 tracking-widest">30 mins</span>
              <i className="p-0 mt-1 ml-4 fas fa-clock" />
              <span className="ml-2 text-xs text-gray-500">delivery</span>
            </div>
            {/* <!-- Address section --> */}
            <div className="address">
              <i className="mt-1 mr-2 text-lg fas fa-map-marker-alt" />
              No. 9, 11th Cross St, Indira Nagar, Adyar, Chennai, Tamil Nadu 600020.
            </div>
          </div>
        </HeaderContentWrapper>
      </PageHeader>
      <PageBody preview={preview}>
        {/* <!--Categories Column--> */}
        <div className="w-1/5 pr-6 my-5 text-right border-r-2">
          <h3>Categories</h3>
          <ul className="mt-8">
            <li className="active">Soups</li>
            <li>Starters</li>
            <li>Main Course</li>
            <li>Indian</li>
            <li>Biriyani</li>
            <li>Pizza</li>
            <li>Juices</li>
            <li>Desserts</li>
          </ul>
        </div>
        {/* <!--Items Column--> */}
        <div className="w-3/5 mt-3">
          {/* <!--Column Header--> */}
          <div className="flex justify-between h-10 mx-5 mb-6">
            <div className="flex my-auto uppercase">
              <h2 className="text-2xl font-bold tracking-wide">Soups</h2>
              <span className="inline-block my-auto ml-8 text-xs text-gray-600 align-bottom">( 14 items )</span>
            </div>
            <div className="flex justify-end pt-3 mb-auto text-xs font-semibold tracking-wide">
              <div className="my-auto ml-3">Non-Veg Only </div>
              <div className="w-10 h-5 mx-3 my-auto bg-gray-500 rounded-lg shadow-inner cursor-pointer toggle-button">
                <div className="flex items-center justify-center w-4 h-3 mx-1 mt-1 bg-white rounded-full shadow-lg ">
                  &nbsp;
                </div>
              </div>
              <div className="my-auto ml-3">Veg Only </div>
              <div className="w-10 h-5 mx-3 my-auto bg-gray-500 rounded-lg shadow-inner cursor-pointer toggle-button">
                <div className="flex items-center justify-center w-4 h-3 mx-1 mt-1 bg-white rounded-full shadow-lg ">
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
          {/* <!--Item listing Section--> */}
          <ItemsSection>
            {[...Array(6)].map((e, i) => (
              <div className="w-full px-4 py-3 overflow-hidden border-r" key={i}>
                <div className="item-card">
                  <h1 className="mb-1 text-sm font-bold">
                    <span className="mr-2 text-xs text-green-800 vegetarianicon">⊡</span> Aloo Patty - {i}
                  </h1>
                  <div className="flex items-center justify-between item-content">
                    <p className="text-xs font-light text-gray-700">
                      The traditional aloo patty seasoned with special herbs and spices with your choice of crisp fresh
                      veggies, on freshly baked bread.
                    </p>
                    <input
                      type="button"
                      value="Add"
                      className="w-1/3 mx-auto my-auto shadow cursor-pointer add-button"
                    />
                  </div>
                  <div className="flex justify-between my-5 item-price">
                    <div className="my-auto text-sm font-medium">₹ 180</div>
                    <input type="button" value="Add" className="my-auto shadow cursor-pointer add-button" />
                  </div>
                </div>
              </div>
            ))}
          </ItemsSection>
        </div>
        {/* <!--Cart Column--> */}
        <div className="flex flex-col w-1/5 pt-4 mx-5 align-center">
          <div className="flex justify-between py-2 border-b-2">
            <h3>My Cart</h3>
            <div className="my-auto text-xs font-light tracking-tighter text-primary">Clear Cart</div>
          </div>
          <div className="flex justify-between py-4 text-xs border-b-2 border-gray-600 border-dashed">
            <h1 className="inline-block my-auto mb-1 font-bold align-middle">
              <span className="mr-2 text-green-800 vegetarianicon">⊡</span> Aloo Patty
            </h1>
            <div className="my-auto font-medium">₹ 180</div>
          </div>
          <div className="flex justify-between pt-2 my-4">
            <h1 className="mb-1 text-sm font-bold">Item Total</h1>
            <div className="text-xs font-light tracking-tighter text-gray-600">2 Item(s)</div>
            <div className="my-auto text-sm font-medium">₹ 360.00</div>
          </div>
          <div className="flex flex-col justify-center w-full h-8 mx-auto my-2 text-xs font-medium tracking-wide text-center text-white rounded shadow-md cursor-pointer bg-primary">
            <span className="inline-block align-middle">Send Order to Kitchen</span>
          </div>
          <div className="flex flex-col justify-center w-full h-8 mx-auto my-2 text-xs font-medium tracking-wide text-center border-2 rounded cursor-pointer text-primary border-primary">
            <span className="inline-block align-middle">Complete Order &amp; Pay </span>
          </div>
          <button type="button" className="fixed bottom-0 preview-button" onClick={onTogglePreview}>
            <i className={`preview-icon text-primary fa fa-${preview ? 'compress' : 'expand'}-arrows-alt`} />
            <span className="inline-block text-lg align-middle">{preview ? 'Go Back' : 'Preview'}</span>
          </button>
        </div>
      </PageBody>
    </DynamicPageComponent>
  )
}

DynamicPreviewPage.propTypes = {
  restaurantDetails: PropTypes.object,
  preview: PropTypes.bool,
  onTogglePreview: PropTypes.func,
}

export default DynamicPreviewPage
