import Vue from 'vue'
import App from './App.vue'
import ElementUI, {Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router";
import axios from 'axios'
// 导入全局样式表
import './assets/css/global.css'

// 请求地址
axios.defaults.baseURL = 'http://localhost:8888/vue-springboot'

// 配置axios全局拦截器
let loading = null
axios.interceptors.request.use(
    config => {
        loading = Loading.service({fullscreen: true})
        // 每次请求将token放入请求头
        if (window.sessionStorage.getItem('token')) {
            config.headers.Authorization = window.sessionStorage.getItem('token')
        }
        return config
    }
)
axios.interceptors.response.use(
    response => {
        loading.close()
        return response
    }
)

//获取面包屑数据排列
async function getBreadList(route) {
    const {data} = await this.$http.get(`/sysMenu/getBreadList?path=${route}`)
    if (data.code !== 200) return this.$message.error('获取菜单列表失败!')
    let result = data.data
    return result.map((item) => {
        return item["menuName"]
    })
}

Vue.config.productionTip = false
//全局注册elementUI组件
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.prototype.getBreadList = getBreadList
new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
