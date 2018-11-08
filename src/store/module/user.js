import {login} from '@/api/user';
import {setToken, getToken} from '@/libs/util';
export default {
	state: {
		userName: '',
		userId: '',
		avatorImgPath: '',
		token: getToken(),
		access: ''
	},
	mutations: {
		setAvator(state, avatorPath) {
			state.avatorImgPath = avatorPath
		},
		setUserId(state, id) {
			state.userId = id
		},
		setUserName(state, name) {
			state.userName = name
		},
		setAccess(state, access) {
			state.access = access
		},
		setToken(state, token) {
			state.token = token
			setToken(token)
		}
	},
	actions: {
		// 登录
		handleLogin({commit}, {userName, password}) {
			userName = userName.trim();

			let params = {
				username: userName,
				password: password
			};
			login(params).then(res => {
				const data = res.result;
				commit('setToken', data.token);
				commit('setAvator', data.userHead);
			})
		},
		// 退出登录
		handleLogOut({state, commit}) {
			return new Promise((resolve, reject) => {
				commit('setToken', '')
				commit('setAccess', [])
				resolve()
			})
		}
	}
}
