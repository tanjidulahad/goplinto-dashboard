export const validateEmail = email => {
  const re = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/
  return re.test(String(email).toLowerCase())
}

export const validatePhone = phone => phone.match('^[0-9]*$') && phone.length === 10

export const validateOnlyAlphabets = string => {return (/^[A-Za-z\s]*$/).test(string)}
export const validateOnlyNumber = string => { return (/^[0-9]*$/).test(string) }
export const validateContainOnlyWhitespace = string => { return !((/^(?!\s+$).*/).test(string))}
export const validateContainOnlySpecialChar = string => { return ((/^[a-zA-Z0-9_@.-]$/).test(string)) }
export const validateAlphaNumeric = string => { return ((/^[a-zA-Z0-9,\s_-]*$/).test(string)) }
export const removeDuplicate = list => {
  let filteredArray

  filteredArray = list.filter(function(value, index) {
    return list.indexOf(value) == index
  })

  return filteredArray
}

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

export const numberInputValidation = evt => (evt.key === 'e' || evt.key === 'E' || evt.key === '-' || evt.key === '.' || evt.key === '+'|| evt.key === ' ') && evt.preventDefault()
export const convertToFLUpperCase = str => {
  const result = []
  const split = str.split(' ')
  split.forEach(element => {
    const convertedText = `${capitalizeFirstLetter(element.toLowerCase())} `
    result.push(convertedText)
  })
  return result.join('')
}

export const validatePinCode = pin => {
  const zipCodePattern = /^[1-9][0-9]{5}$/
  return zipCodePattern.test(pin)
}
export const validateIFSCCode = code => {
  const IFSCCodePattern = /^[A-Z]{4}0[A-Z0-9]{6}$/
  return IFSCCodePattern.test(code)
}

export const validateColorHexCode = hexCode => {
  const colorHexCodePattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  return colorHexCodePattern.test(hexCode)
}

export const validateURL = url => {
  const urlPattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  return url ? urlPattern.test(url) : false
}