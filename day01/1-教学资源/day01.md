# Day01

## 基本概念

> vue官网

https://cn.vuejs.org/

> vue是什么？

渐进式 JavaScript 框架

> 特点

- 易用
- 灵活
- 高效

> 关于版本

vue2.x（2.6.12）

```
目前企业中用得最多的版本，也是生态最丰富的版本
```

vue3.0

```bash
未来趋势，但是生态还不太成熟，建议先学习好vue2.x，然后再去学习3.0

传送门：https://www.bilibili.com/video/BV1ui4y137WP?from=search&seid=6167576013348550829
```

> 如何学习好Vue

1. 上课认真听，听懂
2. 课下多敲，并且敲完之后多思考

## Hello World

> 目的：体验下第一个vue代码是如何编写的，并体会下MVVM的设计模式

> MVVM设计模式

- M：model 模型（数据）
- V：view 视图（页面内容）
- VM: view-model 逻辑控制（实现模型数据与视图的交互）

> 代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello World</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view)，并且使用vue中的指令插值表达式 -->
    <div id="app">
      <p>{{message}}</p>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          message: 'Hello World'
        }
      })
    </script>
  </body>
</html>
```

## 指令
> 作用 && 书写规范

作用：替代dom操作，提高开发效率。

书写规范：除了差值表达式外，其它指令几乎都是以 `v-` 开头（有些指令支持简写比如 `v-on:` 可以简写成 `@`，`v-bind:` 可以简写成 `:`，`v-slot:`可以简写成`#`），写在元素的属性上面。

> 差值表达式

作用：将模型中的值交给视图显示，并且在模型值改变之后更新视图的内容

语法：**写在元素标签之间，跟其它vue指令不太一样（其它指令是写在元素属性上面的）**

特点：**差值表达式支持简单的逻辑运算与三元运算**

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>02-差值表达式</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view)，并且使用vue中的指令插值表达式 -->
    <div id="app">
      <p>{{message}}</p>
      <p>{{isMan ? '男士' : '女士'}}</p>
      <p>{{number + 3}}</p>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          message: 'Hello World',
          isMan: true,
          number: 6
        }
      })
    </script>
  </body>
</html>
```

> v-text && v-html

作用：跟差值表达式差不多，也是将模型中的值交给视图显示，并且在模型值改变之后更新视图的内容，只是写法上不一样。

区别：v-html相比于v-text，可以解析模型数据中的html标签

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>03-v-text&v-html</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view)-->
    <div id="app">
      <p v-text="msssage"></p>
      <p v-text="isMan ? '男士' : '女士'"></p>
      <p v-text="number + 3"></p>
      <p v-text="html"></p>
      <p v-html="html"></p>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          message: 'Hello World',
          isMan: true,
          number: 6,
          html: '<p style="color:red;"> v-text 与 v-html </p>'
        }
      })
    </script>
  </body>
</html>
```

> v-bind

应用场景：当视图上面的内容，希望它可以动态变化的时候（也就是不写死），使用`v-bind`

语法：v-bind:属性名，比如 `v-bind:src="模型中的值"`，同时支持简写 `:src="模型中的值"`

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>04-v-bind</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <img v-bind:src="imgUrl" alt="" />
      <a v-bind:href="linkUrl">传送门</a>
      <br />
      <!-- 简写 -->
      <img :src="imgUrl" alt="" />
      <a :href="linkUrl">传送门</a>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          imgUrl:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601882460073&di=16d5c9912052cd5d375c81dcbabe7b70&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fbaike%2Fpic%2Fitem%2F0b14ad195b4c801542a9ad7e.jpg',
          linkUrl: 'http://www.baidu.com'
        }
      })
    </script>
  </body>
