<template>
  <div class="line" />
  <div class="header">
    <h2>评论</h2>
    <button
      class="btn-primary"
      @click="handleClickComment"
    >{{ isComment ? '发 送' : '评 论' }}</button>
  </div>
  <textarea
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
      <img :src="item.avatar" >
      <div class="right">
        <div>
          <span class="name">{{ item.username }}</span>
          <span class="time">{{ item.time }}</span>
        </div>
        <div class="content">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Comment',
  props: {
    videoId: {
      type: Number,
      default: -1
    }
  },
  setup () {
    const commentList = ref([
      {
        id: 1,
        username: 'Bob',
        content: 'this is nice video',
        avatar: 'https://i.pixiv.re/img-original/img/2022/01/12/22/43/11/95485788_p0.jpg',
        time: '2022-01-14 10:23'
      },
      {
        id: 125,
        username: 'admin',
        content: 'this is nice video 2',
        avatar: 'https://proxy-jp1.pixivel.moe/c/600x1200_90_webp/img-master/img/2022/01/05/00/04/19/95304888_p0_master1200.jpg',
        time: '2022-01-14 10:24'
      }
    ])

    const isComment = ref(false)
    const handleClickComment = () => {
      if (isComment.value) {
        console.log('发送数据')
      } else {
      }
      isComment.value = !isComment.value
    }
    return {
      commentList,
      isComment,
      handleClickComment
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
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
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
