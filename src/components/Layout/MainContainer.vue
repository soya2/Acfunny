<template>
  <main>
    <slot />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MainContainer',
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
// main {
//   padding: 8px;
// }
</style>
