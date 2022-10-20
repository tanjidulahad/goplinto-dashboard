export default phrase => {
  if (!phrase) {
    return ''
  }
  return decodeURIComponent(phrase)
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}
