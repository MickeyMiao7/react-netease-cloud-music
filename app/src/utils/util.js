export function convertDate(timestamp) {
  let date = new Date()
  if (typeof timestamp === 'number' && timestamp.toString().length === 13) {
    date = new Date(timestamp)
  }
  return `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDay()}`
}

export function msToTime(duration) {
  const total = parseInt(duration / 1000)
  const minutes = parseInt(total / 60)
  const seconds = parseInt(total % 60)
  return `${formatNumber(minutes)}:${formatNumber(seconds)}`
}

export function formatNumber(number) {
  return ('0' + number).slice(-2)
}


export function formatDuration(duration) {
  let total = Math.floor(duration / 1000)
  let minute = Math.floor(total / 60)
  let second = total % 60

  return [zeroPad(minute), zeroPad(second)]
}

function zeroPad(number) {
  return number < 10 ? '0' + number.toString() : number.toString()
}