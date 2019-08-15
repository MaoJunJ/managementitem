// 导入axios
import axios from 'axios'
// 设置基地址
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 导出登录的方法
export const login = ({ username, password }) => {
  return http.post('login', {
    username, password
  })
}

// 导出左侧的菜单方法
export const menus = () => {
  return http.get('menus', {
    // 请求头中携带token
    headers: {
      Authorization: window.sessionStorage.getItem('token')
    }
  })
}

