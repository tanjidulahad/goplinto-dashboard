import styled from 'styled-components'

export const StyledTable = styled.table.attrs({
  className: 'w-full overflow-hidden text-black bg-white rounded-lg shadow-lg',
})`
  width: 100%;

  tr:nth-child(even) {
    background-color: rgba(242, 242, 242, 0.5);
  }

  td {
    border-right: 3px solid #fff;
  }

  td:first-child {
    width: 30%;
    text-align: right;
    font-weight: bold;
    text-transform: capitalize;
  }
`