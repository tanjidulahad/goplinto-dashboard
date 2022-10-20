import React, { useState } from 'react'

import FootlessModal from 'components/OrderModal'
import Form from 'containers/HomePage/Form'
import ImageUpload from 'components/ImageUpload'

import { resetEditCategoryImage } from 'containers/InventoryPage/actions'
import { connect } from 'react-redux'

const EditCategoryModal = ({
  setEditableCategory,
  setShowEditCategoryModal,
  editableCategory,
  handleCategoryTextChange,
  deleteCategoryFromDb,
  editCategoryName,
  items,
  storeId,
  merchantId,
  uploadEditCategoryImage,
  editCategoryImageUrl,
  resetImage,
  editSubCategoryName,
  deleteSubCategoryFromDb,
  refreshCategoryList,
}) => {
  const [picture, setPicture] = useState(editableCategory.imgUrl || '')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false)

  return (
    <FootlessModal
      title="edit category"
      closeModal={() => {
        setShowEditCategoryModal(false)
        setEditableCategory({})
        resetImage()
      }}
      editCategory
    >
      <Form className="p-6 bg-white">
        <p className="font-semibold item-label">
          Category Image <span className="text-xs text-muted-light font-semibold">(optional)</span>
        </p>
        <div className=" my-4">
          <ImageUpload
            picture={picture}
            remove={() => {
              setPicture('')
              resetImage()
            }}
            setPicture={setPicture}
            onItemImageUpload={uploadEditCategoryImage}
            storeId={storeId}
            merchantId={merchantId}
          />
          <p className="px-2 mb-4 sm:mt-4 text-muted-light font-semibold text-xs">
            ( You can upload jpg, png format of size 1MB or less with a minimum resolution of 5x12x512 )
          </p>
        </div>
        <div>
          <div className="flex justify-between mt-5">
            <p className="mb-2 item-label">Category Name</p>
            <div className="mb-2">
              <button
                onClick={e => {
                  e.preventDefault()
                  setShowCategoryDropdown(prev => !prev)
                }}
                className="text-base font-semibold text-black"
              >
                ...
              </button>

              {showCategoryDropdown && (
                <button
                  className="fixed top-0 bottom-0 left-0 right-0 w-full h-full cursor-default"
                  onClick={e => {
                    e.preventDefault()
                    setShowCategoryDropdown(false)
                  }}
                />
              )}
              {showCategoryDropdown && (
                <div className="absolute right-0 mt-1 border border-gray-500 rounded-lg shadow-xl">
                  <button
                    onClick={e => {
                      e.preventDefault()
                      if (items.length === 0) {
                        deleteCategoryFromDb(storeId, editableCategory.id, merchantId)
                        setEditableCategory({})
                        setShowEditCategoryModal(false)
                        refreshCategoryList()
                      }
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                    className={`block w-full px-4 py-2 text-gray-600 bg-white rounded-lg hover:text-secondary hover:bg-gray-300 ${items.length >
                      0 && 'cursor-not-allowed'}`}
                  >
                    Delete Category
                  </button>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            className="w-full form-input"
            name="name"
            value={editableCategory.name}
            onChange={handleCategoryTextChange}
            style={{opacity:"1"}}
          />
        </div>
        {editableCategory.subcategoryId && (
          <div>
            <div className="flex justify-between mt-5">
              <p className="mb-2 item-label"> Subcategory Name</p>
              <div className="mb-2">
                <button
                  onClick={e => {
                    e.preventDefault()
                    setShowSubcategoryDropdown(prev => !prev)
                  }}
                  className="text-base font-semibold text-black"
                >
                  ...
                </button>
                {showSubcategoryDropdown && (
                  <button
                    className="fixed top-0 bottom-0 left-0 right-0 w-full h-full cursor-default"
                    onClick={e => {
                      e.preventDefault()
                      setShowSubcategoryDropdown(false)
                    }}
                  />
                )}
                {showSubcategoryDropdown && (
                  <div className="absolute right-0 mt-1 border border-gray-500 rounded-lg shadow-xl">
                    <button
                      onClick={e => {
                        e.preventDefault()
                        if (items.length === 0) {
                          deleteSubCategoryFromDb(storeId, merchantId, editableCategory.subcategoryId)
                          setEditableCategory({})
                          setShowEditCategoryModal(false)
                          refreshCategoryList()
                        }
                      }}
                      style={{ whiteSpace: 'nowrap' }}
                      className={`block w-full px-4 py-2 text-gray-600 bg-white rounded-lg hover:text-secondary hover:bg-gray-300 ${items.length !==
                        0 && 'cursor-not-allowed'}`}
                      disabled={items.length > 0}
                    >
                      Delete Subcategory
                    </button>
                  </div>
                )}
              </div>
            </div>
            <input
              type="text"
              className="w-full text-black form-input"
              name="subcategoryName"
              value={editableCategory.subcategoryName}
              onChange={handleCategoryTextChange}
              style={{opacity:"1"}}
            />
          </div>
        )}
      </Form>
      {/* Custom Footer */}
      <div className="bg-white px-6 flex flex-row-reverse py-4 border-t border-gray-300 rounded-b-1g">
        <button
          className="cta-btn"
          type="button"
          onClick={() => {
            editCategoryName(storeId, merchantId, editableCategory.id, editableCategory.name, editCategoryImageUrl)
            if (editableCategory.subcategoryId) {
              editSubCategoryName(storeId, merchantId, editableCategory.subcategoryId, editableCategory.subcategoryName)
            }
            setEditableCategory({})
            setShowEditCategoryModal(false)
            refreshCategoryList(editableCategory.name, editableCategory.subcategoryName)
          }}
          style={{ transition: 'all .15s ease' }}
        >
          Save Changes
        </button>
      </div>
    </FootlessModal>
  )
}

const mapDispatchToProps = dispatch => ({
  resetImage: () => dispatch(resetEditCategoryImage()),
})
export default connect(
  null,
  mapDispatchToProps,
)(EditCategoryModal)
