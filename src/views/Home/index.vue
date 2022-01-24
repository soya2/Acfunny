<template>
  <div class="container">
    <video-card-bar
      title="Subscription"
      :video-data-list="userSubscriptionBar"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onBeforeMount } from 'vue'
import VideoCardBar from './components/VideoCardBar.vue'
import { VideoData } from '@/components/VideoCard.vue'

export default defineComponent({
  name: 'Home',
  components: {
    VideoCardBar
  },
  setup () {
    const data = reactive({
      userSubscriptionBar: [] as VideoData[]
    })

    onBeforeMount(async () => {
      data.userSubscriptionBar = [
        {
          id: 1,
          title: 'this is a video title',
          posterName: 'admin',
          cover: 'https://scpic.chinaz.net/files/pic/pic9/201901/zzpic16289.jpg',
          isLive: true
        }
      ]
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped>
</style>
