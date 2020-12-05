# Day02

## computed(计算属性)

作用：计算属性，可以根据模型中的值，自动计算出对应的值

注意：

- 计算属性要写在computed中
- **计算属性必须返回值**
- 在使用计算属性的时候，不要加`()`，这个跟`methods`是不一样的
- 计算属性一上来就会调用一次

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>01-computed</title>
    <!-- 引入vue.js -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- MVVM中的 view -->
    <div id="app">
      <input v-model.number="num" type="text" /><br />
      平方值:{{squareValue}}
    </div>

    <script>
      // MVVM中的 vm 和 model
      var vm = new Vue({
        el: '#app',
        data: {
          num: 5
        },
        computed: {
          squareValue () {
            return this.num * this.num
          }
        }
      })
    </script>
  </body>
</html>
```

## watch(监听器)

作用：侦听器、监听器，可以监测模型中的值，当模型中的值发生了改变之后，可以执行对应的方法

注意：

- 如果要进行深度监听，需要添加上`deep:true`，深度监听一般是针对对象或是数组元素值的更改
- 如果需要在侦听开始之后被立即调用，需要设置`immediate: true`

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>02-watch</title>
    <!-- 引入vue.js -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- MVVM中的 view -->
    <div id="app">
      <input v-model="firstName" type="text" />
      <input v-model="lastName" type="text" />
      {{fullName}}
      <br /><br />
      <input v-model="person.name" type="text" />
      <br />
      <ul>
        <li v-for="item in persons" :key="item.id">
          {{item.name}}-{{item.age}}
        </li>
      </ul>
      <button @click="addPerson">add</button>
      <button @click="changePerson">change</button>
    </div>

    <script>
      // MVVM中的 vm 和 model
      var vm = new Vue({
        el: '#app',
        data: {
          firstName: '',
          lastName: '',
          fullName: '',
          person: {
            name: 'lisi',
            age: 30
          },
          persons: [{ id: 1001, name: 'zhangsan', age: 80 }]
        },
        watch: {
          firstName (newValue, oldValue) {
            console.log(newValue, oldValue)
            this.fullName = newValue + ' ' + this.lastName
          },
          lastName (newValue, oldValue) {
            this.fullName = this.firstName + ' ' + newValue
          },
          person: {
            deep: true, // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
            handler: function (newValue) {
              console.log(newValue)
            }
          },
          persons: {
            immediate: true, // 该回调将会在侦听开始之后被立即调用
            deep: true, // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
            handler: function (newValue) {
              console.log(newValue)
            }
          }
        },
        methods: {
          addPerson () {
            this.persons.push({ id: 1002, name: 'lisi', age: 30 })
          },
          changePerson () {
            this.persons[1].name = 'wangwu'
            this.persons[1].age = 20
          }
        }
      })
    </script>
  </body>
</html>
```

## filter(过滤器)

作用：做模型中的数据进行过滤，过滤完成之后，进行显示

注意：

- 过滤器也分为全局过滤器与局部过滤器
- **过滤器必须有返回值**
- 过滤器中`|`前面的就是过滤器函数的第一个参数
- 如果要接其它参数，则可以在`|`右边中调用过滤器的时候，传递
- 如果传递了其它参数，则其它参数则作为过滤器的第二参数或是更后面的参数

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>03-filter</title>
    <!-- 引入vue.js -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 引入moment -->
    <script src="https://cdn.bootcdn.net/ajax/libs/moment.js/1.0.0/moment.js"></script>
  </head>
  <body>
    <!-- MVVM中的 view -->
    <div id="app">
      日期是：<span>{{date | formatDate}}</span><br /><br />
      时间是：<span>{{date | formatTime('HH:mm:ss')}}</span>
    </div>

    <script>
      // MVVM中的 vm 和 model
      var vm = new Vue({
        el: '#app',
        data: {
          date: new Date()
        },
        filters: {
          formatDate (val) {
            return moment(val).format('YYYY-MM-DD')
          },
          formatTime (val, format) {
            return moment(val).format(format)
          }
        }
      })
    </script>
  </body>
</html>
```

## 生命周期

作用：这个是vue给我们提供的一系列函数，在不同的时间段进行调用，我们可以在不同的钩子函数中实现不同的业务逻辑

注意：

- 由于暂时还没有学习到组件和路由，所以有些生命周期暂时还无法演示，等学习到了组件和路由再演示
- 在以后的项目中，不是所有的生命周期钩子都用得上，但是我们要了解生命周期带给我们的好处

分类：

- 初始化阶段：beforeCreate、created、beforeMount、mounted
- 运行阶段：beforeUpdate、updated、activated、deactivated
- 销毁阶段：beforeDestroy、destroyed

应用场景：

- created、mounted：发送网络请求
- beforeDestroy：销毁定时器等操作
- 其它多个钩子排列组合一起来使用

代码实现：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>04-life</title>
    <!-- 引入vue.js -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  </head>
  <body>
    <!-- MVVM中的 view -->
    <div id="app">
      <p>{{msg}}</p>
      <button @click="msg = '你好'">change</button>
    </div>

    <script>
      // MVVM中的 vm 和 model
      var vm = new Vue({
        el: '#app',
        data: {
          msg: 'Hello World'
        },
        beforeCreate () {
          console.log('---beforeCreate---')
        },
        created () {
          console.log('---created---')
        },
        beforeMount () {
          console.log('---beforeMount---')
        },
        mounted () {
          console.log('---mounted---')
        },
        beforeUpdate () {
          console.log('---beforeUpdate---')
        },
        updated () {
          console.log('---updated---')
        }
      })
    </script>
  </body>
</html>
```

