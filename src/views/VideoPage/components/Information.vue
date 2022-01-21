<template>
  <h2 style="margin: .4rem 0;">{{ videoData.title }}</h2>
  <div style="display: flex; justify-content: space-between;">
    <div class="count-data">
      <span>播放 {{ videoData.playCount }}</span>
      <!-- <span>弹幕{{ videoData.danmaku }}</span> -->
      <span>评论 {{ videoData.comment }}</span>
      <span>上传时间 {{ dateParse(videoData.uploadTime) }}</span>
    </div>
    <div class="button-bar">
      <icon-button
        :ref="setButtonsRef"
        v-for="item in buttonBarList"
        :key="item.id"
        :buttonObject="item"
        :followNumber="item.followNumber"
        class="button-item"
        @handleClickIcon="handleClickIcon"
      />
    </div>
  </div>
  <div class="line" />
  <div class="poster-bar">
    <div class="avatar">
      <img :src="posterData.avatar" >
      <div class="poster-info">
        <div>{{ posterData.name }}</div>
        <div class="introduction">{{ posterData.introduction }}</div>
      </div>
    </div>
    <Button
      :content="followContent"
      front-icon="plus"
      width="6rem"
      :isLoading="followButtonLoading"
      :isCheck="isFollow"
      @click="handleClickFollowButton"
    />
  </div>
  <div class="tags-bar">
    <Tag
      v-for="tag in videoData.tags"
      :key="tag"
      :tagName="tag"
    />
  </div>
  <div class="summary" v-html="videoData.summary" />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import Message from '@/utils/message'
import { dateParse } from '@/utils/index'
import IconButton, { IconButtonType } from '@/components/IconButton/IconButton.vue'
import Button from '@/components/Button.vue'
import Tag from '@/components/Tag.vue'
import UserApi from '@/api/users'
import VideoApi from '@/api/video'

export default defineComponent({
  name: 'Information',
  components: {
    IconButton,
    Button,
    Tag
  },
  props: {
    videoId: {
      type: Number,
      default: -1
    }
  },
  setup (props) {
    const videoData = ref({
      id: -1,
      posterId: -1,
      posterName: '',
      title: '',
      uploadTime: '',
      playCount: 0,
      danmaku: 0,
      comment: 0,
      like: 0,
      favorite: 0,
      banana: 0,
      tags: [],
      summary: ''
    })
    const posterData = ref({
      id: -1,
      avatar: '',
      name: ''
    })
    const buttonBarList = ref([
      { id: 1, icon: 'thumbs-up', tip: '点赞', color: '#fd4c5d', type: 'checkbox', followNumber: 0 },
      { id: 2, icon: 'star', tip: '收藏', color: '#f3dc36', type: 'checkbox', followNumber: 0 },
      { id: 5, icon: 'share', tip: '分享', color: 'green' },
      { id: 6, icon: 'gavel', tip: '举报' }
    ] as IconButtonType[])
    const buttonList: { isCheck: boolean }[] = []
    const setButtonsRef = (el: { isCheck: boolean }) => buttonList.push(el)

    const followButtonLoading = ref(false)
    const isFollow = ref(false)
    const followContent = computed(() => {
      return isFollow.value ? '已关注' : '关注'
    })
    const handleClickFollowButton = async () => {
      if (followButtonLoading.value) return
      followButtonLoading.value = true
      try {
        const { code, msg } = await UserApi.follow(
          Number(window.localStorage.getItem('userId')),
          videoData.value.posterId,
          !isFollow.value
        )
        if (code === 0) {
          isFollow.value = !isFollow.value
        } else {
          Message.error(msg)
        }
      } finally {
        followButtonLoading.value = false
      }
    }

    const getUserData = async (id: number) => {
      const { code, data } = await UserApi.getUserById(id)
      if (code !== 0) Message.error('获取上传者信息失败')
      posterData.value = data
    }
    const getVideoData = async (id: number) => {
      const { code, data, msg } = await VideoApi.getVideoById(id)
      if (code === 0) {
        videoData.value = data
        document.title = videoData.value.title
        buttonBarList.value[0].followNumber = data.like
        buttonBarList.value[1].followNumber = data.favorite
        buttonList[0].isCheck = data.isLike
        buttonList[1].isCheck = data.isFavorite
        isFollow.value = data.isFollow
        await VideoApi.addVideoPalyCount(videoData.value.id)
        await getUserData(videoData.value.posterId)
      } else {
        Message.error(msg)
      }
    }
    onMounted(() => {
      getVideoData(props.videoId)
    })

    const handleClickIcon = async (id: number, isCheck: boolean) => {
      const target = buttonBarList.value.find(item => item.id === id)
      if (target && isCheck !== undefined) {
        const t = isCheck ? 1 : -1
        if (id === 1) {
          const { code, msg } = await VideoApi.likeVideo(
            Number(window.localStorage.getItem('userId')),
            videoData.value.id,
            isCheck
          )
          if (code !== 0) {
            buttonList[0].isCheck = false
            return Message.error(msg)
          }
        }
        if (id === 2) {
          const { code, msg } = await VideoApi.favoriteVideo(
            Number(window.localStorage.getItem('userId')),
            videoData.value.id,
            isCheck
          )
          if (code !== 0) {
            buttonList[1].isCheck = false
            return Message.error(msg)
          }
        }
        target.followNumber += t
      }
    }

    return {
      videoData,
      posterData,
      buttonBarList,
      setButtonsRef,
      followButtonLoading,
      isFollow,
      followContent,
      handleClickFollowButton,
      handleClickIcon,
      dateParse
    }
  }
})
</script>

<style lang="scss" scoped>
.count-data {
  display: flex;
  align-items: center;
  color: gray;
  & > * {
    margin-right: 1.2rem;
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
  margin-top: 1rem;
  .avatar {
    display: flex;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }
    .poster-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 1rem;
      font-size: 1.4rem;
      font-weight: bold;
      .introduction {
        font-size: 1rem;
        font-weight: normal;
      }
    }
  }
}
.tags-bar {
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0;
}
.summary {
  margin-bottom: 2rem;
}
</style>
