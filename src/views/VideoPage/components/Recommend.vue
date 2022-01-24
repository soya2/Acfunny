<template>
  <h3 style="margin: 0 0 1em 0;">大家都在看</h3>
  <video-card
    type="horizontal"
    v-for="item in recommendList"
    :key="item.id"
    :videoData="item"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'
import VideoApi from '@/api/video'
export default defineComponent({
  name: 'Recommend',
  components: {
    VideoCard
  },
  setup () {
    const recommendList = ref([] as VideoData[])
    const getRecommendVideoList = async (list: number[]) => {
      const { data } = await VideoApi.getVideoList(0, list)
      recommendList.value = data
    }
    onMounted(() => getRecommendVideoList([1, 2]))

    return {
      recommendList
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
