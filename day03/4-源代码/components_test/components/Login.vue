<template>
  <div class="login-container">
    <p class="username">用户名：<input v-model="username" type="text" /></p>
    <p class="password">密码：<input v-model="password" type="text" /></p>
    <p class="login-button"><button @click="login">登录</button></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(this.username, this.password)
    }
  }
}
</script>

<style>
.login-container {
  width: 400px;
  height: 200px;
  margin: 100px auto;
  border: 1px solid #999;
}
.username,
.password,
.login-button {
  margin-top: 10px;
  text-align: center;
}
</style>
