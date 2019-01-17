export function formateDate(time) {
  if(!time) return ''
  let date = new Date(time)

  date.getSeconds = date.getSeconds() < 10?'0' + date.getSeconds():date.getSeconds()
  date.getMinutes = date.getMinutes() < 10?'0' + date.getMinutes():date.getMinutes()
  date.getHours = date.getHours() < 10?'0' + date.getHours():date.getHours()

  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours + ':' + date.getMinutes + ':' + date.getSeconds
}

