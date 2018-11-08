import axios from 'axios';
import {TOKEN_KEY} from '@/libs/util';
import { Message, LoadingBar } from 'iview';
import {SUCCESS} from '@/common/consts';
import Cookies from "js-cookie";

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

axios.interceptors.request.use(
	config => {
		if (Cookies.get(TOKEN_KEY) != null) {
			config.headers.Authorization = Cookies.get(TOKEN_KEY);
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	});


axios.interceptors.response.use(res => {
	if (res.data.status === SUCCESS) {
		return res;
	} else {
		Message.error(res.data.message);
		LoadingBar.error();
		return Promise.reject(res);
	}
}, err => {
	if (err.response.status === 401) {
		Message.error('没有权限');
		/*Cookies.remove(TOKEN_KEY);
		window.location.href = '/#/login'*/
	}
	if (err.response.status === 407) {
		Message.error('没有权限');
	}
	if (err.response.status === 429) {
		Message.error('请求过于频繁,请稍后再试');
	}
	console.log(1111)
	LoadingBar.error();
	return Promise.reject(err);
});


export default {
	fetchGet(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.get(url, params).then(res => {
				resolve(res.data);
			}).catch(error => {
				reject(error);
			});
		});
	},
	fetchPost(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.post(url, params).then(res => {
				resolve(res.data);
			}).catch(error => {
				reject(error);
			});
		});
	},
	fetchPut(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.put(url, params).then(res => {
				resolve(res.data);
			}).catch(error => {
				reject(error);
			});
		});
	},
	fetchDelete(url, params = {}) {
		return new Promise((resolve, reject) => {
			axios.delete(url, params).then(res => {
				resolve(res.data);
			}).catch(error => {
				reject(error);
			});
		});
	}
};