</html>
```

> v-on

作用：事件处理

注意事项：

- 事件处理函数要写在methods中，如果不写上实现方法也没有在`v-on`后面写上方法实现，则会报错
- 如果逻辑比较简单，可以直接写在`v-on`后面，但是如果方法逻辑比较多，建议写在`methods`中
- `v-on`可以简写成`@`
- 事件处理如果没有传递参数，默认会把事件对象传递到函数中
- 如果传递了参数，则默认的事件对象会消失，如果想要获取到事件对象，得单独传递`$event`这个参数
- 可以使用事件修饰符去处理一些特殊操作，比如 `@click.stop`、`@keyup.enter`，
- 更多事件修饰符参考：https://cn.vuejs.org/v2/api/#v-on

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>05-v-on</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <p>{{msg}}</p>
      <button v-on:click="changeMsg">change</button>
      <button v-on:click="changeMsgEvent">changeEvent</button>
      <button v-on:click="changeMsg2('你好')">change2</button>
      <button v-on:click="changeMsg2Event('你好啊',$event)">
        change2Event
      </button>
      <br />
      <br />
      <div
        style="width:200px;height:200px;background-color: red;"
        @click="parentClick"
      >
        <div
          style="width:100px;height:100px;background-color: green;"
          @click.stop="childClick"
        ></div>
      </div>
      <br />
      <input @keyup.enter="search" placeholder="请输入关键字搜索" type="text" />
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          msg: 'Hello World'
        },
        methods: {
          changeMsg () {
            this.msg = 'Hello Vue'
          },
          changeMsgEvent (event) {
            console.log(event)
          },
          changeMsg2 (msg) {
            this.msg = msg
          },
          changeMsg2Event (msg, event) {
            this.msg = msg
            console.log(event)
          },
          childClick () {
            console.log('child click')
          },
          parentClick () {
            console.log('parent click')
          },
          search (event) {
            console.log('搜索', event.target.value)
          }
        }
      })
    </script>
  </body>
</html>
```

> v-model

作用：双向数据绑定，大部分应用场景都是获取表单元素的值
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>06-v-model</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <form>
        用户名：<input
          v-model="username"
          type="text"
          placeholder="请输入用户名"
        /><br />
        密码：<input
          v-model="password"
          type="password"
          placeholder="请输入密码"
        /><br />
        <input @click.prevent="login" type="submit" value="登 录" />
      </form>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          username: 'admin',
          password: '123456'
        },
        methods: {
          login () {
            console.log(this.username, this.password)
          }
        }
      })
    </script>
  </body>
</html>
```
**使用 v-bind + @input 实现 v-model**

v-model其实是一个语法糖，我们可以通过学过的v-bind和监听input的input的事件来实现，实现代码如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>07-v-bind+@input</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <form>
        用户名：<input
          name="username"
          :value="username"
          @input="changeValue"
          type="text"
          placeholder="请输入用户名"
        /><br />
        密码：<input
          name="password"
          :value="password"
          @input="changeValue"
          type="password"
          placeholder="请输入密码"
        /><br />
        <input @click.prevent="login" type="submit" value="登 录" />
      </form>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          username: 'admin',
          password: '123456'
        },
        methods: {
          login () {
            console.log(this.username, this.password)
          },
          changeValue (event) {
            this[event.target.name] = event.target.value
          }
        }
      })
    </script>
  </body>
</html>
```


> v-if && v-show

作用：条件渲染

注意：在显示和隐藏的应用场景下，如果要频繁进行切换建议使用v-show，如果只有当达到某个条件才执行的话，使用v-if

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>08-v-if&v-show</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      成绩：
      <p v-if="score > 80">优秀</p>
      <p v-else-if="score > 70">良好</p>
      <p v-else-if="score > 60">及格</p>
      <p v-else="score > 60">不及格</p>
      <br />
      <p v-if="isShow">v-if</p>
      <p v-show="isShow">v-show</p>
      <button @click="isShow = !isShow">toggle</button>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          score: 80,
          isShow: true
        }
      })
    </script>
  </body>
