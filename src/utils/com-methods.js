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

export function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

// 数字四舍五入 保留两位 加百分号
export const formatNum = (num, flag = '') =>{
  num = String(Math.round(num * 10000))
  num = num.split(".")[0]
  return Number(num) / 100  + flag
}

// 数字四舍五入 保留两位
export const fixNum = (num) =>{
  num = (num * 100).toFixed(2)
  num = String(num).split('.')[0]
  return  num / 100
}

// 返回当前日期 "2021-09-04"
export const getCurDate = (split = '-') =>{
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month =   month < 10 ? `0${month}` : month
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day
  return [year, month, day].join(split);
}
