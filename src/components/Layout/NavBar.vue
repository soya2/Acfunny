<template>
  <nav>
    <div
      style="width: 33%"
      @click="router.push({ name: 'Home' })"
    >
      <div class="logo">Logo</div>
    </div>
    <div class="search-bar">
      <search-bar />
    </div>
    <div class="button-bar">
      <div class="nav-item">
        <icon-button
          :button-object="navItemList[0]"
          @handleClickIcon="clickIcon"
        />
        <transition name="vertical">
          <history ref="historyRef" />
        </transition>
      </div>
      <div class="nav-item">
        <icon-button
          :button-object="navItemList[1]"
          @handleClickIcon="clickIcon"
        />
        <transition name="vertical">
          <notice ref="noticeRef" />
        </transition>
      </div>
      <div class="nav-item">
        <icon-button
          :button-object="navItemList[2]"
          @handleClickIcon="clickIcon"
        />
      </div>
      <div class="nav-item" @click="clickIcon(4)">
        <img
          v-if="loginStatus"
          class="avatar-container"
          :src="userAvatar"
        >
        <icon-button
          v-else
          :button-object="navItemList[3]"
        />
        <transition name="vertical">
          <user-plane ref="userRef" />
        </transition>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import IconButton, { IconButtonType } from '@/components/IconButton/IconButton.vue'
import SearchBar from '@/components/SearchBar.vue'
import History from './components/History.vue'
import Notice from './components/Notice.vue'
import UserPlane from './components/UserPlane.vue'
import UserApi from '@/api/users'

export default defineComponent({
  name: 'NavBar',
  components: {
    IconButton,
    SearchBar,
    History,
    Notice,
    UserPlane
  },
  setup () {
    const historyRef = ref()
    const noticeRef = ref()
    const userRef = ref()
    const navItemList = ref([
      { id: 1, icon: 'history', tip: '观看历史' },
      { id: 2, icon: 'comment', tip: '通知', count: 0 },
      { id: 3, icon: 'paint-brush', tip: '创作' },
      { id: 4, icon: 'user' }
    ] as Array<IconButtonType>)

    const router = useRouter()

    const clickIcon = (id: number) => {
      switch (id) {
        case 1: historyRef.value.clickIcon(true); break
        case 2: noticeRef.value.clickIcon(true); break
        case 3: router.push({ path: 'create' }); break
        case 4: userRef.value.clickIcon(true)
      }
    }

    const store = useStore()
    const localStoreStatus = window.localStorage.getItem('loginStatus')
    if (localStoreStatus === 'True') store.commit('changeLoginState', true)
    const loginStatus = computed(() => store.state.isLogin)

    const userAvatar = ref()
    const getUserInfo = async (id: number) => {
      const { data } = await UserApi.getUserById(id)
      userAvatar.value = data.avatar
      navItemList.value[1].count = data.notice
    }
    const userId = window.localStorage.getItem('userId')
    if (loginStatus.value && userId !== '') getUserInfo(Number(userId))

    return {
      historyRef,
      noticeRef,
      userRef,
      navItemList,
      clickIcon,
      router,
      loginStatus,
      userAvatar
    }
  }
})
</script>

<style lang="scss" scoped>
$navItemHeight: 32px;
nav {
  padding: 12px;
  background-color: #fff;
  backdrop-filter: blur(8px);
  border-bottom: 2px solid rgb(240, 240, 240);
  display: flex;
  justify-content: space-between;
  align-content: center;
  .logo {
    width: fit-content;
    height: 100%;
    margin-left: 16px;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
  }
  .button-bar {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    width: 33%;
    .nav-item {
      position: relative;
      padding: 0 4px;
      margin: 0 4px;
      height: $navItemHeight;
      width: $navItemHeight;
      line-height: $navItemHeight;
    }
    .avatar-container {
      width: $navItemHeight;
      height: $navItemHeight;
      border-radius: 50%;
      background-color: gray;
      cursor: pointer;
    }
  }
  .search-bar {
    width: 300px;
  }
}
</style>
