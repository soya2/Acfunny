<template>
  <div class="container">
    <video-card
      v-for="video in cardData"
      :key="video.id"
      class="basic-block"
      :video-data="video"
      @handleClick="jumpToPlay"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onBeforeMount } from 'vue'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'
import { getTestData } from '@/api/test'

export default defineComponent({
  name: 'TestPage',
  components: {
    VideoCard
  },
  setup () {
    const data = reactive({
      cardData: [] as VideoData[]
    })
    onBeforeMount(() => {
      getTestData().then(res => {
        data.cardData = res.data
      })
    })
    const jumpToPlay = (id :number): unknown => {
      return id
    }
    return {
      ...toRefs(data),
      jumpToPlay
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .block-a {
    width: 200px;
  }
}
</style>
