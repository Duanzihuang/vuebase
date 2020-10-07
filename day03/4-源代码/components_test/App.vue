<template>
  <div>
    <!-- <p class="test">
      {{ msg }}<br />
      <button @click="changeMsg">change</button>
    </p> -->
    <!-- <login />
    <my-footer />
    <parent />
     -->
    <brother1 />
    <hr />
    <brother2 />
  </div>
</template>

<script>
// import Login from './components/Login'
// import MyFooter from './components/MyFooter'
// import Parent from './components/Parent'
import Brother1 from './components/Brother1'
import Brother2 from './components/Brother2'
export default {
  components: {
    // Login,
    // MyFooter,
    // Parent
    Brother1,
    Brother2
  },
  data () {
    return {
      msg: 'Hello World'
    }
  },
  methods: {
    changeMsg () {
      this.msg = 'Hello Vue'
    }
  }
}
</script>

<style scoped>
.test {
  color: red;
}
</style>
