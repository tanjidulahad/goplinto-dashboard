import React, { useState } from 'react'
import Modal from 'components/Modal'
import { resetNewCategory, resetNewCategoryImage } from 'containers/InventoryPage/actions'
import { connect } from 'react-redux'

const CreateTax = ({ onClose, onSubmit }) => {
  const [formInput, setFormInput] = useState({
    taxName: '',
    taxPercentage: '',
    taxDesc: '',
  })

  const onInputChangeHandler = e => {
    const { value } = e.target
    return setFormInput({ ...formInput, [e.target.name]: value })
  }
  const [errors, showErrors] = useState({
    taxName: false,
    taxPercentage: false,
    taxDesc: false,
  })
  return (
    <Modal
      closeModal={onClose}
      title="New Tax"
      onCreateAttribute={() => {
        showErrors({
          taxName: false,
          taxPercentage: false,
        })
        if (!formInput.taxName) showErrors(prev => ({ ...prev, taxName: true }))
        if (!formInput.taxPercentage) showErrors(prev => ({ ...prev, taxPercentage: true }))
        if (!formInput.taxName || !formInput.taxPercentage) return;
        onSubmit(formInput)
      }}
    >
      <div className="container">
        <div className="inline-block w-full px-2 py-2 mb-4">
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="">
              <p className="mb-2 font-semibold item-label">Tax Name *</p>
              <input
                type="text"
                className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                value={formInput.taxName}
                onChange={onInputChangeHandler}
                name="taxName"
                placeholder="Enter Tax Name"
              />
              {errors.taxName && (
                <span className="my-2 text-sm font-semibold text-secondary">Tax Name is mandatory</span>
              )}
            </div>
            <div className="">
              <p className="mb-2 font-semibold item-label">Tax Rate *</p>
              <input
                type="number"
                className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
                value={formInput.taxPercentage}
                onChange={onInputChangeHandler}
                onKeyDown={e=>(e.key==="e"||e.key==="E"||e.key==="+"||e.key==="-")&&e.preventDefault()}
                name="taxPercentage"
                placeholder="Enter Tax in Percentage"
              />
              {errors.taxPercentage && (
                <span className="my-2 text-sm font-semibold text-secondary">Tax Rate is mandatory</span>
              )}
            </div>
          </div>
          <div>
            <p className="mb-2 font-semibold item-label">
              Tax Description <small className="text-muted-light text-xs mt-1">( upto 200 chars )</small>
            </p>
            <textarea
              value={formInput.taxDesc}
              name="taxDesc"
              onChange={onInputChangeHandler}
              className="w-full px-2 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-secondary"
              placeholder="Enter Tax Description"
              maxLength="200"
              rows="3"
            />
          </div>
        </div>
      </div>
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
)(CreateTax)
