<template>
  <div
    v-show="isVisible"
    class="rounded-container"
    @click.stop
  >
    <div class="title">回复</div>
    <div class="notice-item slide-border">
      <div class="item-detail">
        <strong>{{ noticeList[0].userName }}</strong>
        <span> 回复：</span>
        <strong>{{ noticeList[0].content }}</strong>
      </div>
      <div class="item-date">{{ new Date(noticeList[0].date).toLocaleString() }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export type NoticeItem = {
  id: number;
  type: number;
  userName: string;
  address: string;
  content: string;
  date: number
}

export default defineComponent({
  name: 'Notice',
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

    const noticeList = ref([
      {
        id: 124124,
        type: 1,
        userName: 'Alice',
        content: '回复内容回复内容回回复内容回复内容回复内容回复内容回复内容回复内容复内容回复内容回复内容',
        address: '',
        date: 412412314225
      }
    ] as Array<NoticeItem>)

    return {
      isVisible,
      clickIcon,
      noticeList
    }
  }
})
</script>

<style lang="scss" scoped>
.rounded-container {
  width: 300px;
}
.title {
  margin-left: 8px;
  font-size: 18px;
}
.notice-item {
  padding: 4px 8px;
  border-radius: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgb(247, 247, 247);
  }
  .item-detail {
    width: 100%;
    font-size: 14px;
    line-height: 24px;
  }
  .item-date {
    font-size: 12px;
    color: grey;
  }
}
</style>
