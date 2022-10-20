import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import tw from 'twin.macro'
export const PrimarySideBarWrapper = styled.div.attrs({
  className: 'flex w-full md:max-w-xs ',
})`
min-height:100vh;
  .rounded-bottom-right {
    border-bottom-right-radius: 3em;
  }

  .sidebar-menu {
    ${tw`mt-12 font-semibold tracking-wider capitalize`}
    i {
      ${tw`mr-4 text-lg`}
    }
  }
  .sidebar-menu-ul {
    ${tw`font-semibold tracking-wider capitalize`}
    i {
      ${tw`mr-4 text-lg`}
    }
  }

  .li {
    color: #fafafa;
    opacity: 0.8;
    letter-spacing: 0.72;
    text-transform: capitalize;
    font-size: 0.80rem;
    font-weight: 600;
    ${tw`flex items-center h-10 px-5 my-1`}
  }

  .active {
    color: #fafafa;
    opacity: 1;
    ${tw`rounded-r-lg bg-primary-1000 border-l-4 border-secondary`}
  }
`

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &:hover {
    text-decoration: none;
    ${tw`text-white rounded-r-lg bg-primary-1000 `}
  }
`
