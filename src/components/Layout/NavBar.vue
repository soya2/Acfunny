<template>
  <nav>
    <div class="logo-bar">Logo</div>
    <div class="search-bar">
      <search-bar />
    </div>
    <div class="button-bar">
      <div
        v-for="item in navItemList"
        :key="item.tip"
        class="nav-item"
      >
        <icon-button
          :icon="item.icon"
          :tip="item.tip"
          :bubble="item.count || 0"
        />
      </div>
      <div class="nav-item">
        <div class="avatar-container"></div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import IconButton from '@/components/IconButton.vue'
import SearchBar from '@/components/SearchBar.vue'

type navItem = {
  icon: string;
  tip?: string | undefined;
  count?: number | undefined
}

export default defineComponent({
  name: 'NavBar',
  components: {
    IconButton,
    SearchBar
  },
  setup () {
    const data = reactive({
      navItemList: [
        { icon: 'history', tip: '观看历史' },
        { icon: 'comment', tip: '通知', count: 0 },
        { icon: 'paint-brush', tip: '创作' }
      ] as Array<navItem>
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped>
@navItemHeight: 32px;
nav {
  padding: 12px;
  background-color: #fff;
  backdrop-filter: blur(8px);
  box-shadow: 4px 12px rgb(240, 240, 240);
  display: flex;
  justify-content: space-between;
  align-content: center;
  .logo-bar {
    width: 33%;
  }
  .button-bar {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    width: 33%;
    .nav-item {
      padding: 0 4px;
      margin: 0 4px;
      height: @navItemHeight;
      width: @navItemHeight;
      line-height: @navItemHeight;
    }
    .avatar-container {
      width: @navItemHeight;
      height: @navItemHeight;
      border-radius: 50%;
      background-color: gray;
    }
  }
  .search-bar {
    width: 300px;
  }
}
</style>
