# Day03

## 组件

作用：实现视图、逻辑`复用`，并且简化代码结构，利用分工协作

分类：

- 全局组件、局部组件
- 传统html组件、单文件组件

注意：

- 以后在实际开发过程中都是使用`单文件组件`、所以传统的html组件我们只需要了解一下即可
- **组件的视图中必须有且仅有一个根元素，一般是div**
- **在组件中的data必须是一个函数**

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>01-组件</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <div id="app">
      <login></login>
      <my-footer />
    </div>
  </body>
  <script>
    // 注册组件（带逻辑）
    Vue.component('login', {
      // 描述组件视图
      template: `
            <div>
                用户名：<input type="text" v-model="username"/><br/>
                密码：<input type="password" v-model="password"/><br/>
                <button @click="login">登录</button>
            </div>
          `,
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
    })
    // 注册组件（不带逻辑）
    Vue.component('my-footer', {
      template: `<div>
        <p>关于我们| 联系我们| 联系客服| 合作招商| 商家帮助| 营销中心| 手机京东| 友情链接| 销售联盟| 京东社区| 风险监测| 隐私政策| 京东公益| English Site| Media & IR</p>
      </div>`
    })
    var vm = new Vue({
      el: '#app'
    })
  </script>
</html>
```

## 单文件组件(推荐)

概念：单文件组件就是一个以`.vue`结尾的文件，但是默认情况下，浏览器解析不了`.vue`结尾文件中的内容，需要我们借助vue的脚手架`@vue/cli`才能解析单文件组件中的内容，所以我们需要先安装vue的脚手架`@vue/cli`

组成部分：

- `template`：写视图的地方**（必须）**
- `script`：写逻辑的地方
- `style`：写样式的地方

注意：

- `template`中必须有且仅有一个根元素，一般是div
- `script`中的data必须是一个函数，通过`import`的方式导入其它模块或是组件
- `style`中可以设置`scoped`让样式私有，同时还支持预处理语言`less`、`scss`等

实现步骤：

1. 先创建一个文件夹`components_test`

2. 在`components_test`文件夹中创建一个根组件`App.vue`，并且写好里面的三部分内容

3. 打开终端，切换到`components_test`目录，执行`vue serve App.vue`，然后打开浏览器输入http://localhost:8080/即可看到效果，代码如下

   ```vue
   <template>
     <div>
       <p class="test">
         {{ msg }}<br />
         <button @click="changeMsg">change</button>
       </p>
     </div>
   </template>
   
   <script>
   export default {
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
   ```

4. 在`components_test`文件夹下，再创建一个`components`文件夹，里面创建两个子组件`MyFooter`和`Login`子组件

5. 分别写好`MyFooter`子组件和`Login`子组件中的内容

6. 在`App.vue`的script代码中，通过`import`的方式导入两个子组件，然后通过`components`属性注册这两个子组件

7. 在`App.vue`的template代码中，就可以使用刚刚注册的这两个子组件查看效果了

注意：

- **如果我们使用vue脚手架的快速原型开发来查看效果的话，我们还需要额外安装一个全局包`@vue/cli-service-global`，安装命令`npm i @vue/cli-service-global -g`**
- 使用快速原型开发，当我们更改了源代码之后，脚手架会帮助我们进行编译和重新运行
- 如果不想手动的输入http://localhost:8080/，也可以在运行的时候，直接在指令后面加上`--open`，比如`vue serve App.vue --open`
- 当运行了`vue serve App.vue --open`之后，它会在项目目录下生成一个`node_modules`文件夹，里面存放的是一些依赖信息，不用管它

代码实现：

`App.vue`中的代码

```vue
<template>
  <div>
    <!-- <p class="test">
      {{ msg }}<br />
      <button @click="changeMsg">change</button>
    </p> -->
    <login />
    <my-footer />
  </div>
</template>

<script>
import Login from './components/Login'
import MyFooter from './components/MyFooter'
export default {
  components: {
    Login,
    MyFooter
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
```

`components/Login.vue`中的代码

```vue
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
```

`components/MyFooter.vue`中的代码

```vue
<template>
  <div class="footer">
    <p>
      关于我们| 联系我们| 联系客服| 合作招商| 商家帮助| 营销中心| 手机京东|
      友情链接| 销售联盟| 京东社区| 风险监测| 隐私政策| 京东公益| English Site|
      Media & IR
    </p>
  </div>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
}
p {
  text-align: center;
}
</style>
```

## Vue脚手架

作用：帮我们生成项目(实际工作中的项目都是由脚手架生成的)、并且解析里面的`.vue`结尾的文件中的内容

安装：

1. 先安装`node`，建议node的版本最好新一些，不能太旧，需要 [Node.js](https://nodejs.org/) v8.9 或更高版本 (推荐 v10 以上)
2. 打开终端，执行 `npm install -g @vue/cli`，建议在网络比较好的时候安装，否则容易失败

验证：

​		在终端里面输入`vue --version`，如果能看到版本号，就代表成功了

使用：

- 快速原型开发：可以使用 `vue serve` 命令对单个 `*.vue` 文件进行快速原型开发（但是还要先安装一个全局包`@vue/cli-service-global`），一般用于简单演示
- 生成项目：执行`vue create project_name`，然后根据提示进行进一步操作

注意：

- 项目名称不能是包的名称，比如`vue`、`vuex`、`npm`...，尽量取得有意义一些
- 生成项目的时候，尽量在非中文目录下生成，避免后续安装包失败

## 组件间传值

> 父组件传值给子组件

传值方式：主要是通过属性(`props`)的方式进行传递

实现步骤：

1. 在`components`目录下创建`Parent.vue`和`Child.vue`两个组件，写好它们各自的内容
2. 在`App.vue`中导入并且注册、使用`Parent.vue`组件
3. 在`父组件`中，引入并且注册、使用`子组件`
4. 在`父组件`的template中，使用子组件的时候，通过属性的方式给子组件传值
5. 在`子组件`的script中，通过`props`属性来接收父组件传递过来的值

注意：

- 父组件传递到子组件中的数据，不要进行更改
- 子组件中props的写法有两种，一种是数组（无法对传递的数据类型等进行控制），另外一种是对象（可以对传递的数据类型、默认值等进行控制）

代码实现：

`Parent.vue`中的代码

```vue
<template>
  <div>
    我是父组件<br />
    <child name="zhangsan" :age="30" />
  </div>
</template>

<script>
import Child from './Child'
export default {
  components: {
    Child
  }
}
</script>
```

`Child.vue`中的代码

```vue
<template>
  <div>
    子组件<br />
    name is {{ name }},age is {{ age }}
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
  }
}
</script>
```

> 子组件传值给父组件

传值方式：通过触发自定义事件来传递

实现步骤：

1. 在`子组件`中通过`this.$emit('自定义事件名称',参数)`的方式传值
2. 在`父组件`的template中使用子组件的时候，监听自定义事件，并且写好处理函数来接收值

注意：

- 自定义事件的名称不要和系统提供的名称相冲突，比如不能使用`click`、`keyup`等事件名

代码实现：

`Child.vue`中的代码

```vue
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
```

`Parent.vue`中的代码

```vue
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
```

> 兄弟组件传值（公共bus）

传值方式：通过公共的bus进行传值

实现步骤：

1. 在项目根目录下创建一个`common`文件夹，里面创建一个`bus.js`模块，在里面创建一个公共的Vue实例，并且导出
2. 在`components`文件夹下，创建`Brother1.vue`和`Brother2.vue`两个组件，并且写好里面各自的内容
3. 在`App.vue`中引入并且注册、使用`Brother1.vue`和`Brother2.vue`
4. 在`Brother1.vue`中导入公共的`bus`，并且使用公共的`bus`，触发自定义事件来传值
5. 在`Brother2.vue`中导入公共的`bus`，并且在生命周期钩子`mounted`中，使用`bus`来监听自定义事件，并且获取值

代码实现：

`bus.js`中的代码

```js
import Vue from 'vue'

const bus = new Vue()

export default bus
```

`Brother1.vue`中的代码

```vue
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
```

`Brother2.vue`中的代码

```vue
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
```

> 兄弟组件传值（Vuex）

说明：Vuex的内容比较多，也稍微有点难，这个暂时放到后面的项目中去讲解

