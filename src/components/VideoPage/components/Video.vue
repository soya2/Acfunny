<template>
  <!-- https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4 -->
  <video
    :src="videoSrc"
    controls
    class="video-container"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Video',
  props: {
    videoSrc: {
      type: String,
      default: ''
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