</html>
```

> v-for

作用：列表渲染

注意：

- `v-for`后面的模型不仅仅可以遍历数组，还可以是对象或是数字
- 遍历的时候，记得给每一行添加唯一的key


```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>09-v-for</title>
    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <ul>
        <li v-for="(item,index) in persons" :key="item.id">
          {{index + 1}}、{{item.name}}-{{item.age}}-{{item.address}}
        </li>
      </ul>
      <p v-for="(value,name,index) in person" :key="name">
        {{index}}-{{name}}-{{value}}
      </p>
      <span v-for="item in 5" :key="item">{{item}}</span>
    </div>

    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          persons: [
            { id: 1001, name: '张三丰', age: 666, address: '武当山' },
            { id: 1002, name: '张无忌', age: 600, address: '光明顶' },
            { id: 1003, name: '赵敏', age: 600, address: '大都' },
            { id: 1004, name: '尼古拉斯.赵四', age: 630, address: '大都' }
          ],
          person: {
            id: 1005,
            name: '段正淳',
            age: 600,
            address: '大理'
          }
        }
      })
    </script>
  </body>
</html>
```

> v-clock & v-once & v-pre(不常用)

作用：

- v-clock：解决vue.js加载缓慢造成闪烁的问题
- v-once：只编译一次
- v-pre：不编译，原样输出

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>10-v-cloak&v-once&v-pre</title>
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <p v-cloak>{{msg}}</p>
      <!-- <p v-once>{{msg}}</p>
      <p v-pre>{{msg}}</p> -->
      <button @click="msg='Hello Vue'">change</button>
    </div>

    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      var vm = new Vue({
        el: '#app',
        data: {
          msg: 'Hello World'
        }
      })
    </script>
  </body>
</html>
```

> v-slot

说明：这个指令，等到我们讲到组件插槽的时候，再来讲解

注意：`v-slot:`可以简写成`#`

## 自定义指令

> 何时使用？

当系统提供的指令不能满足要求时，我们可以通过自定义指令来实现我们的需求，但是自定义指令我们在开发中一般用得比较少

> 注意点

- 自定义指令分为全局与局部两种
- 自定义指令可以有值也可以没有值
- 在定义自定义指令的时候，前面不要加`v-`，在标签中使用的时候，要加上`v-`

> 案例

input输入框自动获取焦点（没有值）：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>11-自定义指令(无值)</title>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <input v-focus type="text" />
    </div>

    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      //   Vue.directive('focus', {
      //     // 当被绑定的元素插入到 DOM 中时……
      //     inserted: function (el) {
      //       // 聚焦元素
      //       el.focus()
      //     }
      //   })
      var vm = new Vue({
        el: '#app',
        directives: {
          focus: {
            // 指令的定义
            inserted: function (el) {
              el.focus()
            }
          }
        }
      })
    </script>
  </body>
</html>
```

input设置背景色（有值）：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>12-自定义指令(有值)</title>
  </head>
  <body>
    <!-- 2.0 写好视图部分(MVVM中的view) -->
    <div id="app">
      <!-- 完整写法 -->
      <input v-color="{color:'purple'}" type="text" />
    </div>

    <!-- 1.0 引入vue.js文件 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      // 3.0 创建vue实例(MVVM中的vm)，并且写好el、data(MVVM中的model)中的内容
      /**
       * 参数说明
       * el: 告诉vue实例解析哪块内容
       * data：这个是模型数据，给视图展示提供数据的
       */
      //   Vue.directive('focus', {
      //     // 当被绑定的元素插入到 DOM 中时……
      //     inserted: function (el) {
      //       // 聚焦元素
      //       el.focus()
      //     }
      //   })
      var vm = new Vue({
        el: '#app',
        directives: {
          color: {
            // 指令的定义
            inserted: function (el, binding) {
              el.style.backgroundColor = binding.value.color
            }
          }
        }
      })
    </script>
  </body>
</html>
```

