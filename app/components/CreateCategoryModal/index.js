import React, { useState } from 'react'

import Modal from 'components/Modal'
import Form from 'containers/HomePage/Form'
import ImageUpload from 'components/ImageUpload'
import { resetNewCategory, resetNewCategoryImage } from 'containers/InventoryPage/actions'
import { connect } from 'react-redux'

const CreateCategoryModal = ({
  setNewCategoryName,
  setShowCreateCategoryModal,
  submitCategory,
  storeId,
  merchantId,
  newCategoryName,
  categoryImageUpload,
  imgUrl,
  reset,
  removeImage,
}) => {
  const [picture, setPicture] = useState('')
  return (
    <Modal
      closeModal={() => {
        setNewCategoryName('')
        setShowCreateCategoryModal(false)
        reset()
      }}
      title="New Category"
      onCreateAttribute={() => {
        submitCategory(storeId, merchantId, newCategoryName, imgUrl)
        setShowCreateCategoryModal(false)
        setNewCategoryName('')
        reset()
      }}
    >
      <Form className="st-form" style={{ padding: '0.5rem' }}>
        <p className="text-base item-label">
          Category Image <span className="text-xs font-semibold text-muted-light">(Optional)</span>
          <br />
          <small className="text-muted-med font-semibold text-sm">
            You can upload jpg, png format. min. resolution 256x256
          </small>
        </p>

        <div className="flex my-4">
          <ImageUpload
            picture={picture}
            remove={() => {
              setPicture('')
              removeImage()
            }}
            setPicture={setPicture}
            onItemImageUpload={categoryImageUpload}
            storeId={storeId}
            merchantId={merchantId}
          />
        </div>
        <p className="text-base item-label">Category Name</p>
        <input
          className="w-full form-input"
          type="text"
          placeholder="Enter Category Name"
          value={newCategoryName}
          onChange={e => setNewCategoryName(e.target.value)}
        />
      </Form>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(resetNewCategory()),
  removeImage: () => dispatch(resetNewCategoryImage()),
})

export default connect(
  null,
  mapDispatchToProps,
)(CreateCategoryModal)
