<template>
  <div class="col-main">
    <div class="left">
      <Video :videoId="videoId" />
      <Information ref="infoRef" :videoId="videoId" />
      <Comment ref="commentRef" :videoId="videoId" />
    </div>
    <div class="right">
      <Recommend />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Video from './components/Video.vue'
import Information from './components/Information.vue'
import Comment from './components/Comment.vue'
import Recommend from './components/Recommend.vue'

export default defineComponent({
  name: 'VideoPage',
  components: {
    Video,
    Information,
    Comment,
    Recommend
  },
  setup () {
    const route = useRoute()
    const videoId = ref(Number(route.query.id))

    const infoRef = ref()
    const commentRef = ref()
    watch(route, (newVal) => {
      if (newVal.path !== '/video') return
      videoId.value = Number(newVal.query.id)
      infoRef.value.getVideoData(videoId.value)
      commentRef.value.getCommentList(videoId.value)
    })
    return {
      videoId,
      infoRef,
      commentRef
    }
  }
})
</script>

<style lang="scss" scoped>
.col-main {
  display: grid;
  grid-template-columns: 75% 1fr;
  padding: 1rem 3rem;
  .left {
    padding-right: 2%;
  }
}
</style>
