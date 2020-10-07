import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由对象
import router from '@/router/index'

new Vue({
  render: h => h(App),
  router // 把路由注入到根实例中
}).$mount('#app')
