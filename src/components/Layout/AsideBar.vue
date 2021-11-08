<template>
  <aside :style="{ width: `${siderBarWidth}px` }">
    <button @click="clickFoldButton">展开</button>
  </aside>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
export default defineComponent({
  name: 'AsideBar',
  setup () {
    const data = reactive({
      isFold: false,
      unfoldWidth: 200,
      foldWidth: 60,
      siderBarWidth: 200
    })
    const clickFoldButton = () => {
      data.isFold = !data.isFold
      data.siderBarWidth = data.isFold ? data.foldWidth : data.unfoldWidth
    }
    return {
      ...toRefs(data),
      clickFoldButton
    }
  }
})
</script>

<style lang="less" scoped>
aside {
  width: 200px;
  min-height: 100vh;
  background-color: rgb(228, 220, 220);
  transition: .2s ease-in-out;
}
</style>
