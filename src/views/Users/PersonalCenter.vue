<template>
  <img
    class="banner"
    :src="userInfo.banner"
  />
  <div class="content-container">
    <div class="user-data-bar">
      <div style="display: flex;">
        <img class="avatar" :src="userData.avatar" />
        <div class="info">
          <div class="name">{{ userData.name }}</div>
          <div>
            <span class="intro">关注：{{ userData.subscript }}</span>
            <span class="intro">粉丝：{{ userData.fans }}</span>
          </div>
          <div class="intro">{{ userData.introduction }}</div>
        </div>
      </div>
      <div class="button-bar">
        <button
          v-if="loginId === userId"
          class="btn-primary-plain info-btn"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import UserApi from '@/api/users'
import Button from '@/components/Button.vue'
import Tabs, { TabsOptions } from '@/components/Tabs.vue'
import UserInfo from './components/UserInfo.vue'
import PostVideoList from './components/PostVideoList.vue'
export default defineComponent({
  name: 'PersonalCenter',
  components: {
    Button,
    Tabs,
    UserInfo,
    PostVideoList
  },
  setup () {
    const route = useRoute()
    const loginId = Number(window.localStorage.getItem('userId'))
    const userId = Number(route.query.id)

    const userData = ref({
      avatar: '',
      fans: 0,
      introduction: '',
      id: '',
      name: '',
      subscript: 0,
      favorite: []
    })
    const isFollow = ref(false)
    const getUserData = async (id: number) => {
      try {
        const { data } = await UserApi.getUserById(id)
        userData.value = data
        userData.value.subscript = data.subscript.length
        const { data: followData } = await UserApi.isFollow(id)
        isFollow.value = followData
      } catch {}
    }
    getUserData(userId)

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
      { id: 4, name: '历史记录' }
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
      showHistory: true,
      showFavorite: true
    })
    const getUserInfo = async (id: number) => {
      try {
        const { data } = await UserApi.getUserInfoById(id)
        userInfo.value = data
        userInfo.value.favorite = userData.value.favorite
      } catch {}
    }
    getUserInfo(userId)

    const userInfoRef = ref()
    watch(route, (oldVal) => {
      if (route.path !== '/personal-center') return
      getUserData(Number(oldVal.query.id))
      getUserInfo(Number(oldVal.query.id))
    })

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
      userInfoRef
    }
  }
})
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 8rem;
  object-fit: cover;
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
  .avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
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
