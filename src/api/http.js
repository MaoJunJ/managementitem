// 用npm导入axios
import axios from 'axios'
// 设置基地址
const http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
})

// 导出http出去
// export default http;

// 封装登录的方法
export const login = ({ username, password }) => {
    return http.post('login', {
        username,
        password
    })
}

// 封装左侧菜单的方法
export const menus = () => {
    return http.get('menus', {
        headers: {
            Authorization: window.sessionStorage.getItem('token')
        }
    })
}
