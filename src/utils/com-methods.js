export function timeFormatNow () { // 2019-04-03 10:10:10
  var date = new Date()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return date.getFullYear() + '-' + month + '-' + currentDate + ' ' + hh + ':' + mm + ':' + ss
}
let timer = null
export const debounce = function debounce(func, wait, immediate) {
  if (typeof func !== 'function') throw new TypeError(`${func} must be an function`)
  if (typeof wait === 'boolean') immediate = wait
  if (typeof wait !== 'number') wait = 500
  if (typeof immediate !== 'boolean') immediate = false


  // 在最后一次点击的时候，把之前设置的定时器干掉，重新设置wait时长的定时器
  return function operate(...params) {
    let result,
      now = !timer && immediate
    if (timer) {
      clearTimeout(timer)
      timer = null // 想通过timer是不是null来判断定时器是否清除成功
    }
    // 定时器返回一个number，代表第几个定时器
    timer = setTimeout(() => {
      // 箭头函数中没有this，用到的this就是operate中的this
      // 不使用call，会丢失点击的元素和参数
      // 结束边界触发
      if (!immediate) func.call(this, ...params) // 结束边界拿不到result

      clearTimeout(timer)
      timer = null
    }, wait);

    // 开始边界触发
    if (now) {
      console.log('resize11 触发了');
      result = func.call(this, ...params)
    }
    return result
  }
}

// /**
//  * 函数防抖 多长时间内执行一次
//  * @param {*} func 要执行的任务
//  * @param {*} wait 多长时间内执行一次
//  * @param {*} immediate 开始边界还是结束边界，默认false 结束边界执行，true 开始边界执行
//  */
// export function debounce(func, wait, immediate){
//   return function operator(...args){
//     if(typeof func !== 'function') throw new TypeError(`${func} must be a function`);
//     if(typeof wait === 'boolean') immediate = wait;
//     if(typeof wait !== 'number') wait = 500
//     console.log('resize11 debounce')
//     let timer = null;
//     let now = !timer && immediate
//     if(timer){
//       clearTimeout(timer)
//       timer = null
//     }

//     timer = setTimeout(() => {
//       // 结束边界执行
//       if(!immediate) func.call(this, ...args)
//       clearTimeout(timer)
//       timer = null
//     }, wait);

//     // 开始边界执行
//     if(now) func.call(this, ...args)
//   }
// }

