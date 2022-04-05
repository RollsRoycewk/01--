import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import $C from '@/common/config.js';
import $http from '@/common/request.js';
import $U from '@/common/util.js';

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

				// 处理接收信息
				if (res.type !== 'text') return;
				/*
				{
					to_id:1,      // 接收人
					from_id:12,	  // 发送人id
					from_username:"某某",  // 发送人昵称
					from_userpic:"http://pic136.nipic.com/file/20170725/10673188_152559977000_2.jpg",
					type:"text",	 // 发送类型
					data:"你好啊",	 // 发送内容
					time:151235451   // 接收到的时间
				}
				*/
				// 处理接收消息
				dispatch('handleChatMessage', res);
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
		},
		// 处理接收消息
		handleChatMessage({ state, dispatch }, data) {
			console.log('socket-处理接收消息', data);

			// 全局通知接口
			uni.$emit('UserChat', data);

			// 存储到chatdetail
			/**
			 * dispatch('updateChatDetailToUser',{
			 * 	 data,
			 *   send:false
			 * })
			 */
			// 更新会话列表
			dispatch('updateChatList', data);
		},
		// 更新聊天会话列表
		async updateChatList({ state, dispatch, commit }, data) {
			console.log('socket-更新会话列表', data);

			// 是否是本人发送
			let isMySend = data.from_id === state.user.id;
			console.log(isMySend ? '本人发送的信息' : '不是本人发送的');

			// 获取之前会话
			let chatList = await dispatch('getChatList');

			// 判断是否已经存在该会话,存在: 将当前会话置顶; 不存在:创建并追加至头部
			let i = chatList.findIndex(v => {
				return v.user_id == data.to_id || v.user_id == data.from_id;
			});

			// 不存在,创建会话
			if (i === -1) {
				// 接收到的消息转会话
				let obj = await dispatch('formatChatListObject', data);

				// 忽略本人发送
				if (!isMySend) {
					obj.noread = 1;
				}
				console.log('不存在当前会话,创建', obj);

				// 追加头部
				chatList.unshift(obj);
			} else {
				// 存在: 将当前会话置顶,修改当前会话的data和time显示
				let item = chatList[i];
				item.data = data.data;
				item.type = data.type;
				item.time = data.time;

				// 当前聊天对象不是该id，未读数+1（排除本人发送消息）
				if (!isMySend && state.ToUser.user_id !== item.user_id) {
					item.noread++;
				}
				console.log('存在当前会话', item);

				// 置顶当前会话
				chatList = $U.__toFirst(chatList, i);
			}

			// 存储到本地
			state.chatList = chatList;
			commit('saveChatList', chatList);
			// 不处于聊天当中,更新未读数
			if (data.from_id !== state.ToUser.user_id && !isMySend) {
				await dispatch('updateTabbarBadge');
			}
		},
		// 获取所有聊天会话对象
		getChatList({ state }) {
			let list = uni.getStorageSync('chatlist_' + state.user.id);
			return list ? JSON.parse(list) : [];
		},
		// 消息转聊天会话对象
		formatChatListObject({ state }, data) {
			// 接收消息
			return {
				user_id: data.from_id,
				avatar: data.from_userpic,
				username: data.from_username,
				update_time: data.time, // 最新消息时间戳
				data: data.data,
				noread: 0 // 未读数
			};
		},
		updateTabbarBadge({ state, getters }) {
			let total = getters.totalNpread;

			console.log('socket-->更新未读数', total);

			// 未读数为0,移除
			if (total === 0) {
				console.log('移除未读数');
				return uni.removeTabBarBadge({
					index: 2
				});
			}

			console.log('设置未读数', total);
			uni.setTabBarBadge({
				index: 2,
				text: total > 99 ? '99+' : total.toString()
			});
		}
	},
	getters: {
		totalNpread(state) {
			let total = 0;
			state.chatList.forEach(item => {
				total += item.noread;
			});
			return total;
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
		},
		// 存储会话列表
		saveChatList(state, list) {
			uni.setStorageSync('chatlist_' + state.user.id, JSON.stringify(list));
		}
	}
});
