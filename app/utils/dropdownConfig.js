import React from 'react'
import { components } from 'react-select'
import { FaCaretDown } from 'react-icons/fa'

export const customSelect = {
  control: (base, state) => ({
    ...base,
    border: 0,
    backgroundColor: "transparent",
    borderRadius: "0.5rem",
    // This line disable the blue border
    boxShadow: state.menuIsOpen ? "0 0 0 1px #F64B5D" : 0,
    "&:hover": {
      border: state.isFocused ? null : null
    }
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = "red";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? "#F64B5D"
          : isFocused
            ? "rgb(246,75,93,0.15)"
            : null,
      color
        : isSelected
          ? "white"
          : null,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? "#F64B5D" : "#F64B5D"),
        color:
          !isDisabled && (isSelected ? "white" : "white"),
      },
    };
  },
}


export const customInputSelect = {
  control: (base, state) => ({
    ...base,
    border: 0,
    height: 38,
    backgroundColor: "transparent",
    borderRadius: "0.5rem",
    fontWeight: 300,
    // This line disable the blue border
    boxShadow: state.menuIsOpen ? "0 0 0 1px #F64B5D" : 0,
    "&:hover": {
      borderColor: "F64B5D",
    }
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = "red";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? '#000'
        : isSelected
          ? "#fff"
          : isFocused
            ? "rgb(36,36,36,0.05)"
            : null,
      fontSize: 13,
      fontFamily: 'Montserrat',
      color
        : isSelected
          ? "rgb(36,36,36,1)"
          : "rgb(36,36,36,0.70)",
      cursor: isDisabled ? 'not-allowed' : 'default',
      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? "#F64B5D" : "#F64B5D"),
        color:
          !isDisabled && (isSelected ? "white" : "white"),
      },
    };
  },
}


export const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <FaCaretDown />
  </components.DropdownIndicator>
)
