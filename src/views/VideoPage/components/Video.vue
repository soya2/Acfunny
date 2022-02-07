<template>
  <video
    :src="`/api/video/videoStream?videoId=${videoId}`"
    controls
    class="video-container"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Video',
  props: {
    videoId: {
      type: Number,
      default: -1
    }
  },
  setup () {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  height: 500px;
  background-color: black;
  color: white;
}
</style>
