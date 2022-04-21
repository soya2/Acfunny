<template>
  <div class="banner">
    <img :src="userInfo.banner" />
    <button @click="changeBanner">更换封面</button>
  </div>
  <div class="content-container">
    <div class="user-data-bar">
      <div style="display: flex;">
        <Avatar size="large" :name="userData.avatar" />
        <div class="info">
          <div class="name">{{ userData.name }}</div>
          <div>
            <span class="intro">关注：{{ userData.subscript.length }}</span>
            <span class="intro">粉丝：{{ userData.fans }}</span>
          </div>
          <div class="intro">{{ userData.introduction }}</div>
        </div>
      </div>
      <div class="button-bar">
        <button
          v-if="loginId === userId"
          class="btn-primary-plain info-btn"
          @click="$router.push(`/edit-user-info?id=${loginId}`)"
        >编辑资料</button>
        <Button
          :content="isFollow ? '已关注' : '关注'"
          class="info-btn"
          :isCheck="isFollow"
          @click="handleClickFollow"
        />
      </div>
    </div>
    <Tabs
      :tabs="tabsList"
      @handleChangeTab="handleChangeTab"
    />
    <div class="line" />
    <user-info
      v-show="isActiveTab === 1"
      :option="userInfo"
      :userId="userId"
    />
    <post-video-list
      v-show="isActiveTab === 2"
      :list="userInfo.postVideo"
    />
    <favorite
      v-show="isActiveTab === 3"
      :isShow="userInfo.showFavorite"
      :list="userInfo.favorite"
    />
    <history
      v-show="isActiveTab === 4"
      :isShow="userInfo.showHistory"
      :list="userInfo.history"
    />
    <follows
      v-show="isActiveTab === 5"
      :list="userData.subscript"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ImagesApi, UserApi } from '@/api'
import { Avatar, Button, Message } from '@/components/common'
import Tabs, { TabsOptions } from '@/components/common/Tabs.vue'
import UserInfo from './components/UserInfo.vue'
import PostVideoList from './components/PostVideoList.vue'
import Favorite from './components/Favorite.vue'
import History from './components/History.vue'
import Follows from './components/Follows.vue'
export default defineComponent({
  name: 'PersonalCenter',
  components: {
    Avatar,
    Button,
    Tabs,
    UserInfo,
    PostVideoList,
    Favorite,
    History,
    Follows
  },
  setup () {
    const route = useRoute()
    const loginId = Number(window.localStorage.getItem('userId'))
    const userId = ref(Number(route.query.id))

    const userData = ref({
      avatar: '',
      fans: 0,
      introduction: '',
      id: '',
      name: '',
      subscript: [],
      favorite: []
    })
    const isFollow = ref(false)
    const getUserData = async (id: number) => {
      try {
        const { data } = await UserApi.getUserById(id)
        userData.value = data
        const { data: followData } = await UserApi.isFollow(id)
        isFollow.value = followData
      } catch {}
    }
    getUserData(userId.value)

    const handleClickFollow = async () => {
      try {
        await UserApi.follow(userData.value.id, !isFollow.value)
        isFollow.value = !isFollow.value
        const temp = userData.value.fans
        userData.value.fans = isFollow.value
          ? temp + 1
          : temp - 1
      } catch {}
    }

    const isActiveTab = ref(1)
    const tabsList = ref([
      { id: 1, name: '首页' },
      { id: 2, name: '视频' },
      { id: 3, name: '收藏夹' },
      { id: 4, name: '历史记录' },
      { id: 5, name: '关注' }
    ] as TabsOptions[])
    const handleChangeTab = (id: number) => {
      isActiveTab.value = id
    }

    const userInfo = ref({
      id: 0,
      banner: '',
      postVideo: [],
      recommend: [],
      history: [],
      favorite: [] as number[],
      showHistory: false,
      showFavorite: false
    })
    const getUserInfo = async (id: number) => {
      try {
        const { data } = await UserApi.getUserInfoById(id)
        userInfo.value = data
        userInfo.value.favorite = userData.value.favorite
        userInfo.value.banner = await ImagesApi.getImage(data.banner)
      } catch {}
    }
    getUserInfo(userId.value)

    const userInfoRef = ref()
    watch(route, (oldVal) => {
      if (route.path !== '/personal-center') return
      userId.value = Number(route.query.id)
      getUserData(Number(oldVal.query.id))
      getUserInfo(Number(oldVal.query.id))
    })

    const changeBanner = () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.click()
      input.onchange = async () => {
        let buffer: ArrayBuffer | undefined
        if (input) {
          const files = input.files
          const chooseFile = files && files[0]
          buffer = await chooseFile?.arrayBuffer()
        }
        if (buffer) {
          const { data: file } = await ImagesApi.postImage(buffer)
          const { data, msg } = await UserApi.editUserBanner({
            userId: Number(userData.value.id),
            banner: file.fileHash
          })
          data ? Message.success(msg) : Message.error(msg)
          data && (userInfo.value.banner = await ImagesApi.getImage(file.fileHash))
        }
      }
    }

    return {
      userData,
      isFollow,
      tabsList,
      handleChangeTab,
      handleClickFollow,
      userInfo,
      loginId,
      userId,
      isActiveTab,
      userInfoRef,
      changeBanner
    }
  }
})
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  img {
    width: 100%;
    height: 8rem;
    object-fit: cover;
  }
  button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: rgba(255, 255, 255, 0.3);
    transition: .2s;
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid rgb(145, 145, 145);
    &:hover {
      background-color: rgba(221, 221, 221, 0.3);
    }
  }
}
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .4rem 1rem;
  & > * { width: 70%; }
}
.user-data-bar {
  display: flex;
  justify-content: space-between;
  margin: .8rem 0;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 2rem;
    .name {
      font-size: 2rem;
      font-weight: bold;
    }
    .intro {
      margin-right: .6rem;
      color: gray;
    }
  }
  .button-bar {
    display: flex;
    align-items: center;
    & > * { margin-left: 1rem; }
    .info-btn {
      font-size: 1rem;
    }
  }
}
</style>
