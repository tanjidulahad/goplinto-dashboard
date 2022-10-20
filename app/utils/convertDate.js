function convertDate(date) {
  var d = new Date(date * 1000),
    month = d.toLocaleString('default', { month: 'short' }),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('-')
}
export default convertDate