## 综合案例（图书管理）

目标：能单独完成图书管理的增删改查操作

涉及到的知识点：

- 指令：差值表达式、v-for、v-bind、v-model、自定义指令
- computed(计算属性)
- watch(监听器)
- filter(过滤器)
- 生命周期钩子

注意事项：

**该例子中，我们主要是把之前学习的知识点运用起来，里面有些小细节可以暂时先忽略，比如非空校验、id重复、删除提示等等**


实现步骤：

1. 在`mounted`钩子中，给`books`模型赋值
2. 使用v-for完成图书列表的渲染
3. 使用`filter`对遍历的日期进行格式化（需要使用到moment.js这个第三方库）
4. 使用`computed`来计算图书的总数
5. 通过`v-model`获取编号和名称的值
6. 通过`watch`来监听name的输入，如果发现名字已经存在则提交不可用
7. 然后新增操作
8. 然后修改操作（需要先给两个input赋值，并且把`isEdit`设置为true，最后点击提交的时候进行修改操作）
9. 完成删除操作
10. 记得新增和修改完毕之后把`isEdit`设置为false，方便下次操作

代码实现

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>06-图书管理</title>
    <!-- 引入vue.js -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <!-- 引入moment -->
    <script src="https://cdn.bootcdn.net/ajax/libs/moment.js/1.0.0/moment.js"></script>
    <style type="text/css">
      .grid {
        margin: auto;
        width: 530px;
        text-align: center;
      }
      .grid table {
        border-top: 1px solid #c2d89a;
        width: 100%;
        border-collapse: collapse;
      }
      .grid th,
      td {
        padding: 10;
        border: 1px dashed #f3dcab;
        height: 35px;
        line-height: 35px;
      }
      .grid th {
        background-color: #f3dcab;
      }
      .grid .book {
        padding-bottom: 10px;
        padding-top: 5px;
        background-color: #f3dcab;
      }
      .grid .total {
        height: 30px;
        line-height: 30px;
        background-color: #f3dcab;
        border-top: 1px solid #c2d89a;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <div class="grid">
        <div>
          <h1>图书管理</h1>
          <div class="book">
            <div>
              <label for="id">
                编号：
              </label>
              <input :disabled="isEdit" type="text" v-model="id" id="id" />
              <label for="name">
                名称：
              </label>
              <input v-focus type="text" v-model="name" id="name" />
              <button :disabled="submitFlag" @click="submit">提交</button>
            </div>
          </div>
        </div>
        <div class="total">
          <span>图书总数：</span>
          <span>{{total}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>名称</th>
              <th>时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in books" :key="item.id">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.date | formatTime}}</td>
              <td>
                <a @click.prevent="update(item.id,item.name)" href="">修改</a>
                <span>|</span>
                <a @click.prevent="del(item.id)" href="">删除</a>
              </td>
            </tr>
            <tr v-if="books.length === 0">
              <td colspan="4">暂无数据~</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <script>
      Vue.directive('focus', {
        inserted: function (el) {
          // 聚焦元素
          el.focus()
        }
      })
      Vue.filter('formatTime', (val, formatStr = 'YYYY-MM-DD HH:mm:ss') => {
        return moment(val).format(formatStr)
      })
      var vm = new Vue({
        el: '#app',
        data: {
          id: '',
          name: '',
          isEdit: false, // 是否是编辑
          submitFlag: false,
          books: []
        },
        computed: {
          total () {
            return this.books.length
          }
        },
        mounted () {
          // 该生命周期钩子函数被触发的时候，模板已经可以使用
          // 一般此时用于获取后台数据，然后把数据填充到模板
          var data = [
            {
              id: 1,
              name: '三国演义',
              date: 2525609975000
            },
            {
              id: 2,
              name: '水浒传',
              date: 2525609975000
            },
            {
              id: 3,
              name: '红楼梦',
              date: 2525609975000
            },
            {
              id: 4,
              name: '西游记',
              date: 2525609975000
            }
          ]
          this.books = data
        },
        watch: {
          name (val) {
            this.submitFlag = this.books.find(item => item.name === val)
          }
        },
        methods: {
          // 提交
          submit () {
            if (this.isEdit) {
              // 编辑
              const item = this.books.find(item => item.id === this.id)

              item.name = this.name
              item.date = new Date()
            } else {
              // 新增
              this.books.push({
                id: this.id,
                name: this.name,
                date: new Date()
              })
            }

            this.id = ''
            this.name = ''
            this.isEdit = false
          },
          // 删除
          del (id) {
            const index = this.books.findIndex(item => item.id === id)

            this.books.splice(index, 1)
          },
          // 修改
          update (id, name) {
            this.id = id
            this.name = name
            this.isEdit = true
          }
        }
      })
    </script>
  </body>
</html>
```



