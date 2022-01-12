<template>
  <div
    v-show="isVisible"
    class="rounded-container"
    @click.stop
  >
    <div class="title">回复</div>
    <div v-if="loginStatus">
      <div v-if="noticeList.length > 0">
        <div
          v-for="item in noticeList"
          :key=item.id
          class="notice-item slide-border"
        >
          <div class="item-detail">
            <strong>{{ item.replyUserName }}</strong>
            <span> 回复：</span>
            <strong>{{ item.content }}</strong>
          </div>
          <div class="item-date">{{ new Date(item.date).toLocaleString() }}</div>
        </div>
      </div>
      <div class="center-notice" v-else>
        <font-awesome-icon icon="file" />
        暂无通知
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
import { getNoticeByUserId } from '@/api/notice'

export type NoticeItem = {
  id: number;
  isRead: boolean;
  userId: number;
  replyUserId: number;
  replyUserName: string;
  content: string;
  date: number;
}

export default defineComponent({
  name: 'Notice',
  setup () {
    const isVisible = ref(false)
    const changeVisible = (flag: boolean) => { isVisible.value = flag }
    const isClickIcon = ref(false)
    const clickIcon = (flag = false) => { isClickIcon.value = flag }
    const handleClick = () => {
      changeVisible(!isVisible.value && isClickIcon.value)
      clickIcon()
    }
    onMounted(() => {
      window.addEventListener('click', handleClick, false)
    })
    onUnmounted(() => {
      window.removeEventListener('click', handleClick)
    })

    const store = useStore()
    const loginStatus = computed(() => store.state.isLogin)

    const noticeList = ref([] as Array<NoticeItem>)
    const getNoticeList = async (id: number) => {
      const { data } = await getNoticeByUserId(id)
      noticeList.value = data
    }
    const userId = window.localStorage.getItem('userId')
    if (userId !== '') {
      getNoticeList(Number(userId))
    }

    return {
      isVisible,
      loginStatus,
      clickIcon,
      noticeList
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
.notice-item {
  padding: 4px 8px;
  border-radius: 8px;
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
.center-notice {
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  cursor: default;
}
</style>
