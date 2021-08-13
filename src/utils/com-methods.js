export function timeFormatNow () { // 2019-04-03 10:10:10
  var date = new Date()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hh + ':' + mm + ':' + ss
}


/**
 * 函数防抖 多长时间内执行一次
 * @param {*} func 要执行的任务
 * @param {*} wait 多长时间内执行一次
 * @param {*} immediate 开始边界还是结束边界，默认false 结束边界执行，true 开始边界执行
 */
let timer = null
export function debounce(func, wait, immediate){
  return function operator(...args){
    if(typeof func !== 'function') throw new TypeError(`${func} must be a function`);
    if(typeof wait === 'boolean') immediate = wait;
    if(typeof wait !== 'number') wait = 500

    let now = !timer && immediate
    if(timer){
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      // 结束边界执行
      if(!immediate)func.call(this, ...args)
      clearTimeout(timer)
      timer = null
    }, wait);

    // 开始边界执行
    if(now) func.call(this, ...args)
  }
}

