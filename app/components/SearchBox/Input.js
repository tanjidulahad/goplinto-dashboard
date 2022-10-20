import React from 'react'

const Input = ({ placeholder, queryHandler, query }) => (
    <input placeholder={placeholder} onChange={e => queryHandler(e)} />
)
export default Input
