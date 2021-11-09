<template>
  <nav>
    <div
      style="width: 33%"
      @click="router.push({ name: 'Home' })"
    >
      <div class="logo">Logo</div>
    </div>
    <div class="search-bar">
      <search-bar />
    </div>
    <div class="button-bar">
      <div
        v-for="item in navItemList"
        :key="item.id"
        class="nav-item"
      >
        <icon-button
          :button-object="item"
          @handleClickIcon="clickIcon"
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
import { useRouter } from 'vue-router'
import IconButton, { IconButtonType } from '@/components/IconButton/IconButton.vue'
import SearchBar from '@/components/SearchBar.vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    IconButton,
    SearchBar
  },
  setup () {
    const data = reactive({
      navItemList: [
        { id: 1, icon: 'history', tip: '观看历史' },
        { id: 2, icon: 'comment', tip: '通知', count: 20 },
        { id: 3, icon: 'paint-brush', tip: '创作' }
      ] as Array<IconButtonType>
    })

    const router = useRouter()

    const clickIcon = (id: number): void => {
      switch (id) {
        case 3: router.push({ path: 'test' })
      }
    }

    return {
      ...toRefs(data),
      clickIcon,
      router
    }
  }
})
</script>

<style lang="scss" scoped>
$navItemHeight: 32px;
nav {
  padding: 12px;
  background-color: #fff;
  backdrop-filter: blur(8px);
  border-bottom: 2px solid rgb(240, 240, 240);
  display: flex;
  justify-content: space-between;
  align-content: center;
  .logo {
    width: fit-content;
    height: 100%;
    margin-left: 16px;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
  }
  .button-bar {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    width: 33%;
    .nav-item {
      padding: 0 4px;
      margin: 0 4px;
      height: $navItemHeight;
      width: $navItemHeight;
      line-height: $navItemHeight;
    }
    .avatar-container {
      width: $navItemHeight;
      height: $navItemHeight;
      border-radius: 50%;
      background-color: gray;
    }
  }
  .search-bar {
    width: 300px;
  }
}
</style>
