<template>
  <div class="vc-bar">
    <div
      v-if="title.trim() !== ''"
      class="bar-title"
    >
      <font-awesome-icon icon="star" />
      {{ title }}
    </div>
    <div class="list">
      <video-card
        v-for="video in videoDataList"
        :key="video.id"
        :video-data="video"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'

export default defineComponent({
  name: 'VideoCardBar',
  components: {
    VideoCard
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    videoDataList: {
      type: Array as PropType<VideoData[]>,
      require: true
    }
  }
})
</script>

<style lang="scss" scoped>
.vc-bar {
  width: 100%;
  border-bottom: 2px solid rgb(232, 232, 232);
  .bar-title {
    padding-left: 16px;
    font-size: 1.6rem;
    font-weight: bold;
    color: #ffd116;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    & > * {
      width: 14%;
      min-width: 10rem;
    }
  }
}
</style>
