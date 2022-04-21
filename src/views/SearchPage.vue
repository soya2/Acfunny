<template>
  <div class="search-container">
    <h3>{{ keyword }}的搜索结果</h3>
    <div class="divider" />
    <div class="video-grid">
      <video-card
        v-for="video in videoList"
        :key="video.id"
        :videoData="video"
      />
    </div>
    <div class="empty" v-show="videoList.length === 0">没有搜索到结果</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'
import { VideoApi } from '@/api'

export default defineComponent({
  name: 'SearchPage',
  components: { VideoCard },
  setup () {
    const keyword = ref('')
    onBeforeRouteUpdate((to) => {
      keyword.value = to.params.keyword as string || ''
      getVideoList()
    })
    const videoList = ref<VideoData[]>([])
    const getVideoList = async () => {
      const { data } = await VideoApi.getVideoListByKeyword(keyword.value)
      videoList.value = data
    }
    const route = useRoute()
    keyword.value = route.params.keyword as string || ''
    getVideoList()
    return {
      keyword,
      videoList
    }
  }
})
</script>

<style lang="scss" scoped>
.search-container {
  padding: 1rem 4rem;
}
.divider {
  height: 1px;
  width: 100%;
  background-color: #ececec;
}
.video-grid {
  display: flex;
  flex-wrap: wrap;
  & > * {
    width: 14%;
    min-width: 10rem;
  }
}
.empty {
  display: flex;
  justify-content: center;
  padding: 4rem;
  color: gray;
}
</style>
