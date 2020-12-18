import vueRouter from 'vue-router'

import User from './components/User'
import UserBalance from './components/UserBalance'
import UserTransaction from './components/UserTransaction'
import UserAuth from './components/UserAuth'
import App from './App'

const router = new vueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: "root",
            component: App
        },
        {
            path: '/user/:usuario',
            name: "user",
            component: User
        },
        {
            path: '/user/balance/:username',
            name: "user_balance",
            component: UserBalance
        },
        {
            path: '/user/transaction/:username',
            name: "user_transaction",
            component: UserTransaction
        },
        {
            path: '/user/auth',
            name: "user_auth",
            component: UserAuth
        }
        
    ]
})
export default router