export default phrase => {
  if (!phrase) {
    return ''
  }
  return phrase.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
