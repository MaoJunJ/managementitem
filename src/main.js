import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入饿了么ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入封装的路由对象
import router from './routet/router'

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')

// 导入全局样式
import './assets/css/base.css'