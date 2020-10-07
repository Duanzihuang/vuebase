<template>
  <div>
    子组件<br />
    name is {{ name }},age is {{ age }}<br /><br />
    <button @click="sendValueToParent">传值给父组件</button>
  </div>
</template>

<script>
export default {
  //   props: ['name', 'age']
  props: {
    name: {
      type: String
    },
    age: {
      type: Number,
      default: 20
    }
  },
  methods: {
    sendValueToParent () {
      /**
       * 参数1：自定义事件的名称
       * 参数2：传递的参数
       */
      this.$emit('myevent', { name: 'lisi', age: 20, address: '广东深圳' })
    }
  }
}
</script>
