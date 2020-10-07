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
