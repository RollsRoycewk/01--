import App from './App';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// 引入全局组件
import divider from "@/components/common/divider.vue";
// 注册或获取全局组件
Vue.component("divider", divider);

import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue";
Vue.component("uniIcons", uniIcons);

// 引入配置文件
import $C from "./common/config";
Vue.prototype.$C = $C;
// 挂载助手函数
import $U from "./common/util"
Vue.prototype.$U = $U;



App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
