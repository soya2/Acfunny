<template>
  <div class="create-container">
    <Aside
      ref="asideRef"
      :items="asideItems"
      @handleClickItem="changeAsideItem"
    />
    <div class="base-container create-main">
      <CreateVideo ref="createVideoRef" v-show="asideId === 0" />
      <ManageVideo ref="manageVideoRef" v-show="asideId === 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Aside from './components/Aside.vue'
import CreateVideo from './components/CreateVideo.vue'
import ManageVideo from './components/ManageVideo.vue'
export default defineComponent({
  name: 'Create',
  components: {
    Aside,
    CreateVideo,
    ManageVideo
  },
  setup () {
    const asideRef = ref()
    const asideItems = ref([
      { id: 0, content: '创作中心' },
      { id: 1, content: '投稿管理' }
    ])
    const asideId = ref(0)
    const createVideoRef = ref()
    const manageVideoRef = ref()
    const changeAsideItem = async (id: number) => {
      try {
        if (asideId.value === 0) {
          await createVideoRef.value.cancel()
        }
        if (id === 1) {
          manageVideoRef.value.getVideoList()
        }
        asideRef.value.changeIndex(id)
        asideId.value = id
      } catch {}
    }
    return {
      asideRef,
      asideItems,
      asideId,
      createVideoRef,
      manageVideoRef,
      changeAsideItem
    }
  }
})
</script>

<style lang="scss" scoped>
.create-container {
  margin: 1rem 0;
  display: flex;
  height: 100%;
  justify-content: center;
}
.create-main {
  width: 40%;
  margin-left: 1rem;
}
</style>
