import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledCollapseWrapper = styled.div`
  .ant-collapse {
    ${tw`border-none`}
  }
  .ant-collapse-item {
    ${tw`bg-white border-none`}
  }

  .ant-collapse-item-active {
    ${tw`bg-gray-200 border-none`}
  }

  .ant-collapse-content {
    ${tw`border-none`}
  }
`

export const ConfigurationSidebar = styled.div.attrs({
  className: 'flex flex-col w-full h-full md:w-1/4 bg-white fixed md:pt-8 md:border-l-2 text-gray-900',
})`
  ${({ preview }) => preview && tw`hidden`}
`
