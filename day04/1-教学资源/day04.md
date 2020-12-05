# Day04

## Slot(插槽)

说明：**插槽这部分知识点，有了使用ElementUI组件库的经验之后更好理解，所以把这部分知识点放在项目中去讲解**

作用：可以实现父子组件间的传值`（视图传递）`，但是跟之前的父子组件传值还略有不同，之前大部分都是模型数据的传递，而`slot(插槽)`则更多的是**视图内容**的传递，当然也有模型数据之间的传递`(作用域插槽中子传父)`

为什么需要用到插槽：**让我们组件的内容显示更加灵活**

如何理解：**与其说是传值，更不如说是`替换+显示`**

生活中例子：**小霸王游戏机中的插槽**

![](assets/u=1847362934,3876587894&fm=26&gp=0.jpg)

分类：

- 默认插槽
- 具名插槽
- 作用域插槽`（难一些，不太好理解）`

应用场景：

​	 一般在第三方UI组件(`ElementUI`)或是自己封装的一些公共组件中（`比如自己封装一个Dialog、Message等`）用得比较多

> 默认插槽

语法：在`子组件`中写一个`<slot></slot>`标签占位，然后`父组件`在它的template中使用子组件的时候，**可以在子组件的标签名之间，写上需要呈现的内容，那么这块内容将会替换子组件中`<slot></slot>`的位置**

注意：

- `<slot></slot>`标签无论在默认插槽、还是具名插槽，或是作用域插槽中，必须写在`子组件`中
- 如果`<slot>默认内容</slot>`中写了内容，那么当父组件在template中使用子组件的时候，标签之间不写内容，则slot中的默认内容就会起作用呈现出来
- 一个子组件中默认只能有一个默认插槽，如果子组件中有多个部分需要被替换，那么需要使用具名插槽

实现步骤：

1. 先创建一个`slot_test`文件夹，里面创建好`App.vue`，写好里面的内容
2. 在`slot_test`文件夹下创建一个`components`文件夹，并且里面创建`Parent.vue`和`Dialog.vue`两个组件，并写好内容
3. 在`App.vue`中引入、注册、使用`Parent.vue`子组件
4. 在`Parent.vue`中引入、注册、使用`Dialog.vue`子组件
5. 在`Dialog.vue`子组件中写好内容，并且写好`<slot></slot>`标签，里面可以写些默认内容
6. 在`Parent.vue`父组件template中使用`Dialog.vue`子组件标签的时候，可以给它写需要呈现的内容
7. 把终端切换到`slot_test`文件夹下，运行`vue serve App.vue --open`查看效果

代码实现：

`App.vue`中的代码

```vue
<template>
  <div>
    <parent />
  </div>
</template>

<script>
import Parent from './components/Parent'
export default {
  components: {
    Parent
  }
}
</script>
```

`Parent.vue`中的代码

```vue
<template>
  <div>
    <my-dialog>
      <div>
        活动名称：<input /><br />
        活动区域：<input />
      </div>
    </my-dialog>
    <hr />
    <my-dialog>
      <table>
        <tr>
          <th>日期</th>
          <th>姓名</th>
          <th>地址</th>
        </tr>
        <tr>
          <td>2020-10-07</td>
          <td>王小虎</td>
          <td>广东省深圳市</td>
        </tr>
      </table>
    </my-dialog>
  </div>
</template>

<script>
import MyDialog from './Dialog'
export default {
  components: {
    MyDialog
  }
}
</script>
```

`Dialog.vue`中的代码

```vue
<template>
  <div>
    <h1>提示</h1>
    <div>
      <slot>如果没有传递，则默认显示这些内容</slot>
    </div>
  </div>
</template>
```

> 具名插槽

什么需要使用？：**当子组件中有多个部分都需要替换的时候，就需要使用具名插槽，因为单一一个默认插槽是不够用的**

语法：在写具名插槽的时候，我们只需要在`<slot name="插槽名字"></slot>`标签上面写好name属性即可

注意：

- 具名插槽一定要写名字，名字写在`slot`标签的属性上，并且具名插槽的`slot`标签中间也可以写默认内容
- 父组件在template中，使用子组件的时候，在子组件标签之间，如果想替换某个具名插槽，一般通过`<template v-slot:插槽名字>要显示出来的内容</template>`这样来替换
- `v-slot:`可以简写成`#`
- **子组件中除了有具名插槽外，也可以写默认插槽，不过一般情况下，默认插槽只会有一个**

