import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入子组件
import NewsList from '@/components/NewsList'
import FoodList from '@/components/FoodList'
import NewsDetail from '@/components/NewsDetail'
import Login from '@/components/Login'
import Layout from '@/components/Layout'
import Menu1 from '@/components/Menu1'
import Menu2 from '@/components/Menu2'
import Axios from '@/components/Axios'

// 创建路由对象，设置路由规则
const router = new VueRouter({
  routes: [
    { path: '/newslist', component: NewsList },
    { path: '/foodlist', component: FoodList },
    { path: '/', redirect: '/login' },
    // query 传参配置
    { path: '/newsdetail', component: NewsDetail },
    // params 传参配置
    { path: '/newsdetail/:id', component: NewsDetail },
    { path: '/login', component: Login },
    { path: '/axios', component: Axios },
    {
      path: '/layout',
      component: Layout,
      children: [
        // 这里的path，前面不能加/，否则会被当成根路径处理
        { path: 'menu1', component: Menu1 },
        { path: 'menu2', component: Menu2 }
      ]
    }
  ]
})

export default router
