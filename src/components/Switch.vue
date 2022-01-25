<template>
  <div
    class="switch"
    @click="handleClickSwitch"
  >
    <div
      class="sort"
      :style="{ backgroundColor: modelValue ? 'rgba(253, 76, 93, 0.32)': '' }"
    />
    <div
      class="round"
      :style="{ left: modelValue ? '1.1rem': '0' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Switch',
  props: {
    modelValue: Boolean
  },
  setup (props, context) {
    const handleClickSwitch = () => {
      context.emit('update:modelValue', !props.modelValue)
    }
    return {
      handleClickSwitch
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
