<template>
  <div>
    我是父组件<br />
    <child name="zhangsan" :age="30" @myevent="getValue" />
  </div>
</template>

<script>
import Child from './Child'
export default {
  components: {
    Child
  },
  methods: {
    getValue (val) {
      console.log(val)
    }
  }
}
</script>
