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
