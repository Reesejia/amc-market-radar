import { SignData } from './sign/sign'
// import qs from 'qs'
import {
  timeFormatNow
} from './com-methods'
import {
  merge
} from 'lodash'
function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}
/* wbs新接口 */
export function wbsApiNew ({config}) {
  const handleCfg = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  handleCfg.headers.token = getQueryString('token')
  let _data = {}
  _data.timestamp = timeFormatNow()
  _data.app_key = 'test'
  _data.format = 'json'
  _data.version = ''
  _data.access_token = getQueryString('token')
  _data = merge(_data, config.data)
  _data.data = encodeURIComponent(JSON.stringify(_data.data))
  _data.sign = SignData.signNew(_data)
  handleCfg.data = _data
  return handleCfg
}
