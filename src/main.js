import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

import { Button } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'


Vue.use(Button);

Vue.config.productionTip = false
//添加事件总线对象
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/abcd.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')