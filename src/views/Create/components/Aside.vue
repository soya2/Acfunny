<template>
  <aside class="base-container">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      :class="{ 'is-active': index === activeIndex }"
      class="aside-item"
      @click="handleClickItem(index)"
    >{{ item.content }}</div>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Aside',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['handleClickItem'],
  setup (props, context) {
    const activeIndex = ref(0)
    const handleClickItem = (index: number) => {
      context.emit('handleClickItem', index)
    }
    const changeIndex = (index: number) => {
      activeIndex.value = index
    }

    return {
      activeIndex,
      handleClickItem,
      changeIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.base-container {
  width: auto;
  padding: 8px;
  .aside-item {
    width: 8rem;
    padding: .4rem .6rem;
  }
}
.is-active {
  color: #fd4c5d;
  background-color: #ffdde05d;
}
</style>
