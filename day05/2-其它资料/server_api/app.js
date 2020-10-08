const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  next()
})

// 处理请求
// GET 请求
app.get('/api/person', (req, res) => {
  res.json({
    status: 0,
    message: '获取数据成功',
    data: {
      name: req.query.name || '张三',
      age: req.query.age || 20
    }
  })
})

// POST请求
app.post('/api/person', (req, res) => {
  res.json({
    status: 0,
    message: '新增数据成功',
    data: {
      id: 1001,
      name: req.body.name || '张三',
      age: req.body.age || 20
    }
  })
})

// PUT请求
app.put('/api/person/:id', (req, res) => {
  if (req.headers.token) {
    res.json({
      status: 0,
      message: '修改数据成功',
      data: {
        id: req.params.id || 1001,
        name: req.body.name || '张三',
        age: req.body.age || 20
      }
    })
  } else {
    res.json({
      status: 1,
      message: '修改数据时token不能为空'
    })
  }
})

// DELETE请求
app.delete('/api/person/:id', (req, res) => {
  if (req.headers.token) {
    res.json({
      status: 0,
      message: '删除数据成功',
      data: {
        id: req.params.id || 1001,
        name: req.query.name || '张三',
        age: req.query.age || 20
      }
    })
  } else {
    res.json({
      status: 1,
      message: '删除数据时token不能为空'
    })
  }
})

// 启动监听
app.listen(3006)
