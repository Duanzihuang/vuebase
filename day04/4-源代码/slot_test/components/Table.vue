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
