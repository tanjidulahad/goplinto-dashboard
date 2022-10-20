import moment from 'moment'

export const getDate = timestamp => {
  var u = new Date(timestamp * 1000)
  return new Date(
    u.getFullYear() +
      '-' +
      ('0' + (u.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + u.getDate()).slice(-2) +
      ' ' +
      ('0' + u.getHours()).slice(-2) +
      ':' +
      ('0' + u.getMinutes()).slice(-2),
  )
}

export const UnixTimeStampToDate = timestamp => moment(getDate(timestamp)).format('Do MMMM YYYY, hh:mm a')
