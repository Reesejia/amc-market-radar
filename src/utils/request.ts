import { message } from 'antd';
import axios from 'axios';

axios.defaults.headers['Content-type'] = 'application/json';

axios.defaults.baseURL = '/aap/api/v1';
axios.defaults.timeout = 150000;

// Request interceptors
axios.interceptors.request.use(
	(config) => {
		const token = window.sessionStorage.getItem('token') || '51992870-5b3f-4ae7-b985-bb43865f58e9';
		const tenantId = window.sessionStorage.getItem('tenantId') || 1001;
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
		const { baseURL } = response.config;
		const resData = response.data;

		if (baseURL === '/aap/api/v1') {
			const { statusCode } = resData;
			if (statusCode !== 0) {
				message.error(resData.errorMsg || 'Error');
				return Promise.reject(resData.errorMsg || 'Error');
			}
		}

		if (baseURL === '/radar') {
			const { code } = resData;
			if (code !== '0') {
				message.error(resData.errorMsg || 'Error');
				return Promise.reject(resData.errorMsg || 'Error');
			}
		}
		return resData;
	},
	(error) => {
		message.error(error.message || 'Error');
		return Promise.reject(error);
	}
);

export default axios;
