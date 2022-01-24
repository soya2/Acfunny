<template>
  <div class="tabs">
    <div
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :class="{ 'is-active': isActive === index }"
      class="tab"
      @click="handleClickTab(index, tab.id)"
    >
      {{ tab.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
export interface TabsOptions {
  id: number;
  name: string
}
export default defineComponent({
  name: 'Tabs',
  props: {
    tabs: {
      type: Array as PropType<TabsOptions[]>,
      default: () => []
    }
  },
  emits: ['handleChangeTab'],
  setup (props, context) {
    const isActive = ref(0)
    const handleClickTab = (index: number, id: number) => {
      isActive.value = index
      context.emit('handleChangeTab', id)
    }
    return {
      isActive,
      handleClickTab
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: center;
  padding: .4rem 1rem;
  margin-bottom: 8px;
  .tab {
    margin: 0 1rem;
    cursor: pointer;
    border-bottom: .15rem solid transparent;
    transition: .2s;
  }
  .is-active {
    color: red;
    border-bottom: .15rem solid red;
  }
}
</style>
