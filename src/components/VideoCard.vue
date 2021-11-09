<template>
  <div
    class="card-container slide-border"
    @click="handleClick(videoData.id)"
  >
    <img :src="videoData.url"  alt="no-image"/><br />
    <div v-if="videoData.isLive" class="is-live">Live</div>
    <span class="vc-title">{{ videoData.title }}</span>
    <span class="vc-poster">{{ videoData.poster }}</span>
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
  isLive?: boolean;
}

export default defineComponent({
  name: 'VideoCard',
  props: {
    videoData: {
      type: Object as PropType<VideoData>,
      required: true
    }
  },
  setup () {
    const handleClick = (id: number) => {
      return id
    }
    return {
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  padding: 4px 8px 10px 8px;
  margin: 8px;
  border-radius: 4px;
  position: relative;
  & > * { cursor: pointer; }
  &:not(:first-child) { padding-left: 8px; }
  &:hover img { box-shadow: 0 4px 12px #d7d7d7; }
  img {
    border-radius: 4px;
    width: 100%;
    transition: .4s;
  }
  .is-live {
    padding: 4px 8px;
    background-color: #ff2337;
    color: white;
    font-size: 0.8rem;
    border-radius: 4px;
    position: absolute;
    top: 12px;
    left: 16px;
  }
  .vc-title {
    font-size: 1.2rem;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .vc-poster {
    text-align: justify;
    color: rgb(150, 150, 150);
  }
}
</style>
