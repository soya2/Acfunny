<template>
  <div class="app-container">
    <aside-bar />
    <div class="inner-container">
      <nav-bar />
      <main-container>
        <slot />
      </main-container>
      <footer-bar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from './NavBar.vue'
import MainContainer from './MainContainer.vue'
import AsideBar from './AsideBar.vue'
import FooterBar from './FooterBar.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    NavBar,
    MainContainer,
    AsideBar,
    FooterBar
  },
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
.app-container {
  display: flex;
  .inner-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
