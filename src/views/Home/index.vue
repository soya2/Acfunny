<template>
  <div>
    <keep-alive>
      <video-card-bar
        title="Subscription"
        :videoDataList="videoList"
      />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { VideoApi } from '@/api'
import { defineComponent, ref } from 'vue'
import VideoCardBar from './components/VideoCardBar.vue'

export default defineComponent({
  name: 'Home',
  components: {
    VideoCardBar
  },
  setup () {
    const videoList = ref([])
    const getVideoList = async () => {
      try {
        const { data } = await VideoApi.getVideoList(1, 10)
        videoList.value = data
      } catch {}
    }
    getVideoList()

    return {
      videoList
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
