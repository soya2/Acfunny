<template>
  <div class="line" />
  <div class="header">
    <h2>评论</h2>
    <div>
      <button
        v-show="cancelButton"
        class="btn-primary-plain"
        style="margin-right: .4rem;"
        @click="handleClickCancel"
      >关闭</button>
      <button
        class="btn-primary"
        @click="handleClickComment"
      >{{ isComment ? '发 送' : '评 论' }}</button>
    </div>
  </div>
  <textarea
    v-model="commentContent"
    class="comment-input"
    :class="{ 'isComment': !isComment }"
    type="textarea"
    placeholder="请输入评论吧"
  />
  <div
    v-for="item in commentList"
    :key="item.id"
  >
    <div class="item">
      <Avatar :name="item.posterAvatar" />
      <div class="right">
        <div>
          <span class="name">{{ item.posterName }}</span>
          <span class="time">{{ dateParse(item.time) }}</span>
        </div>
        <div class="content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { dateParse } from '@/utils/index'
import Message from '@/utils/message'
import Avatar from '@/components/Avatar.vue'
import { VideoApi } from '@/api'

export default defineComponent({
  name: 'Comment',
  components: {
    Avatar
  },
  props: {
    videoId: {
      type: Number,
      default: -1
    }
  },
  setup (props) {
    const commentList = ref([])
    const getCommentList = async (id: number = props.videoId) => {
      const { data } = await VideoApi.getCommentList(id)
      commentList.value = data
    }
    onMounted(() => getCommentList())

    const cancelButton = ref(false)
    const handleClickCancel = () => {
      isComment.value = false
      cancelButton.value = false
    }
    const commentContent = ref('')
    const isComment = ref(false)
    const handleClickComment = async () => {
      if (isComment.value) {
        if (commentContent.value.trim() === '') {
          return Message.info('评论内容不能为空')
        }
        try {
          const { msg } = await VideoApi.addComment(
            props.videoId,
            commentContent.value
          )
          Message.success(msg)
          await getCommentList()
        } catch {}
      } else {
        cancelButton.value = true
      }
      isComment.value = !isComment.value
    }
    return {
      getCommentList,
      commentList,
      cancelButton,
      commentContent,
      isComment,
      handleClickComment,
      handleClickCancel,
      dateParse
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 6rem;
  }
}
.comment-input {
  height: 6rem;
  padding: .4rem;
  margin-bottom: 2rem;
  resize: none;
}
.isComment {
  opacity: 0;
  height: 0;
  margin: 0;
}
.item {
  display: flex;
  margin-bottom: 2rem;
  .right {
    margin-left: 1rem;
    .name { font-weight: bold; }
    .time {
      margin-left: .4rem;
      font-size: .8rem;
      color: gray;
    }
    .content {
      margin-top: .4rem;
    }
  }
}
</style>
