// 导入axios
import axios from 'axios'
// 此方法可以设置多个基地址
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 不用写太多的请求头，可以用以下方法
// 方法一：设置请求头中的默认值，给请求默认加一个Authorization的键，它的值为token
http.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('token');
// 方法二：[请求拦截]
// 翻译成中文的意思是拦截请求——>使用这个方法
http.interceptors.request.use(function (config) {

  // 发送请求前调用（发送请求做一些事）
  // 把你所有的请求拦下来
  // 拦下来给你加一个请求头，请求头的内容是token
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // window.console.log('我调用了', config)
  return config;

}, function (error) {

  //发生错误的回调函数
  return Promise.reject(error);
});

// 导出登录的方法
export const login = ({ username, password }) => {
  return http.post('login', {
    username, password
  })
}

// 导出左侧的菜单方法
export const menus = () => {
  return http.get('menus', {

    // 方法三：请求头中携带token
    // headers: {
    //   Authorization: window.sessionStorage.getItem('token')
    // }
  })
}

// 导出获取用户数据列表的方法
export const users = ({ query, pagenum, pagesize }) => {
  return http.get('users', {
    params: {
      query, pagenum, pagesize
    }
  })
}

// 导出添加用户数据的方法
export const adduserss = ({ username, password, email, mobile, }) => {
  return http.post('users', {
    username, password, email, mobile,
  })
}

// 修改用户状态
export const modifyUserStatus = (uId, type) => {
  return http.put(`users/${uId}/state/${type}`)
}

// 分配用户角色
export const assignUserRoles = ({ id, rid }) => {
  return http.put(`users/${id}/role`, {
    rid
  })
}

// 获取所有的角色列表
export const listOfAllRoles = () => {
  return http.get('roles')
}

// 编辑用户提交
export const editUserSubmission = ({ id, email, mobile }) => {
  return http.put(`users/${id}`, {
    email, mobile
  })
}

// 删除单个用户
export const deleteSingleUser = (id) => {
  return http.delete(`users/${id}`)
}

// 所有权限列表
export const listOfAllPermissions = (type) => {
  return http.get(`rights/${type}`)
}

// 删除角色指定权限
export const deletesRolespecifiedPermissions = (roleId, rightId) => {
  return http.delete(`roles/${roleId}/rights/${rightId}`)
}

// 添加角色
export const addingRoles = ({ roleName, roleDesc }) => {
  return http.post(`roles`, {
    roleName, roleDesc
  })
}

// 编辑角色
export const editingTheRole = ({ roleName, roleDesc, id }) => {
  return http.put(`roles/${id}`, {
    roleName, roleDesc
  })
}

// 删除角色
export const deleteTheRole = (id) => {
  return http.delete(`roles/${id}`)
}

// 角色授权
export const roleAuthorization = (roleId, rids) => {
  return http.post(`roles/${roleId}/rights`, {
    rids
  })
}

// 商品列表数据
export const itemListData = ({ query, pagenum, pagesize }) => {
  return http.get(`goods`, {
    params: {
      query, pagenum, pagesize
    }
  })
}

// 编辑商品
export const editSubmitItems = ({ goods_cat, goods_id, goods_name, goods_price, goods_number, goods_weight }) => {
  return http.put(`goods/${goods_id}`, {
    goods_cat, goods_name, goods_price, goods_number, goods_weight
  })
}

// 添加商品
export const addTheGoods = ({ goods_cat, goods_name, goods_price, goods_number, goods_weight }) => {
  return http.post(`goods`, {
    goods_cat, goods_name, goods_price, goods_number, goods_weight
  })
}

// 删除商品
export const deleteTheGoods = (goods_id) => {
  return http.delete(`goods/${goods_id}`)
}

// 商品分类列表
export const commodityLists = (type) => {
  return http.get(`categories`, {
    params: {
      type
    }
  })
}

// 添加商品分类
export const addCategorys = ({ cat_pid, cat_name, cat_level }) => {
  return http.post(`categories`, {
    cat_pid, cat_name, cat_level
  })
}

// 编辑商品分类
export const editProductCategoriess = ({ cat_id, cat_name }) => {
  return http.put(`categories/${cat_id}`, { cat_name })
}

// 删除商品分类
export const deleteCategory = (cat_id) => {
  return http.delete(`categories/${cat_id}`)
}

// 绘制图表
export const newecharts = () => {
  return http.get('reports/type/1')
}

// 订单数据列表
export const orderDataList = ({ pagenum, pagesize }) => {
  return http.get('orders', {
    params: {
      pagenum, pagesize
    }
  })
}

// 根据 ID 查询参数
export const accordingToID = (url) => {
  return http.get(`${url}`)
}

