<template>
  <div class="layout-container">
    <div class="left">
      <p>
        <router-link to="/layout/menu1">菜单1</router-link>
      </p>
      <p>
        <router-link to="/layout/menu2">菜单2</router-link>
      </p>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  width: 700px;
  height: 500px;
  margin: 100px auto;
}
.left {
  width: 200px;
  height: 500px;
  float: left;
  border: 1px solid red;
}
.right {
  width: 450px;
  height: 500px;
  float: right;
  border: 1px solid green;
}
</style>
