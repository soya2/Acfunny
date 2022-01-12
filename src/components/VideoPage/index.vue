<template>
  <div class="col-main">
    <div class="left">
      <!-- https://klxxcdn.oss-cn-hangzhou.aliyuncs.com/histudy/hrm/media/bg3.mp4 -->
      <video
        controls
        class="video-container"
      >
      </video>
      <h2 style="margin: .4rem 0;">{{ videoData.title }}</h2>
      <div style="display: flex; justify-content: space-between;">
        <div class="count-data">
          <span>播放{{ videoData.playCount }}</span>
          <span>弹幕{{ videoData.danmaku }}</span>
          <span>评论{{ videoData.comment }}</span>
        </div>
        <div class="button-bar">
          <icon-button
            v-for="item in buttonBarList"
            :key="item.id"
            :buttonObject="item"
            class="button-item"
          />
        </div>
      </div>
      <div class="line" />
    </div>
    <div class="right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconButton, { IconButtonType } from '@/components/IconButton/IconButton.vue'
export default defineComponent({
  name: 'VideoPage',
  components: {
    IconButton
  },
  setup () {
    const videoData = ref({
      id: 123,
      title: 'This is Video Title',
      playCount: 3615,
      danmaku: 52,
      comment: 13
    })
    const buttonBarList = ref([
      { id: 1, icon: 'thumbs-up', tip: '点赞' },
      { id: 2, icon: 'star', tip: '收藏' },
      { id: 3, icon: 'thumbs-up', tip: '投蕉' },
      { id: 4, icon: 'thumbs-up', tip: '投桃' },
      { id: 5, icon: 'share', tip: '分享' },
      { id: 6, icon: 'gavel', tip: '举报' }
    ] as IconButtonType[])

    return {
      videoData,
      buttonBarList
    }
  }
})
</script>

<style lang="scss" scoped>
.col-main {
  display: grid;
  grid-template-columns: 75% 1fr;
  padding: 1rem 4rem;
  .left {
    padding-right: 2%;
    .video-container {
      width: 100%;
      height: 500px;
      background-color: black;
      color: white;
    }
    .count-data {
      display: flex;
      align-items: center;
      color: gray;
      & > * {
        margin-right: .6rem;
        font-size: .95rem;
      }
    }
    .button-bar {
      display: flex;
      justify-content: flex-end;
      .button-item {
        margin-left: .6rem;
      }
    }
  }
  .right {
    border: 1px solid green;
  }
}
</style>
