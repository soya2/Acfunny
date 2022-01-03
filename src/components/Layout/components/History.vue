<template>
  <div
    v-show="isVisible"
    class="rounded-container"
    @click.stop
  >
    <div class="title">浏览历史</div>
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
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

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

    return {
      isVisible,
      historyList,
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
</style>
