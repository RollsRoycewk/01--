import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loginStatus: uni.getStorageSync('user').id ? true : false,
		user: uni.getStorageSync('user').id ? uni.getStorageSync('user') : {},
		token: uni.getStorageSync('user').token ? uni.getStorageSync('user').token : false
	},
	mutations: {
		// 登录
		login(state, user) {
			state.loginStatus = true;
			state.user = user;
			state.token = state.user.token;
			uni.setStorageSync('user', user);
			uni.$emit('updateIndex');
		},
		// 退出登录
		logout(state) {
			state.loginStatus = false;
			state.user = {};
			state.token = false;
			uni.removeStorageSync('user');
			uni.$emit('updateIndex');
		},
		// 修改用户信息(手机号,邮箱,密码)
		editUserInfo(state, { key, value }) {
			state.user[key] = value;
			uni.setStorageSync('user', state.user);
		},
		// 修改资料
		editUserUserInfo(state, obj) {
			if (state.user.userinfo) {
				state.user.userinfo.sex = obj.sex;
				state.user.userinfo.qg = obj.qg;
				state.user.userinfo.job = obj.job;
				state.user.userinfo.path = obj.path;
				state.user.userinfo.birthday = obj.birthday;
				uni.setStorageSync('user', state.user);
			}
		}
	}
});
