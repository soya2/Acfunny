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
          class="history-item slide-border"
        >
          <img class="item-img" :src="item.img">
          <div class="item-detail">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-date">{{ item.date }}</div>
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

export type HistoryItem = {
  id: number;
  title: string;
  img: string;
  date: string
}

export default defineComponent({
  name: 'History',
  setup () {
    const isVisible = ref(false)
    const changeVisible = (flag: boolean) => { isVisible.value = flag }
    const isClickIcon = ref(false)
    const clickIcon = (flag = false) => { isClickIcon.value = flag }
    const handleClick = () => {
      if (!isVisible.value && isClickIcon.value) {
        changeVisible(true)
      } else {
        changeVisible(false)
      }
      clickIcon()
    }
    onMounted(() => {
      window.addEventListener('click', handleClick, false)
    })
    onUnmounted(() => {
      window.removeEventListener('click', handleClick)
    })

    const historyList = ref([] as Array<HistoryItem>)

    const store = useStore()
    const loginStatus = computed(() => store.state.isLogin)

    return {
      isVisible,
      historyList,
      loginStatus,
      clickIcon
    }
  }
})
</script>

<style lang="scss" scoped>
.rounded-container {
  width: 18vw;
  overflow: hidden;
}
.title {
  margin-left: 8px;
  font-size: 18px;
}
.history-item {
  display: flex;
  padding: 8px 0;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgb(247, 247, 247);
  }
  .item-img {
    width: 30%;
    border-radius: 8px;
    margin-left: 8px;
  }
  .item-detail {
    margin-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item-title {
    font-size: 18px;
    font-weight: bold;
  }
  .item-date {
    font-size: 12px;
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
