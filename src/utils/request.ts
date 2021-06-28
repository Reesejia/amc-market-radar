import axios from 'axios'

const service = axios.create({
  baseURL: '/aap/api/v1',
  timeout: 150000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem('token')
    const tenantId = window.sessionStorage.getItem('tenantId')
    config.headers.tenantId = tenantId
    config.headers.Authorization = 'bearer ' + token
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const resData = response.data
    const { statusCode } = resData
    if (statusCode !== 0) {
      Promise.reject((new Error(resData.errorMsg || 'Error')))
    }
    return resData
  },
  (error) => {

    return Promise.reject(error)
  }
)

export default service
