<template>
  <div v-if="hasList">
    <div
      class="history-item"
      v-for="(item, index) in videoList"
      :key="item.id"
    >
      <div class="index">{{ index + 1 }}</div>
      <video-card
        class="video"
        :videoData="item"
        type="horizontal"
      />
    </div>
  </div>
  <div v-else class="empty-message">暂无视频</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import VideoCard, { VideoData } from '@/components/VideoCard.vue'
import VideoApi from '@/api/video'
export default defineComponent({
  name: 'History',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
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
        if (!props.isShow || idList.length === 0) {
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
.history-item {
  margin: .4rem 0;
  display: flex;
  .index {
    width: 10%;
    padding-right: 2%;
    color: rgb(201, 201, 201);
    text-align: right;
    font-style: italic;
    font-size: 4rem;
  }
  .video {
    flex: 1;
  }
}
</style>
