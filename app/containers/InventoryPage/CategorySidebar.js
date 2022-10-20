import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import MediaQuery from 'react-responsive'
import { NavLink } from 'react-router-dom'
const CategorySidebar = ({
  categories,
  subcategories,
  setSelectedCategoryId,
  setSelectedSubCategoryId,
  selectedSubCategoryId,
  selectedCategoryId,
}) => (
  <div
    style={{
      overflow: 'auto',
      height: '110vh',
      display: selectedCategoryId !== 0 && window.screen.width < 1280 ? 'none' : '',
    }}
    className="inventoryPage-category-sidebar w-1/4 bg-white invisible-scrollbar relative"
  >
    <p className="inventoryPage-category-header mx-5 mt-8 mb-4 text-switch text-right item-label-title">Categories</p>
    <MediaQuery minDeviceWidth={1100}>
      <div className="w-full overflow-hidden tab" style={{ marginBottom: '15px' }}>
        <input
          onClick={() => {
            setSelectedCategoryId(0)
            setSelectedSubCategoryId(0)
          }}
          style={{ display: 'none' }}
          id={`tab-single-${0}`}
          type="radio"
          name="tabs2"
        />
        <label
          className="block px-5 py-2 text-right text-gray-500 font-semibold text-base cursor-pointer"
          htmlFor={`tab-single-${0}`}
        >
          {'All'}
        </label>
      </div>
    </MediaQuery>
    {categories.map((category, idx) => (
      <div
        key={category.category_id}
        className="w-full overflow-hidden tab "
        style={{ marginBottom: idx === categories.length - 1 ? '44px' : '15px' }}
      >
        <input
          onClick={() => {
            setSelectedCategoryId(category.category_id)
            const firstSubCategory = subcategories.filter(e => e.category_id === category.category_id)[0]
            setSelectedSubCategoryId((firstSubCategory && firstSubCategory.sub_category_id) || 0)
          }}
          style={{ display: 'none' }}
          id={`tab-single-${idx + 1}`}
          type="radio"
          name="tabs2"
        />
        <label
          className="inventoryPage-category lbl-switch px-5 py-2 text-right font-semibold text-gray-500 text-base cursor-pointer"
          htmlFor={`tab-single-${idx + 1}`}
        >
          {category.category_name}
          <MediaQuery maxDeviceWidth={1100}>
            <span className="text-secondary">
              <FaChevronRight />
            </span>
          </MediaQuery>
        </label>
        <MediaQuery minDeviceWidth={1100}>
          {subcategories.map(subcategory =>
            subcategory.category_id === category.category_id ? (
              <div
                key={subcategory.sub_category_id}
                onClick={() => {
                  setSelectedCategoryId(category.category_id)
                  setSelectedSubCategoryId(subcategory.sub_category_id)
                }}
                className="overflow-hidden leading-normal tab-content border-secondary "
              >
                <button
                  style={{ fontSize: '0.8125rem', marginTop: '5px', paddingRight: '0.5rem' }}
                  className={`text-right wrap-item w-3/4 outline-none focus:outline-none ${subcategory.sub_category_id === selectedSubCategoryId ? 'text-secondary font-semibold' : null
                    }`}
                >
                  {subcategory.sub_category_name}
                </button>
              </div>
            ) : null,
          )}
        </MediaQuery>

      </div>
    ))}
  </div>
)

export default CategorySidebar
