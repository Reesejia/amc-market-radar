import md5 from 'md5'
import Base64 from './base64'
// ish5-dev.newbanker.cn
// 验签
export const SignData = {
  signFun (data, key) {
    var o = data
    if (o !== null) {
      for (const k in o) {
        if (o[k] && Object.prototype.toString.call(o[k]) === '[object String]' && o[k].match(/\n/)) {
          o[k] = o[k].replace(/\n/g, '&abc&')
        }
      }
    }
    let appkey = key
    appkey = Base64.decode(appkey)
    const str = `${JSON.stringify(o)},${appkey}`
    return md5(str)
  },
  signNew (o) {
    const appkey = '123456'
    const paramNames = []
    for (const key in o) {
      paramNames.push(key)
    }
    paramNames.sort()
    const paramNameValue = []
    for (let i = 0, len = paramNames.length; i < len; i++) {
      const paramName = paramNames[i]
      paramNameValue.push(paramName)
      paramNameValue.push(o[paramName])
    }
    const source = appkey + paramNameValue.join('') + appkey
    return md5(source).toUpperCase()
  },
  objToString (obj) {
    let flag = false
    let str = '{'
    for (const i in obj) {
      flag = true
      str += '"' + i + '":'
      if (obj[i] instanceof Array) {
        str += '['
        const arrs = obj[i]
        for (let j = 0; j < arrs.length; j++) {
          if (arrs[j]) {
            str += '"' + arrs[j] + '"'
          } else {
            str += arrs[j]
          }
          if (j < arrs.length - 1) {
            str += ','
          }
        }
        str += ']'
      } else if (typeof obj[i] === 'object') {
        str += SignData.objToString(obj[i])
      } else if (typeof obj[i] === 'number') {
        str += obj[i]
      } else {
        str += '"' + obj[i] + '"'
      }
      str += ','
    }
    if (flag === true) {
      str = str.substring(0, str.length - 1)
    }
    str += '}'
    return str
  }
}
