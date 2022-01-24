<template>
  <div v-if="hasList" class="video-list">
    <video-card
      v-for="item in videoList"
      :key="item.id"
      :videoData="item"
      type="horizontal"
    />
  </div>
  <div v-else class="empty-message">暂无视频</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'
import VideoApi from '@/api/video'
export default defineComponent({
  name: 'PostVideoList',
  props: {
    list: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },
  components: {
    VideoCard
  },
  setup (props) {
    const videoList = ref([] as VideoData[])
    const hasList = ref(false)
    const getVideoList = async (idList: number[]) => {
      try {
        if (idList.length === 0) {
          hasList.value = false
          return
        }
        const { data } = await VideoApi.getVideoList(0, idList)
        videoList.value = data
        hasList.value = data.length > 0
      } catch {}
    }
    getVideoList(props.list)
    watch(props, (val) => {
      getVideoList(val.list)
    })
    return {
      videoList,
      hasList
    }
  }
})
</script>

<style lang="scss" scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
  & > * { width: 33%; }
}
</style>
