import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro'
export const PrimarySideBarWrapper = styled.div.attrs({
  className: 'flex-none w-full bg-white overflow-hidden',
})`
  .sidebar-menu {
    border-top-left-radius: 0.5rem;
    ${tw`mt-8 font-semibold capitalize`}
    i {
      ${tw`text-lg text-center`}
    }
  }
  .sidebar-menu-mb {
    ${tw`font-semibold capitalize`}
    i {
      ${tw`text-lg text-center`}
    }
  }
  .sidebar-menu-ul {
    ${tw`font-semibold capitalize`}
    i {
      ${tw`text-lg`}
    }
  }

  .li {
    color: #242424;
    opacity: 0.8;
    text-transform: capitalize;
    font-weight: 600;
    ${tw`flex items-center text-center h-20 border-t`}
  }

  .active-dashboard {
    color: #f64b5d;
    opacity: 1;
    background-color: rgba(246, 75, 93, 0.1) !important;
    ${tw`bg-white`}
  }
`

export const StyledNavLink = styled.div`
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: #f64b5d;
    background-color: rgba(246, 75, 93, 0.1) !important;
    opacity: 1;
    ${tw`bg-white`}
  }
`
