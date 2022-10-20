import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import tw from 'twin.macro'

const IconComponent = styled.div`
  ${tw`
      flex
      justify-center
      items-center
  `}
  ${tw`
      w-1/3
      bg-white
      rounded-lg
      shadow-md
      cursor-pointer
      mb-8
      border-2
    `}
    ${({ active }) => active && tw`border-secondary`}
`

const RadioOption = ({ isSelected, labelFor, optionName, optionText, optionIcon, value }) => (
  <label htmlFor={labelFor} className="flex z-0 relative flex-row h-32 cursor-pointer">
    <input type="radio" name="layout" value={value} id={labelFor} className="hidden" />
    <IconComponent active={isSelected}>
      {isSelected && (
        <div className="absolute top-0 right-0 object-right-top -mt-1 -mr-1">
          <div className="align-top">
            <svg
              className="w-6 h-6"
              width="200px"
              height="200px"
              viewBox="0 0 200 200"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="checkmark-outline" fillRule="nonzero">
                  <path
                    d="M31.1442786,171.840796 C5.2779518,146.858262 -5.09578082,109.862896 4.01023318,75.0738981 C13.1162472,40.2848999 40.2848999,13.1162472 75.0738981,4.01023318 C109.862896,-5.09578082 146.858262,5.2779518 171.840796,31.1442786 C209.549474,70.1869539 209.010186,132.247241 170.628714,170.628714 C132.247241,209.010186 70.1869539,209.549474 31.1442786,171.840796 Z"
                    id="Shape"
                    fill="#F87C89"
                  />
                  <polygon
                    id="Path"
                    fill="#6F0610"
                    points="66.6666667 89.4527363 89.5522388 112.437811 132.338308 69.6517413 146.268657 83.7810945 89.5522388 140.298507 52.7363184 103.482587 66.6666667 89.3532338"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      )}{' '}
      <span className={`font-semibold text-gray-400 inline-block align-middle text-6xl fas ${optionIcon}`} />
    </IconComponent>
    <div className="w-2/3 text-xs mx-5 ">
      <div className="block text-gray-700 text-sm font-semibold mb-2 uppercase tracking-wide">{optionName}</div>
      <p>{optionText}</p>
    </div>
  </label>
)

RadioOption.propTypes = {
  isSelected: PropTypes.bool,
  labelFor: PropTypes.string,
  optionName: PropTypes.string,
  optionText: PropTypes.string,
  optionIcon: PropTypes.string,
  value: PropTypes.string,
}
export default RadioOption
