// #ifndef VUE3
import App from './App';
import Vue from 'vue';
import store from './store/index';

Vue.prototype.$store = store;

Vue.config.productionTip = false;

// 引入全局组件
import divider from '@/components/common/divider.vue';
// 注册或获取全局组件
Vue.component('divider', divider);

import uniIcons from '@/components/uni-ui/uni-icons/uni-icons.vue';
Vue.component('uniIcons', uniIcons);

// 引入配置文件
import $C from './common/config';
Vue.prototype.$C = $C;
// 挂载助手函数
import $U from './common/util';
Vue.prototype.$U = $U;
// 引入请求库
import $H from './common/request';
Vue.prototype.$H = $H;

// 权限验证操作
Vue.prototype.checkAuth = (callback, checkPhone = true) => {
	// 权限验证
	if (!store.state.loginStatus) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		});
	}

	// 验证是否绑定手机号
	if (checkPhone && !store.state.user.phone) {
		uni.showToast({
			title: '请先绑定手机号',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/user-phone/user-phone'
		});
	}

	callback();
};

// 权限验证跳转
Vue.prototype.navigateTo = options => {
	// 权限验证
	if (!store.state.loginStatus) {
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
		return uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	uni.navigateTo(options);
};

App.mpType = 'app';
const app = new Vue({
	store,
	...App
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
	const app = createSSRApp(App);
	return {
		app
	};
}
// #endif
