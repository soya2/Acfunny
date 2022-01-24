<template>
  <div>
    <h3>推荐视频</h3>
    <div v-if="hasRecommend" class="video-list">
      <video-card
        v-for="item in recommendVideo"
        :key="item.key"
        type="horizontal"
        :videoData="item"
      />
    </div>
    <div v-else class="empty-message">暂无推荐</div>
    <div class="line" />
    <h3>最近观看</h3>
    <div v-if="hasHistory" class="video-list">
      <video-card
        v-for="item in historyVideo"
        :key="item.key"
        type="horizontal"
        :videoData="item"
      />
    </div>
    <div v-else class="empty-message">暂无观看记录</div>
    <div class="line" />
    <h3>最近收藏</h3>
    <div v-if="hasFavorite" class="video-list">
      <video-card
        v-for="item in favoriteVideo"
        :key="item.key"
        type="horizontal"
        :videoData="item"
      />
    </div>
    <div v-else class="empty-message">暂无收藏</div>
    <div class="line" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import VideoApi from '@/api/video'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'

export interface UserInfoOption {
  showHistory: boolean;
  showFavorite: boolean;
  history: number[];
  recommend: number[];
  favorite: number[];
}
export default defineComponent({
  name: 'UserInfo',
  components: {
    VideoCard
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          showHistory: false,
          showFavorite: false,
          history: [],
          recommend: [],
          favorite: []
        }
      }
    }
  },
  setup (props) {
    const recommendVideo = ref([] as VideoData[])
    const historyVideo = ref([] as VideoData[])
    const favoriteVideo = ref([] as VideoData[])
    const hasRecommend = ref(false)
    const hasHistory = ref(false)
    const hasFavorite = ref(false)
    const getVideoList = async (option: UserInfoOption) => {
      try {
        const { history, recommend, favorite } = option
        if (recommend.length > 0) {
          const { data } = await VideoApi.getVideoList(0, recommend)
          recommendVideo.value = data
          hasRecommend.value = data.length > 0
        } else {
          hasRecommend.value = false
        }
        if (option.showHistory && history.length > 0) {
          const { data } = await VideoApi.getVideoList(0, history)
          historyVideo.value = data
          hasHistory.value = data.length > 0
        } else {
          hasHistory.value = false
        }
        if (option.showFavorite && favorite.length > 0) {
          const { data } = await VideoApi.getVideoList(0, favorite)
          favoriteVideo.value = data
          hasFavorite.value = data.length > 0
        } else {
          hasFavorite.value = false
        }
      } catch {}
    }
    getVideoList(props.option as UserInfoOption)
    watch(props, (val) => {
      getVideoList(val.option as UserInfoOption)
    })

    return {
      recommendVideo,
      hasRecommend,
      historyVideo,
      hasHistory,
      favoriteVideo,
      hasFavorite
    }
  }
})
</script>

<style lang="scss" scoped>
.user-data-bar {
  display: flex;
  justify-content: space-between;
  margin: .8rem 0;
  .avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 2rem;
    .name {
      font-size: 2rem;
      font-weight: bold;
    }
    .intro {
      margin-right: .6rem;
      color: gray;
    }
  }
  .button-bar {
    display: flex;
    align-items: center;
    & > * { margin-left: 1rem; }
    .info-btn {
      font-size: 1rem;
    }
  }
}
.video-list {
  display: flex;
  flex-wrap: wrap;
  & > * { width: 33%; }
}
</style>
