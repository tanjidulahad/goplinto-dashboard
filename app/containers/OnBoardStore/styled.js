import styled from 'styled-components'

export const StyledTable = styled.table.attrs({
  className: 'w-full overflow-hidden text-black bg-white rounded-lg shadow-lg',
})`
  tr:nth-child(even) {
    background-color: #f3f4fa;
  }
`
