import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入饿了么ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// npm导入的路由数据
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 用npm导入axios
import axios from "axios";
Vue.prototype.$axios = axios;
// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';

// 设置路由跳转的地址
import login from './components/login.vue'
import index from './components/index.vue'

// 设置路由规则
const routes = [
  // 重定向路由
  {
    path: '', redirect: '/login'
  },
  {
    path: '/login', component: login
  },
  {
    path: '/index', component: index
  },
]

// 挂载路由到vue
const router = new VueRouter({
  routes
})

// 一开始判断是否已经登录
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     next()
//   } else {
//     router.push('/login');

//     Vue.prototype.$message({
//       showClose: true,
//       message: '请您先登录！'
//     });
//     return;
//   }
// })

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// 导入全局样式
import './assets/css/base.css'