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
