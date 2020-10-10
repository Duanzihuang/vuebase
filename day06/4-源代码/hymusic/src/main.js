import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 集成ElementUI
import ElementUI, { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入全局样式
import '@/assets/style/global.less'

// axios配置
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://huangjiangjun.top:9000/'

let loadingInstance = null
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    if (!config.url.includes('song/url?id=')) {
      // 在发送请求之前做些什么
      loadingInstance = Loading.service({
        text: '拼命加载中...',
        spinner: 'el-icon-loading'
      })
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 设置相应拦截器
axios.interceptors.response.use(
  function (response) {
    loadingInstance && loadingInstance.close()
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    loadingInstance && loadingInstance.close()
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
// 绑定到Vue的原型上，以后每个.vue文件中，都可以通过this.$http访问到axios实例了
Vue.prototype.$http = axios

// 全局过滤器
// 播放次数过滤器
Vue.filter('formatCount', count => {
  if (count / 10000 > 10) {
    return parseInt(count / 10000) + '万'
  } else {
    return count
  }
})
// 播放时间过滤器
Vue.filter('formatDuration', dt => {
  // 转分
  let min = Math.ceil(dt / 1000 / 60)
  min = min < 10 ? '0' + min : min
  // 秒
  let sec = Math.ceil((dt / 1000) % 60)
  sec = sec < 10 ? '0' + sec : sec
  return min + ':' + sec
})
// 格式化时间过滤器
import moment from 'moment'
Vue.filter('formatTime', (time, format = 'YYYY-MM-DD hh:mm:ss') => {
  return moment(time).format(format)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
