# Day05

## 路由（进阶）

> 路由传参

传参方式：

- query传参：路径后面接上`path?aaa=bbb&yyy=zzz`，**路由规则无需额外更改**
- params传参：路径后面接上`path/bbb/zzz`，**路由规则处需要使用动态路径参数 以冒号开头，例如：`{ path: '/user/:id', component: User }`**

创建项目：创建项目还是使用脚手架(`@vue/cli`)生成，生成的步骤，跟昨天一样，这里不再赘述

实现步骤：

1. 在昨天代码的基础上，再新建一个组件`NewsDetail.vue`，并且写好里面的内容

2. 在`src/router/index.js`中，配置好`NewsDetail.vue`组件的路由规则（query传参、params传参），代码如下

   ```js
   // 创建路由对象，设置路由规则
   const router = new VueRouter({
     routes: [
       { path: '/newslist', component: NewsList },
       { path: '/foodlist', component: FoodList },
       // query 传参配置
       { path: '/newsdetail', component: NewsDetail },
       // params 传参配置
       { path: '/newsdetail/:id', component: NewsDetail }
     ]
   })
   ```

3. 在`NewsList.vue`中，通过设置`<router-link to="/newsdetail?id=1001"></router-link>`或是`<router-link to="/newsdetail/1001"></router-link>`来设置好`声明式导航`

   ```vue
   <template>
     <div>
       <ul>
         <li>
           <router-link to="/newsdetail?id=1001"
             >俄罗斯梁赞州军火库发生爆炸</router-link
           >
         </li>
         <li>王一博摔车官方仲裁</li>
         <li>
           <router-link to="/newsdetail/1003"
             >刷屏了！中国最大金矿63岁董事长娶38岁妻子，新娘：相信爱情</router-link
           >
         </li>
       </ul>
     </div>
   </template>
   ```

4. 在`NewsDetail.vue`组件的生命周期钩子中，通过`this.$route.query.id`或是`this.$route.params.id`来获取参数

   ```vue
   <template>
     <div>
       query新闻id是：{{ $route.query.id }}<br />
       params新闻id是：{{ $route.params.id }}
     </div>
   </template>
   
   <script>
   export default {
     mounted () {
       console.log(`query新闻id是：${this.$route.query.id}`)
       console.log(`params新闻id是：${this.$route.params.id}`)
     }
   }
   </script>
   ```

> 嵌套路由

应用场景：一般在后台管理系统的主页面（或是布局页面）应用比较多，点击左侧菜单，右边显示对应的组件

导航方式：

- 声明式导航：就是写在组件的`<template></template>`标签里面，使用`<router-link></router-link>`标签进行跳转
- 编程式导航：主要是在`script`的`methods`方法中，通过`this.$router.push`进行导航跳转

注意：

- 编程式导航就是调用`this.$router`对象的那些方法 https://router.vuejs.org/zh/guide/essentials/navigation.html
- 嵌套路由其实就是，在一个已有的路由规则中，配置好`children`属性 https://router.vuejs.org/zh/guide/essentials/nested-routes.html
- **嵌套路由子路由中的path，前面不能加`/`，否则会被当成根路径处理**

实现步骤：

1. 先创建好两个页面`Login.vue`和`Layout.vue`，并且写好里面的内容，下面是`Login.vue`的代码

   ```vue
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
   ```

2. 在`src/router/index.js`中配置好路由规则，设置重定向的页面路径为`/login`

   ```js
   // 导入子组件
   import NewsList from '@/components/NewsList'
   import FoodList from '@/components/FoodList'
   import NewsDetail from '@/components/NewsDetail'
   import Login from '@/components/Login'
   import Layout from '@/components/Layout'
   
   // 创建路由对象，设置路由规则
   const router = new VueRouter({
     routes: [
       { path: '/newslist', component: NewsList },
       { path: '/foodlist', component: FoodList },
       { path: '/', redirect: '/login' },
       // query 传参配置
       { path: '/newsdetail', component: NewsDetail },
       // params 传参配置
       { path: '/newsdetail/:id', component: NewsDetail },
       { path: '/login', component: Login },
       { path: '/layout', component: Layout }
     ]
   })
   ```

