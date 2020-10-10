import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入子组件
import Discovery from '../views/Discovery'
import Playlists from '../views/Playlists'
import Playlist from '../views/Playlist'
import Songs from '../views/Songs'
import MVs from '../views/MVs'
import MV from '../views/MV'
import NotFound from '@/views/NotFound'

const routes = [
  {
    path: '/discovery',
    name: 'Discovery',
    component: Discovery
  },
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: Playlists
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: Playlist
  },
  {
    path: '/songs',
    name: 'Songs',
    component: Songs
  },
  {
    path: '/mvs',
    name: 'MVs',
    component: MVs
  },
  {
    path: '/mv/:id',
    name: 'MV',
    component: MV
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
