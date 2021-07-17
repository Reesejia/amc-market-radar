import {
  wbsApiNew
} from './api-type'
import { merge } from 'lodash'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config)
    if (config.headers.type === 'wbsApiNew') {
      config.url = `${config.url}?_=${config.data.name}`
      const configNew = wbsApiNew({
        config
      })
      config = merge(config, configNew)
    }
    const token = window.sessionStorage.getItem('token') || '1e90d0fa-7e73-42d3-a68d-0da42e515313'
    const tenantId = window.sessionStorage.getItem('tenantId') || 1001
    config.headers.tenantId = tenantId
    config.headers.Authorization = 'bearer ' + token
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default _axios
