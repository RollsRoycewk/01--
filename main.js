import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// 引入全局组件
import divider from "@/components/common/divider.vue";
// 注册或获取全局组件
Vue.component("divider",divider);

import uniIcons from "@/components/uni-ui/uni-icons/uni-icons.vue";
Vue.component("uniIcons",uniIcons);

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