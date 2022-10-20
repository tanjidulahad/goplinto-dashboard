export const buildConfigData = pageState =>
  Object.keys(pageState).reduce((acc, ele) => {
    acc[lookup[ele]] = ele !== 'theme' ? pageState[ele].toString() : pageState[ele].primary_color
    return acc
  }, {})

const lookup = {
  preview: 'REACT_APP_IS_PREVIEW',
  resName: 'REACT_APP_RESTAURANT_GROUP_NAME',
  restLogoUrl: 'REACT_APP_LOGO_IMG_URL',
  coverImgUrl: 'REACT_APP_BANNER_IMG_URL',
  theme: 'REACT_APP_THEME_COLOR',
  layout: 'REACT_APP_LAYOUT',
}
