<template>
  <div class="col-main">
    <div class="left">
      <Video />
      <Information :videoId="videoId" />
      <Comment :videoId="videoId" />
    </div>
    <div class="right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Video from './components/Video.vue'
import Information from './components/Information.vue'
import Comment from './components/Comment.vue'

export default defineComponent({
  name: 'VideoPage',
  components: {
    Video,
    Information,
    Comment
  },
  setup () {
    const route = useRoute()
    const videoId = Number(route.query.id)
    return {
      videoId
    }
  }
})
</script>

<style lang="scss" scoped>
.col-main {
  display: grid;
  grid-template-columns: 75% 1fr;
  padding: 1rem 4rem;
  .left {
    padding-right: 2%;
  }
  .right {
    border: 1px solid green;
  }
}
</style>
