import styled from 'styled-components'
import tw from 'twin.macro'

export const CategorySideBarWrapper = styled.div.attrs({
  className: 'flex-none w-full min-h-screen md:max-w-xs bg-white text-black-pl overflow-hidden',
})`
  .rounded-bottom-right {
    border-bottom-right-radius: 3em;
  }
  .sidebar-menu {
    ${tw`font-semibold tracking-wider uppercase`}
    i {
      ${tw`mr-4 text-lg`}
    }
  }

  .li {
    ${tw`flex items-center h-16 px-5 my-1`}
  }

  .active {
    ${tw`bg-gray-600`}
  }
`

export const StyledCollapseWrapper = styled.div`
  .ant-collapse {
    ${tw`border-none`}
  }

  .ant-collapse-header {
    ${tw`p-0 m-0 border-none`}
    padding: 0;
  }

  .ant-collapse-arrow {
    color: bg-white;
  }
  .ant-collapse-item {
    ${tw`bg-white border-none`}
  }

  .ant-collapse-item-active {
    ${tw`text-black bg-gray-500 border-none`}
  }

  .ant-collapse-content {
    ${tw`text-black bg-white border-none`}
  }

  .li {
    ${tw`font-semibold tracking-wider uppercase`}
    ${tw`flex items-center h-10 px-3 my-1`}
    i {
      ${tw`mr-4 text-lg text-black-pl`}
    }
  }
`
