import React, { useState } from 'react'
import PropTypes from 'prop-types'

const initialFormState = {
  primaryColor: '',
}

export default function ColorSchemeSection({ onSubmitColor, primaryColor }) {
  const [formState, updateFormState] = useState(initialFormState)
  function onChange(e) {
    e.persist()
    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }))
  }
  function onSubmitForm(evt) {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault()
    onSubmitColor(formState)
  }
  return (
    <div className="px-3 py-1 overflow-hidden leading-normal text-left">
      <div className="flex flex-col mb-4">
        <label
          className="block mb-2 text-xs font-medium tracking-wide text-gray-700 uppercase"
          htmlFor="restaurantName"
        >
          Enter Hex Value
        </label>
        <form className="flex" action="" onSubmit={onSubmitForm}>
          <input
            className="flex-1 w-full h-12 px-3 py-2 text-sm font-medium leading-tight tracking-wide text-gray-700 border rounded appearance-none shadow-sm focus:outline-none focus:shadow-outline"
            id="color_input"
            name="primaryColor"
            type="text"
            placeholder="#ff0000"
            onChange={onChange}
            value={primaryColor}
          />
          <div className="flex justify-center flex-1 mt-2">
            <button
              type="submit"
              className="h-8 px-2 text-xs text-white bg-secondary-500 hover:bg-secondary-700 rounded-md"
            >
              {' '}
              Apply Color
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

ColorSchemeSection.propTypes = {
  primaryColor: PropTypes.string,
  onSubmitColor: PropTypes.func,
}
