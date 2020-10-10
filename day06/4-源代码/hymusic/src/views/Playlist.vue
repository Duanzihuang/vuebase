<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <p class="title">{{ title }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="avatarUrl" alt />
          <span class="name">{{ nickname }}</span>
          <span class="time"
            >{{ createTime | formatTime('YYYY-MM-DD') }} 创建</span
          >
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="item in tags" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ description }}</span>
        </div>
      </div>
    </div>
    <div class="content-wrap">
      <table class="el-table playlit-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in songList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>
              <div class="img-wrap" @click="playMusic(item.id)">
                <img :src="item.al.picUrl" alt />
                <span class="iconfont icon-play"></span>
              </div>
            </td>
            <td>
              <div class="song-wrap">
                <div class="name-wrap">
                  <span>{{ item.name }}</span>
                  <!-- mv图标 -->
                  <span
                    v-if="item.mv != 0"
                    @click="toMV(item.mv)"
                    class="iconfont icon-mv"
                  ></span>
                </div>
                <span>{{ item.subTitle }}</span>
              </div>
            </td>
            <td>{{ item.ar[0].name }}</td>
            <td>{{ item.al.name }}</td>
            <td>{{ item.dt | formatDuration }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '@/common/bus'
export default {
  data () {
    return {
      // 标题
      title: '',
      // 头像
      avatarUrl: '',
      // 封面图
      coverImgUrl: '',
      // 简介
      description: '',
      // 昵称
      nickname: '',
      // 标签
      tags: [],
      // 创建时间
      createTime: '',
      // 歌曲列表
      songList: []
    }
  },
  mounted () {
    this.getPlaylistData()
  },
  methods: {
    async getPlaylistData () {
      const res = await this.$http.get(
        `playlist/detail?id=${this.$route.query.id}`
      )

      this.songList = res.playlist.tracks
      this.title = res.playlist.name
      this.avatarUrl = res.playlist.creator.avatarUrl
      this.coverImgUrl = res.playlist.coverImgUrl
      this.nickname = res.playlist.creator.nickname
      this.tags = res.playlist.tags
      this.createTime = res.playlist.createTime
      this.description = res.playlist.description
    },
    // 播放音乐
    playMusic (id) {
      bus.$emit('playMusic', id)
    },
    // 跳转mv
    toMV (id) {
      this.$router.push(`/mv/${id}`)
    }
  }
}
</script>

<style lang="less">
.playlist-container {
  margin: auto;
  padding-top: 40px;
  .top-wrap {
    display: flex;
    color: gray;
    span {
      font-size: 17px;
    }
    .img-wrap {
      margin-right: 30px;
      img {
        width: 230px;
        height: 230px;
      }
    }
    .info-wrap {
      .title {
        margin-bottom: 20px;
      }
      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .name {
          margin-right: 10px;
        }
        .time {
          font-size: 14px;
        }
      }
      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        span {
          color: white;
          &.iconfont {
            margin-right: 8px;
          }
          &.text {
            font-size: 16px;
          }
        }
      }
      .tag-wrap {
        display: flex;
        margin-bottom: 15px;
        span {
          margin: 0;
        }
        ul {
          display: flex;
          align-items: center;
        }
        li {
          font-size: 15px;
          &:not(:last-child)::after {
            content: '/';
            margin: 0 4px;
          }
        }
      }
      .desc-wrap {
        span {
          &:last-child {
            font-size: 15px;
          }
        }
      }
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  .content-wrap {
    margin-top: 10px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
