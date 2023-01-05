import moment from 'moment'

export function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600)
  var mins = ~~((duration % 3600) / 60)
  var secs = ~~duration % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = ''

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}

export function checkLastNameIsEmpty(lastName, firstName) {
  const lastNameIsEmpty = lastName === ' ' || !lastName
  const name = lastNameIsEmpty ? `${firstName}` : `${lastName.charAt(0)}.${firstName}`
  return name
}

export function formatDate(date) {
  return moment(date).format('GGGG / MM / DD')
}

export function emailValidation(value) {
  return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@\\"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
    value
  )
}

export function priceT(number) {
  if (!number) {
    return '0'
  }
  return Number(number)
    .toFixed()
    .replace(/./g, (c, i, a) => {
      const sep = ','
      return i && c !== '.' && (a.length - i) % 3 === 0 ? sep + c : c
    })
}

export function numberMask(number) {
  if (!number) {
    return '0'
  }
  return Number(number)
    .toFixed()
    .replace(/./g, (c, i, a) => {
      const sep = '*'
      return i && i > 1 && i < 6 ? sep : c
    })
}

export function emailMask(string) {
  if (!string) {
    return ' '
  }
  return String(string).replace(/./g, (c, i, a) => {
    const sep = '*'
    const lengthLong = a.length > 6 && i > 4 && i < 10
    return i && i > 2 && lengthLong && i < a.length - 2 ? sep : c
  })
}
