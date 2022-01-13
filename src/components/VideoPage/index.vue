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
          <!-- <span>弹幕{{ videoData.danmaku }}</span> -->
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
      <div class="poster-bar">
        <div class="avatar">
          <img :src="posterData.avatar" >
          <span>{{ posterData.name }}</span>
        </div>
        <button class="btn-primary follow">
          <font-awesome-icon icon="plus" />
          关注
        </button>
      </div>
    </div>
    <div class="right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import IconButton, { IconButtonType } from '@/components/IconButton/IconButton.vue'
import Message from '@/utils/message'
import { getUserById } from '@/api/users'

export default defineComponent({
  name: 'VideoPage',
  components: {
    IconButton
  },
  setup () {
    const route = useRoute()
    const { id: videoId } = route.query
    const videoData = ref({
      id: videoId,
      posterId: 1,
      title: 'This is Video Title',
      playCount: 3615,
      danmaku: 52,
      comment: 13,
      like: 421,
      favorite: 54,
      banana: 1453
    })
    document.title = videoData.value.title
    const posterData = ref({
      avatar: '',
      history: '',
      id: -1,
      name: '',
      notice: 0,
      subscript: ''
    })
    const getUserData = async () => {
      const { code, data } = await getUserById(videoData.value.posterId)
      if (code !== 0) Message.error('获取上传者信息失败')
      posterData.value = data
    }
    getUserData()

    const { like, favorite } = videoData.value
    const buttonBarList = ref([
      { id: 1, icon: 'thumbs-up', tip: '点赞', color: '#fd4c5d', type: 'checkbox', followNumber: like },
      { id: 2, icon: 'star', tip: '收藏', color: '#f3dc36', type: 'checkbox', followNumber: favorite },
      { id: 5, icon: 'share', tip: '分享', color: 'green' },
      { id: 6, icon: 'gavel', tip: '举报' }
    ] as IconButtonType[])

    return {
      videoData,
      posterData,
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
    .poster-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .avatar {
        display: flex;
        img {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
        }
        span {
          margin-left: 1rem;
          font-size: 1.4rem;
          font-weight: bold;
        }
      }
      .follow {
        width: 6rem;
      }
    }
  }
  .right {
    border: 1px solid green;
  }
}
</style>
