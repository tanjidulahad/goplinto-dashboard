import styled from 'styled-components'
import tw from 'twin.macro'

const FormPage = styled.form.attrs({
  className: 'text-gray-100',
})`
  .form-input {
    ${tw`border border-gray-500`}
    color: #0d0d0d;
  }
`

export default FormPage
