import { message } from 'antd';
import axios from 'axios';

const service = axios.create({
	baseURL: '/aap/api/v1',
	timeout: 150000
});

// Request interceptors
service.interceptors.request.use(
	(config) => {
		const token = window.sessionStorage.getItem('token') || 'ca325274-9b74-483f-84c6-a09679c21390'
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
service.interceptors.response.use(
	(response) => {
		const resData = response.data;
		const { statusCode } = resData;
		if (statusCode !== 0) {
      message.error(resData.errorMsg || 'Error')
      Promise.reject(resData.errorMsg || 'Error');
    }

		return resData;
	},
	(error) => {
    message.error(error.message || 'Error')
		return Promise.reject(error);
	}
);

export default service;
