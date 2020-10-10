<template>
  <div class="player">
    <audio ref="audioRef" controls autoPlay :src="audioURL" loop></audio>
  </div>
</template>

<script>
import bus from '@/common/bus'
export default {
  data () {
    return {
      audioURL: ''
    }
  },
  mounted () {
    // 监听播放音乐事件
    bus.$on('playMusic', async id => {
      const res = await this.$http.get(`song/url?id=${id}`)

      this.audioURL = res.data && res.data[0].url
    })
    // 监听暂停播放音乐事件
    bus.$on('pauseMusic', () => {
      this.$refs.audioRef.pause()
    })
  }
}
</script>

<style lang="less" scoped>
.player {
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
audio {
  width: 100%;
  border-radius: none;
  outline: none;
}
</style>
