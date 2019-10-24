import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入饿了么ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 时间转换器
import moment from "moment";
// 全局过滤器
// 参数1：过滤器的名字
// 参数2：过滤器的回调函数
Vue.filter('f_time', function (val, fom) {
  return moment(val).format(fom);
})

// 全局面包屑
import crumbs from './components/crumbs.vue'
Vue.component('crumbs', crumbs)

// 导入路由
import router from './router/router'

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')

// 导入全局样式
import './assets/css/base.css'
