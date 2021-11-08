<template>
  <div
    class="card-container"
    @click="handleClick(videoData.id)"
  >
    <img :src="videoData.url" />
    <h5>{{ videoData.title }}</h5>
    <p>{{ videoData.poster }}</p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue'

export interface VideoData {
  id: number;
  title: string;
  poster: string;
  url: string;
}

export default defineComponent({
  name: 'VideoCard',
  props: {
    videoData: {
      type: Object as PropType<VideoData>,
      required: true
    }
  },
  setup (props, context) {
    const handleClick = (id: number): void => {
      context.emit('handleClick', id)
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.card-container {
  width: 20%;
  padding: 4px;
  margin: 8px;
  img {
    border-radius: 2px;
    width: 100%;
  }
  h5, p {
    margin: 4px 0;
  }
  p {
    text-align: justify;
    text-justify: inter-ideograph;
    padding-left: 10px;
    color: rgb(150, 150, 150);
  }
}
</style>
