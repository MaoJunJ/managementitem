import Vue from 'vue'

// npm导入的路由数据
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 设置路由跳转的地址
import login from '../components/login.vue'
import index from '../components/index.vue'
// 设置子路由的跳转
import users from '../components/innet/users.vue'
import roles from '../components/innet/roles.vue'
import rights from '../components/innet/rights.vue'
import reports from '../components/innet/reports.vue'
import params from '../components/innet/params.vue'
import orders from '../components/innet/orders.vue'
import goods from '../components/innet/goods.vue'
import categories from '../components/innet/categories.vue'

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
    path: '/index', component: index,
    children:[
      {
        path:'/users',component:users
      },
      {
        path:'/roles',component:roles
      },
      {
        path:'/rights',component:rights
      },
      {
        path:'/reports',component:reports
      },
      {
        path:'/params',component:params
      },
      {
        path:'/orders',component:orders
      },
      {
        path:'/goods',component:goods
      },
      {
        path:'/categories',component:categories
      },
    ]
  },
]

// 挂载路由到vue
const router = new VueRouter({
  routes
})

// 一开始判断是否已经登录
router.beforeEach((to, from, next) => {
  // to是去哪  from是从哪来  next()放行
  if (to.path == '/login') {
    next()
  } else {
    if (window.sessionStorage.getItem('token')) {
      next();
    } else {

      router.push('/login');

      Vue.prototype.$message({
        showClose: true,
        message: '请您先登录！'
      });
      return;
    }
  }
})

export default router