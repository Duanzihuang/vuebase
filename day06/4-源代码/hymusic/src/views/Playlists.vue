<template>
  <div class="playlists-container">
    <!-- 顶部内容 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="topCover" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">{{ topName }}</div>
        <div class="info">{{ topDesc }}</div>
      </div>
      <img :src="topCover" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <!-- 内容部分 -->
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: cat == '全部' }"
          @click="cat = '全部'"
          >全部</span
        >
        <span
          class="item"
          :class="{ active: cat == '欧美' }"
          @click="cat = '欧美'"
          >欧美</span
        >
        <span
          class="item"
          :class="{ active: cat == '华语' }"
          @click="cat = '华语'"
          >华语</span
        >
        <span
          class="item"
          :class="{ active: cat == '流行' }"
          @click="cat = '流行'"
          >流行</span
        >
        <span
          class="item"
          :class="{ active: cat == '说唱' }"
          @click="cat = '说唱'"
          >说唱</span
        >
        <span
          class="item"
          :class="{ active: cat == '摇滚' }"
          @click="cat = '摇滚'"
          >摇滚</span
        >
        <span
          class="item"
          :class="{ active: cat == '民谣' }"
          @click="cat = '民谣'"
          >民谣</span
        >
        <span
          class="item"
          :class="{ active: cat == '电子' }"
          @click="cat = '电子'"
          >电子</span
        >
        <span
          class="item"
          :class="{ active: cat == '轻音乐' }"
          @click="cat = '轻音乐'"
          >轻音乐</span
        >
        <span
          class="item"
          :class="{ active: cat == '影视原声' }"
          @click="cat = '影视原声'"
          >影视原声</span
        >
        <span
          class="item"
          :class="{ active: cat == 'ACG' }"
          @click="cat = 'ACG'"
          >ACG</span
        >
        <span
          class="item"
          :class="{ active: cat == '怀旧' }"
          @click="cat = '怀旧'"
          >怀旧</span
        >
        <span
          class="item"
          :class="{ active: cat == '治愈' }"
          @click="cat = '治愈'"
          >治愈</span
        >
        <span
          class="item"
          :class="{ active: cat == '旅行' }"
          @click="cat = '旅行'"
          >旅行</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in topPlayLists"
            :key="index"
            @click="toPlayList(item.id)"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | formatCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 顶部的标题
      topName: '',
      // 顶部的描述
      topDesc: '',
      // 顶部的封面
      topCover: '',
      // 选中的分类
      cat: '全部',
      // 歌单分类
      cats: [
        '全部',
        '欧美',
        '华语',
        '流行',
        '说唱',
        '摇滚',
        '民谣',
        '电子',
        '轻音乐',
        '影视原声',
        'ACG',
        '怀旧',
        '治愈',
        '旅行'
      ],
      // 精品歌单列表
      topPlayLists: []
    }
  },
  mounted () {
    // 获取封面图数据
    this.getHighqualityData()
    // 获取歌单列表数据
    this.getTopPlayListsData()
  },
  watch: {
    cat () {
      this.getTopPlayListsData()
    }
  },
  methods: {
    async getHighqualityData () {
      const res = await this.$http.get('top/playlist/highquality?limit=1')

      this.topName = res.playlists[0].name
      this.topDesc = res.playlists[0].description
      this.topCover = res.playlists[0].coverImgUrl
    },
    async getTopPlayListsData () {
      const res = await this.$http.get(
        `top/playlist?limit=10&offset=0&cat=${this.cat}`
      )

      this.topPlayLists = res.playlists
    },
    toPlayList (id) {
      this.$router.push(`/playlist?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.playlists-container {
  .top-card {
    padding: 20px;
    height: 200px;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    .icon-wrap {
      margin-right: 20px;
      z-index: 1;
      img {
        width: 160px;
        height: 160px;
      }
    }
    .content-wrap {
      z-index: 1;
      .tag {
        color: #dfac67;
        border: 1px solid #dfac67;
        width: 100px;
        height: 30px;
        text-align: center;
        border-radius: 5px;
        font-size: 16px;
        line-height: 30px;
        cursor: pointer;
      }
      .title {
        color: white;
        padding-top: 10px;
      }
      .info {
        color: #888482;
        font-size: 14px;
        padding-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }
    }
    .bg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      filter: blur(20px);
    }
    .bg-mask {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .tab-container {
    padding-top: 30px;
    .tab-bar {
      display: flex;
      justify-content: flex-end;
      .item {
        font-size: 15px;
        color: gray;
        margin-right: 20px;
        cursor: pointer;
        &.active {
          color: #dd6d60;
        }
      }
    }
    .tab-content {
      margin-top: 20px;
      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 200px;
          margin: 10px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          img {
            width: 200px;
            height: 200px;
            border-radius: 5px;
          }
          .num-wrap {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 14px;
            color: white;
            line-height: 30px;
            background: rgba(0, 0, 0, 0.5);
            height: 30px;
            width: 100%;
            padding-left: 5px;
            top: -30px;
            overflow: hidden;
          }
          &:hover .num-wrap {
            top: 0;
          }
          .img-wrap {
            position: relative;
            .icon-play {
              position: absolute;
              right: 10px;
              bottom: 13px;
              width: 40px;
              height: 40px;
              color: #dd6d60;
              font-size: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0;
              &::before {
                transform: translateX(3px);
              }
            }
            &:hover .icon-play {
              opacity: 1;
            }
          }
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