3. 创建`Layout.vue`页面展示需要的两个子组件`Menu1.vue`、`Menu2.vue`，并写好里面的内容

4. 在`src/router/index.js`中设置`/layout`规则的嵌套路由

   ```js
   import Login from '@/components/Login'
   import Layout from '@/components/Layout'
   import Menu1 from '@/components/Menu1'
   import Menu2 from '@/components/Menu2'
   
   // 创建路由对象，设置路由规则
   const router = new VueRouter({
     routes: [
       { path: '/newslist', component: NewsList },
       { path: '/foodlist', component: FoodList },
       { path: '/', redirect: '/login' },
       // query 传参配置
       { path: '/newsdetail', component: NewsDetail },
       // params 传参配置
       { path: '/newsdetail/:id', component: NewsDetail },
       { path: '/login', component: Login },
       {
         path: '/layout',
         component: Layout,
         children: [
           // 这里的path，前面不能加/，否则会被当成根路径处理
           { path: 'menu1', component: Menu1 },
           { path: 'menu2', component: Menu2 }
         ]
       }
     ]
   })
   ```

5. 写好`Layout.vue`中的内容，注意，需要在`Layout.vue`左边使用`<router-link to="路径"></router-link>`设置好声明式导航，右边使用`<router-view></router-view>`设置好路由出口

   ```vue
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
   ```

## Axios

网址：https://www.kancloud.cn/yunye/axios/234845

基本概念：Axios 是一个基于 promise 的 HTTP 库，**用于发送网络请求**，可以用在浏览器和 node.js 中。

特点：

