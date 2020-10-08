<template>
  <div class="login-container">
    <p>用户名：<input v-model="username" type="text" /></p>
    <p>密码：<input v-model="password" type="password" /></p>
    <p style="margin-top:50px;"><button @click="login">登录</button></p>
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
      if (this.username === 'admin' && this.password === '123456') {
        // 编程式导航进行跳转
        this.$router.push('/layout')
      } else {
        alert('用户名或是密码错误')
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 300px;
  height: 200px;
  margin: 200px auto;
  border: 1px solid #eee;
  background-color: #f8f8f8;
}
p {
  text-align: center;
}
</style>
