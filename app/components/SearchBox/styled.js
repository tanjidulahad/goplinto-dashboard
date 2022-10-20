import styled from 'styled-components'
import Input from './Input'

export const StyledDiv = styled.div`
  max-width: 700px;
  width: 54%;
  height: 56px;
  border: 1px solid #2424243f;
  border-radius: 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  float: left;
  @media (max-width: 560px) {
    width: 100%;
  }
`

export const StyledInput = styled.input`
  max-width: 700px;
  width: 100%;
  /* height:56px; */
  padding: 5px;
  color: #242424bf;

  &:focus {
    outline: none;
  }
`