实现步骤：

1. 在`Dialog2.vue`中，除了写默认插槽之外，额外再加另个具名插槽`header`、`footer`
2. 在`Parent.vue`中，使用`<template v-slot:插槽名字>要显示出来的内容</template>`来替换你需要的子组件内容部分

代码实现：

`Parent.vue`中的代码

```vue
<template>
  <div>
    <!-- <my-dialog>
      <div>
        活动名称：<input /><br />
        活动区域：<input />
      </div>
    </my-dialog>
    <hr />
    <my-dialog>
      <table>
        <tr>
          <th>日期</th>
          <th>姓名</th>
          <th>地址</th>
        </tr>
        <tr>
          <td>2020-10-07</td>
          <td>王小虎</td>
          <td>广东省深圳市</td>
        </tr>
      </table>
    </my-dialog> -->
    <my-dialog2></my-dialog2>
    <hr />
    <my-dialog2>
      <template v-slot:header>
        <p>收货地址：</p>
      </template>
      <p>这是一段信息</p>
      <template v-slot:footer>
        <button>取消</button>&nbsp;<button>确定</button>
      </template>
    </my-dialog2>
  </div>
</template>

<script>
// import MyDialog from './Dialog'
import MyDialog2 from './Dialog2'
export default {
  components: {
    // MyDialog
    MyDialog2
  }
}
</script>
```

`Dialog2.vue`中的代码

```vue
<template>
  <div>
    <slot name="header">
      <h1>提示</h1>
    </slot>
    <div>
      <slot>如果没有传递，则默认显示这些内容</slot>
    </div>
    <slot name="footer">
      <button>提交</button>
    </slot>
  </div>
</template>
```

> 作用域插槽

说明：作用域插槽其实是把显示内容的控制权交给了父组件（其中涉及到子组件把值传递给父组件，父组件来决定如何显示），**但是最终还是父组件中的内容替换子组件的`slot`部分**

如何理解：**可以参考下`ElementUI`中的`Table`组件是如何实现的**

实现步骤：

1. 先创建一个`MyTable.vue`子组件，里面写好内容
2. 在`MyTable.vue`子组件中，通过`<slot v-bind:属性名称="值"></slot>`将值传递给`父组件`
3. 在`Parent.vue`父组件中，通过`<template v-slot:default="slotProps"></template>`中的`slotProps.属性名称`拿到子组件传递过来的值，**然后再决定如何渲染（实现控制权）**

代码实现：

`Parent.vue`中的代码

```vue
<template>
  <div>
    <my-table :data="tableData">
      <template v-slot:default="slotProps">
        <span
          :style="{
            color: slotProps.person.tag === '家' ? '#409eff' : '#67c23a',
            backgroundColor:
              slotProps.person.tag === '家' ? '#ecf5ff' : '#f0f9eb'
          }"
          >{{ slotProps.person.tag }}</span
        >
      </template>
    </my-table>
  </div>
</template>

<script>
import MyTable from './Table'
export default {
  components: {
    MyTable
  },
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          tag: '家'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区',
          tag: '公司'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区',
          tag: '家'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区',
          tag: '公司'
        }
      ]
    }
  }
}
</script>
```

`Table.vue`中的代码

```vue
<template>
  <div>
    <table>
      <tr>
        <th>日期</th>
        <th>姓名</th>
        <th>地址</th>
        <th>标签</th>
      </tr>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ item.date }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.address }}</td>
        <td>
          <slot v-bind:person="item">{{ item.tag }}</slot>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
```

## 路由(基本使用)

作用：实现单页面应用（SPA）

单页面应用 & 多页面应用：https://www.cnblogs.com/chen-cheng/p/12169902.html

