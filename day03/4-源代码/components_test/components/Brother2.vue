<template>
  <div>我是兄弟2组件<br /></div>
</template>

<script>
import bus from '../common/bus'
export default {
  mounted () {
    /**
     * 参数1：自定义事件名称
     * 参数2：处理函数
     */
    bus.$on('brotherevent', val => {
      console.log(val)
    })
  }
}
</script>
