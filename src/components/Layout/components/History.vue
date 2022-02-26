<template>
  <div
    v-show="isVisible"
    class="rounded-container"
    @click.stop
  >
    <div class="title">浏览历史</div>
    <div v-if="loginStatus">
      <div v-if="historyList.length > 0">
        <div
          v-for="item of historyList"
          :key=item.id
          class="history-item main-hover"
        >
          <img
            class="item-img"
            :src="item.cover"
            @click="$router.push(`/video?id=${item.id}`)"
          >
          <div class="item-detail">
            <div
              class="item-title"
              @click="$router.push(`/video?id=${item.id}`)"
            >{{ item.title }}</div>
            <div class="item-date">{{ dateParse(item.uploadTime) }}</div>
          </div>
        </div>
      </div>
      <div class="center-notice" v-else>
        <font-awesome-icon icon="file" />
        暂无记录
      </div>
    </div>
    <div class="center-notice" v-else>
      <font-awesome-icon icon="ban" />
      请先登录
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { UserApi, VideoApi, ImagesApi } from '@/api'
import { dateParse } from '@/utils/index'

export default defineComponent({
  name: 'History',
  setup () {
    const isVisible = ref(false)
    const changeVisible = (flag: boolean) => { isVisible.value = flag }
    const isClickIcon = ref(false)
    const clickIcon = (flag = false) => { isClickIcon.value = flag }
    const handleClick = () => {
      changeVisible(!isVisible.value && isClickIcon.value)
      if (isVisible.value) getHistoryList()
      clickIcon()
    }
    onMounted(() => {
      window.addEventListener('click', handleClick, false)
    })
    onUnmounted(() => {
      window.removeEventListener('click', handleClick)
    })

    const historyList = ref([])
    const getHistoryList = async () => {
      const userId = Number(window.localStorage.getItem('userId'))
      if (Number.isNaN(userId)) return
      const { data } = await UserApi.getUserInfoById(userId)
      const historyIdList = data.history
      const { data: videoData } = await VideoApi.getVideoList(0, historyIdList)
      for await (const item of videoData) {
        item.cover = await ImagesApi.getImage(item.cover)
      }
      historyList.value = videoData
    }

    const store = useStore()
    const loginStatus = computed(() => store.state.isLogin)

    return {
      isVisible,
      historyList,
      loginStatus,
      clickIcon,
      dateParse
    }
  }
})
</script>

<style lang="scss" scoped>
.rounded-container {
  width: 18vw;
  overflow-y: scroll;
}
.title {
  margin-left: 8px;
  padding: .2rem 0;
  font-size: 18px;
}
.history-item {
  display: flex;
  padding: 8px 0;
  border-radius: 16px;
  .item-img {
    height: 4rem;
    width: 6rem;
    border-radius: 8px;
    margin-left: 8px;
    cursor: pointer;
  }
  .item-detail {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item-title {
    font-size: .6rem;
    font-weight: bold;
    line-height: 1rem;
    cursor: pointer;
  }
  .item-date {
    font-size: .2rem;
    color: #333;
  }
}
.center-notice {
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  cursor: default;
}
</style>