- 多页面应用是**整页刷新**（比如京东[https://www.jd.com/](https://www.jd.com/)、淘宝等购物网站或是门户网站及大部分官网）
- 单页面使用时**局部刷新**（比如网易云音乐[https://music.163.com/](https://music.163.com/)）
- 多页面应用利于SEO，但是页面切换慢，并且容易出现白屏
- 单页面应用不利于SEO，但是切换内容的时候，可以有提示，更加友好

单页面应用 & 多页面应用的应用场景

- 单页面应用：后台管理系统，或是对SEO依赖比较少的官网
- 多页面应用：电商官网或是对SEO依赖度比较高的官网

路由模式：

- **hash：会在url后面带上`#`，底层是使用浏览器的hash实现的**
- **history：在url后面不带`#`，但是只支持IE9及以上的浏览器，底层是使用h5的`history API`实现的**
- abstract：Node.js 环境

> 基本使用

实现效果：

​	通过点击不同的链接，显示不同的组件

实现步骤：

1. 打开终端，执行`vue create route_demo`，然后选择`Default ([Vue 2] babel, eslint)`，等着项目生成

2. 分析下生成的`route_demo`项目

3. 在`src/components`目录下，创建`NewsList.vue`和`FoodList.vue`两个子组件，并且写好里面的内容

4. 安装`vue-router`这个第三方包，`npm install vue-router`

5. 在src目录下创建一个`router`文件夹，里面创建一个`index.js`文件，在里面写好内容，代码如下
	```js
   import Vue from 'vue'
  import VueRouter from 'vue-router'

	// 集成 router-view
	Vue.use(VueRouter)
	
	// 导入子组件
	import NewsList from '@/components/NewsList'
	import FoodList from '@/components/FoodList'
	
	// 创建路由实例
	const router = new VueRouter({
	  // 设置路由规则
	  routes: [
	    { path: '/newslist', component: NewsList },
	    { path: '/foodlist', component: FoodList }
	  ]
	})
	
	export default router
	```
	
6. 在`main.js`中导入`src/router/index.js`中导出的路由对象，并且注入到根实例中，代码如下

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   
   Vue.config.productionTip = false
   
   // 导入路由对象
   import router from '@/router/index'
   
   new Vue({
     render: h => h(App),
     router // 把路由注入到根实例中
   }).$mount('#app')
   ```

7. 更改`App.vue`中的代码，设置好`router-link`和`router-view`代码如下

   ```vue
   <template>
     <div id="app">
       <p>
         <router-link to="/newslist">新闻列表</router-link>&nbsp;&nbsp;
         <router-link to="/foodlist">食品列表</router-link>
       </p>
       <router-view></router-view>
     </div>
   </template>
   
   <script>
   export default {
     name: 'App'
   }
   </script>
   
   <style>
   #app {
     font-family: Avenir, Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     margin-top: 60px;
   }
   </style>
   ```

8. 打开终端，切换到项目根目录，运行`npm run serve`查看效果，如果想每次运行的时候自动打开浏览器，可以在`package.json`中，找到`scripts`下面的`serve`，在它值的最后面加上`--open`即可

>路由模式

vue-router的路由模式主要有两种，一种是`hash`，一种是`history`，要设置路由的模式，只需要在创建路由对象时，指定的路由模式即可，代码如下

`src/router/index.js`中的代码

```js
// 创建路由实例
const router = new VueRouter({
  mode: 'history', // 模式是hash
  // 设置路由规则
  routes: [
    { path: '/newslist', component: NewsList },
    { path: '/foodlist', component: FoodList }
  ]
})
```

> 路由重定向

作用：可以让路由从一个路径，跳转到另外一个路径，比如可以通过路由重定向让路径从`/`跳转到某个具体的路径

应用场景：一般使用路由重定向将`/`路径，跳转到某个具体的路径

代码实现：在`src/router/index.js`的设置路由规则里面配置一跳重定向规则，代码如下

```js
// 创建路由实例
const router = new VueRouter({
  mode: 'history',
  // 设置路由规则
  routes: [
    { path: '/newslist', component: NewsList },
    { path: '/foodlist', component: FoodList },
    // 配置路由重定向
    { path: '/', redirect: '/foodlist' }
  ]
})
```

> 404处理

作用：当路径输入错误的时候，我们通常需要一个404页面来进行匹配

注意：**404规则的配置，最好放在路由配置规则的最后一条**

代码实现：

```js
// 导入子组件
import NewsList from '@/components/NewsList'
import FoodList from '@/components/FoodList'
import NotFound from '@/components/NotFound'

// 创建路由实例
const router = new VueRouter({
  mode: 'history',
  // 设置路由规则
  routes: [
    { path: '/newslist', component: NewsList },
    { path: '/foodlist', component: FoodList },
    // 配置路由重定向
    { path: '/', redirect: '/foodlist' },
    // 404 路由规则配置
    { path: '*', component: NotFound }
  ]
})
```

