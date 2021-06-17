export function timeFormatNow () { // 2019-04-03 10:10:10
  var date = new Date()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hh + ':' + mm + ':' + ss
}
