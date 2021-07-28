import { message } from 'antd';
import axios from 'axios';
import Qs from 'qs'

axios.defaults.headers['Content-type'] = 'application/json'

axios.defaults.baseURL = '/aap/api/v1'
axios.defaults.timeout = 150000


// Request interceptors
axios.interceptors.request.use(
	(config) => {
		const token = window.sessionStorage.getItem('token') || 'a37fbc51-c689-434a-a412-5e932d712936'
		const tenantId = window.sessionStorage.getItem('tenantId') || 1001
		config.headers.tenantId = tenantId;
		config.headers.Authorization = 'bearer ' + token;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptors
axios.interceptors.response.use(
	(response) => {
    const {baseURL} = response.config
		const resData = response.data;

    if(baseURL=== '/aap/api/v1'){
      const { statusCode } = resData;
      if (statusCode !== 0) {
        message.error(resData.errorMsg || 'Error')
          Promise.reject(resData.errorMsg || 'Error');
      }
    }

    if(baseURL=== '/radar'){
      const { code } = resData;
      if (code !== '0') {
        message.error(resData.errorMsg || 'Error')
          Promise.reject(resData.errorMsg || 'Error');
      }
    }

		return resData;
	},
	(error) => {
    message.error(error.message || 'Error')
		return Promise.reject(error);
	}
);

export default axios;
