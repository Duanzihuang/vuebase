import Vue from 'vue'
import VueRouter from 'vue-router'

// 集成 router-view
Vue.use(VueRouter)

// 导入子组件
import NewsList from '@/components/NewsList'
import FoodList from '@/components/FoodList'
import NotFound from '@/components/NotFound'

// 创建路由实例
const router = new VueRouter({
  mode: 'history',
  // 设置路由规则
  routes: [
    { path: '/newslist', component: NewsList },
    { path: '/foodlist', component: FoodList },
    // 配置路由重定向
    { path: '/', redirect: '/foodlist' },
    // 404 路由规则配置
    { path: '*', component: NotFound }
  ]
})

export default router
