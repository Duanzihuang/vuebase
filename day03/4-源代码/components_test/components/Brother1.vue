<template>
  <div>
    我是兄弟1组件<br />
    <button @click="sendValueToBrother2">传值</button>
  </div>
</template>

<script>
import bus from '../common/bus'
export default {
  methods: {
    sendValueToBrother2 () {
      /**
       * 参数1：自定义事件名称
       * 参数2：传递的参数
       */
      bus.$emit('brotherevent', [
        { id: 1001, name: '张三丰', age: 666, address: '武当山' }
      ])
    }
  }
}
</script>
