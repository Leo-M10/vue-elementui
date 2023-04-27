import Vue from 'vue'
import App from './App.vue'
import ElementUI, {Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from "@/router";
import axios from 'axios'
import messageConfig from './plugins/element-ui.config.js'
// 导入全局样式表
import './assets/css/global.css'

messageConfig()
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

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios
new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')
