import styled from 'styled-components'
import tw from 'twin.macro'

export const DynamicPageComponent = styled.div`
  ${tw`left-0 top-0`}
  ${({ preview }) => (preview ? tw`absolute w-full` : tw`fixed w-3/4`)}
`
export const PageHeader = styled.div.attrs({
  className: 'flex',
})`
  width: 100%;
  height: 30vh;
  background-image: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 40% 50%;
  background-origin: padding-box;
  opacity: 0.9;
  h1 {
    ${tw`text-white font-semibold text-2xl tracking-wider`}
  }
  h2 {
    ${tw`text-gray-200 font-medium tracking-widest mt-2`}
  }
  .address {
    ${tw`text-white tracking-wider mt-6`}
  }
`

export const HeaderContentWrapper = styled.div.attrs({ className: 'flex my-auto ml-auto w-4/5' })``

export const Logo = styled.img`
  width: 140px;
  height: 140px;
  ${tw`rounded-lg`}
`

export const PageBody = styled.div.attrs({
  className: 'flex flex-row h-full',
})`
  h3 {
    ${tw` uppercase text-sm font-bold tracking-wider`}
  }
  li {
    ${tw`
        uppercase text-sm 
        font-medium mb-5 
        tracking-tight cursor-pointer
    `}
  }
 .active {
    ${tw` font-bold tracking-wide`}
    color: ${props => props.theme.primary_color};

  }
  .active::after {
    content: "."; 
    background-color:  ${props => props.theme.primary_color};
    color: ${props => props.theme.primary_color};
    ${tw`relative z-10 text-xl`}
    left : 1.7rem;
  }

  .add-button{
    background-color:  ${props => props.theme.primary_color};
    ${tw`px-3 py-1 text-white rounded text-xs font-medium uppercase tracking-wide w-20`}
  }

  .text-primary{
    color: ${props => props.theme.primary_color};
  }
  .bg-primary {
    background-color:  ${props => props.theme.primary_color};
  }
  .border-primary{
    border-color :  ${props => props.theme.primary_color};
  }

  .preview-button{
    ${tw`
    h-12 w-48 px-4 mb-10
    text-base font-semibold tracking-wider
    text-gray-900 bg-white hover:bg-gray-100 
    border-2 rounded-full shadow-lg 
    focus:outline-none
    cursor-pointer 
    `}
     /* ${({ preview }) => !preview && tw`mb-16`} */
  }

  .preview-button .preview-icon {
    ${tw`
    inline-block align-middle mr-4 text-2xl
    `}
  }
`

export const ItemsSection = styled.div`
  ${tw`grid`}
    ${({ theme: { layout } }) => (layout === 'grid' ? tw`grid-cols-2` : tw`grid-cols-1 px-5 mx-1`)}
    ${tw`grid-flow-row`}
    
    .item-card {
      ${({ theme: { layout } }) => (layout === 'list' ? tw`border-b-2` : '')}
    }
    
    .item-content p {
      ${({ theme: { layout } }) => (layout === 'grid' ? tw`w-full` : tw`w-2/3`)}
    
    }

  .item-content input{
    ${({ theme: { layout } }) => layout === 'grid' && tw`hidden`}
  }

    .item-price  input{
    ${({ theme: { layout } }) => layout === 'list' && tw`hidden`}
  }
`


export const GridResponsive = styled.div`
  ${tw`grid`}
    ${({ layout }) => (!layout ? tw`grid-cols-2 gap-12 ` : tw`grid-cols-1`)}
    ${tw`grid-flow-row`}
  
`



