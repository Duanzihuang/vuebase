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
