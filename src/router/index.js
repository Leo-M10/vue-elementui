import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "@/components/login/Login.vue";
import Layout from "@/components/layout/Layout.vue";
import Register from "@/components/login/Register.vue";
import Content from "@/components/layout/content/Content.vue";
import SysUser from "@/components/layout/content/system/SysUser.vue";

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {path: '/', redirect: '/login'},
        {path: '/login', component: Login},
        {
            path: '/layout', component: Layout, redirect: '/home', children: [
                {path: '/home', component: Content},
                {path: '/sysUser', component: SysUser}
            ]
        },
        {path: '/register', component: Register},
    ]
})
// 路由守卫验证token
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    if (to.path === '/register') return next()
    const token = window.sessionStorage.getItem('token')
    if (token) return next()
    next('/')
})
export default router