import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import $C from '@/common/config.js';

export default new Vuex.Store({
	state: {
		loginStatus: uni.getStorageSync('user').id ? true : false,
		user: uni.getStorageSync('user').id ? uni.getStorageSync('user') : {},
		token: uni.getStorageSync('user').token ? uni.getStorageSync('user').token : false,
		// Socket连接状态
		IsOpen: false,
		// SocketTask
		SocketTask: false,
		// 是否上线(会员id绑定客户端id,验证用户身份,通过则绑定)
		IsOnline: false
	},
	actions: {
		// 打开socket
		openSocket({ state, dispatch }) {
			// 防止重复连接
			if (state.IsOpen) return;
			// 连接
			state.SocketTask = uni.connectSocket({
				url: $C.websocketUrl,
				// 需要socketTask对象就需要写回调
				complete: () => {}
			});

			if (!state.SocketTask) return;
			// 监听开启
			state.SocketTask.onOpen(() => {
				// 将连接状态设为已连接
				console.log('socket-将连接状态设为已连接');
				state.IsOpen = true;
			});

			// 监听关闭
			state.SocketTask.onClose(() => {
				console.log('socket-连接已关闭');
				state.IsOpen = false;
				state.SocketTask = false;
				// 清空会话列表
				// 更新未读数提示
			});

			// 监听错误
			state.SocketTask.onError(() => {
				console.log('socket-连接错误');
				state.IsOpen = false;
				state.SocketTask = false;
			});

			// 监听接收消息
			state.SocketTask.onMessage(e => {
				console.log('socket-监听接收消息', e);
			});
		}
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
