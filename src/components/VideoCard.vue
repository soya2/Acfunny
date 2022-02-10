<template>
  <div>
    <div
      v-if="type === 'vertical'"
      class="card-container slide-border"
    >
      <img
        :src="cover"
        alt="no-image"
        @click="handleClick(videoData.id)"
      /><br />
      <!-- <div v-if="videoData.isLive" class="is-live">Live</div> -->
      <span
        class="vc-title"
        @click="handleClick(videoData.id)"
      >{{ videoData.title }}</span>
      <span class="vc-poster">{{ videoData.posterName }}</span>
    </div>
    <div
      v-if="type === 'horizontal'"
      class="recommend-item slide-border"
    >
      <img
        :src="cover"
        @click="handleClick(videoData.id)"
      />
      <div class="item-info">
        <span
          class="title"
          @click="handleClick(videoData.id)"
        >{{ videoData.title }}</span>
        <span class="poster">{{ videoData.posterName }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { ImagesApi } from '@/api'

export interface VideoData {
  id: number;
  title: string;
  posterName: string;
  cover: string;
  isLive?: boolean;
}

export default defineComponent({
  name: 'VideoCard',
  props: {
    type: {
      type: String,
      default: 'vertical'
    },
    videoData: {
      type: Object as PropType<VideoData>,
      required: true
    }
  },
  setup (props) {
    const cover = ref('')
    const getCover = async (name: string) => {
      if (name.trim() === '') return
      cover.value = await ImagesApi.getImage(name)
    }
    getCover(props.videoData.cover)
    const router = useRouter()
    const handleClick = (id: number) => {
      router.push({
        path: '/video',
        query: { id }
      })
    }
    return {
      cover,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.card-container {
  padding: 4px;
  margin: 4px 8px;
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
    width: 10%;
    height: 6%;
    padding: 0 8px 4px 8px;
    background-color: #ff2337;
    color: white;
    font-size: 50%;
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
.recommend-item {
  display: flex;
  border-radius: 4px;
  padding: .2rem;
  height: 6rem;
  img {
    height: 6rem;
    width: 10rem;
    border-radius: 4px;
    box-shadow: 0 2px 8px 4px rgb(232, 232, 232);
    cursor: pointer;
  }
  .item-info {
    margin-left: .6rem;
    & > * { cursor: pointer; }
    .title {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .poster {
      color: #969696;
      font-size: .8rem;
    }
  }
}
</style>