- 从浏览器中创建 [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- 从 node.js 创建 [http](http://nodejs.org/api/http.html) 请求
- 支持 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

注意：

- 我们今天只需要把axios的基本用法(`GET`，`POST`，`PUT`，`DELETE`)、基准路径设置、拦截器设置等知识点弄明白即可
- 关于对axios的封装，我们在后续的项目中会进行逐步深入讲解

> 基本使用

目标：完成基本的`GET`、`POST`、`PUT`、`DELEET`请求

注意：

- **`GET`和`DELETE`都是是通过url传参，建议写在第二个参数上，通过`params: {aaa:bbb,yyy:zzz}`传参**
- **`POST`和`PUT`都是通过请求体传参，也是写在第二个参数上，但是不需要设置`params`属性，直接写`{aaa:bbb,yyy:zzz}`即可，这个要和`GET`、`DELETE`区别一下**
- **如果需要设置请求头，一定要注意，如果是`GET`和`DELETE`请求，则是要写在第二个参数上，和`params`同级，例如`axios.get(url, {params:{aaa:bbb,yyy:zzz},headers: {token:'Dadsafd111'}})`如果是`POST`和`PUT`则写在第三个参数上，例如`axios.post(url, data,{headers: {token:'Dadsfsa222'}})`，强烈建议如果多个地方都需要设置请求头，则统一在请求拦截器中进行处理**

实现步骤：

1. 安装axios，`npm i axios`

2. 创建一个`Axios.vue`组件，并且配置好路由，以供测试

3. 写好`Axios.vue`里面的代码

   ```vue
   <template>
     <div>
       axios测试演练
       <p>
         <button @click="getPerson">发送GET请求</button>&nbsp;
         <button @click="addPerson">发送POST请求</button>&nbsp;
         <button @click="updatePerson">发送PUT请求</button>&nbsp;
         <button @click="deletePerson">发送DELETE请求</button>&nbsp;
       </p>
     </div>
   </template>
   
   <script>
   import axios from 'axios'
   export default {
     methods: {
       // 获取
       async getPerson () {
         const res = await axios.get('http://localhost:3006/api/person', {
           params: {
             name: 'zhangsan'
           }
         })
   
         console.log(res.data)
       },
       // 新增
       async addPerson () {
         const res = await axios.post('http://localhost:3006/api/person', {
           name: 'lisi',
           age: 30
         })
   
         console.log(res.data)
       },
       // 修改
       async updatePerson () {
         const res = await axios.put('http://localhost:3006/api/person/1002', {
           name: 'wangwu',
           age: 35
         })
   
         console.log(res.data)
       },
       // 删除
       async deletePerson () {
         const res = await axios.delete('http://localhost:3006/api/person/1003', {
           params: {
             name: 'zhaoliu',
             age: 40
           }
         })
   
         console.log(res.data)
       }
     }
   }
   </script>
   ```

> 其它配置

工作中用得比较多的就是设置`axios`的基准路径，例如：axios.defaults.baseURL = 'http://localhost:3006/api/'

**设置基准路径之后，在调用`axios`相应的方法，发送请求的时候，只需要写基准路径后面的路径即可**

```vue
<template>
  <div>
    axios测试演练
    <p>
      <button @click="getPerson">发送GET请求</button>&nbsp;
      <button @click="addPerson">发送POST请求</button>&nbsp;
      <button @click="updatePerson">发送PUT请求</button>&nbsp;
      <button @click="deletePerson">发送DELETE请求</button>&nbsp;
    </p>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3006/api/'
export default {
  methods: {
    // 获取
    async getPerson () {
      // const res = await axios.get('http://localhost:3006/api/person', {
      const res = await axios.get('person', {
        params: {
          name: 'zhangsan'
        }
      })

      console.log(res.data)
    },
    // 新增
    async addPerson () {
      const res = await axios.post('person', {
        name: 'lisi',
        age: 30
      })

      console.log(res.data)
    },
    // 修改
    async updatePerson () {
      const res = await axios.put('person/1002', {
        name: 'wangwu',
        age: 35
      })

      console.log(res.data)
    },
    // 删除
    async deletePerson () {
      const res = await axios.delete('person/1003', {
        params: {
          name: 'zhaoliu',
          age: 40
        }
      })

      console.log(res.data)
    }
  }
}
</script>
```

> 拦截器

拦截器可以让`axios`在请求发送出去之前，以及响应数据回来之后，做一些统一处理

分类：

- **请求拦截器，可以在请求发送出去之前做一些事情，比如，统一设置请求头信息**
- **响应拦截器，可以在响应数据回来之后，对返回数据统一做一些处理**

代码实现：

```vue
<template>
  <div>
    axios测试演练
    <p>
      <button @click="getPerson">发送GET请求</button>&nbsp;
      <button @click="addPerson">发送POST请求</button>&nbsp;
      <button @click="updatePerson">发送PUT请求</button>&nbsp;
      <button @click="deletePerson">发送DELETE请求</button>&nbsp;
    </p>
  </div>
</template>

<script>
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:3006/api/'

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.token = 'Dadadf1111'
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default {
  methods: {
    // 获取
    async getPerson () {
      // const res = await axios.get('http://localhost:3006/api/person', {
      const res = await axios.get('person', {
        params: {
          name: 'zhangsan'
        }
      })

      console.log(res.data)
    },
    // 新增
    async addPerson () {
      const res = await axios.post('person', {
        name: 'lisi',
        age: 30
      })

      console.log(res.data)
    },
    // 修改
    async updatePerson () {
      const res = await axios.put(
        'person/1002',
        {
          name: 'wangwu',
          age: 35
        }
        // { headers: { token: 'adfafadf21212' } }
      )

      console.log(res.data)
    },
    // 删除
    async deletePerson () {
      const res = await axios.delete('person/1003', {
        params: {
          name: 'zhaoliu',
          age: 40
        }
        // headers: { token: 'Dadf1121' }
      })

      console.log(res.data)
    }
  }
}
</script>
```

## Async

> 作用

解决回调函数嵌套的问题，是Promise的升级版，它可以让我们的异步代码，看上去像'同步'一样的执行

> 语法

```js
async function asyncFunc() {
	const res = await promise对象
}
```

> 注意点

- async 和 await 一般是一起使用的
- 实际开发中，如果能使用async，尽量使用async

