import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import $C from '@/common/config.js';
import $http from '@/common/request.js';

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
				state.IsOnline = false;
				// 清空会话列表
				// 更新未读数提示
			});

			// 监听错误
			state.SocketTask.onError(() => {
				console.log('socket-连接错误');
				state.IsOpen = false;
				state.SocketTask = false;
				state.IsOnline = false;
			});

			// 监听接收消息
			state.SocketTask.onMessage(e => {
				console.log('socket-监听接收消息', e);

				// 字符串转json
				let res = JSON.parse(e.data);

				// 绑定返回结果
				if (res.type == 'bind') {
					// 用户绑定
					return dispatch('userBind', res.data);
				}
			});
		},
		// 用户绑定
		userBind({ state, dispatch }, client_id) {
			$http
				.post(
					'/chat/bind',
					{
						type: 'bind',
						client_id: client_id
					},
					{
						token: true
					}
				)
				.then(data => {
					console.log('绑定成功', data);

					// 开始上线
					if (data.status && status.type == 'bind') {
						// 改为上线状态
						state.IsOnline = true;

						// 初始化会话列表
						// 获取未读信息
					}
				})
				.catch(err => {
					// 失败 退出登录,重新链接等处理
					console.log('socket-err', err);
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
