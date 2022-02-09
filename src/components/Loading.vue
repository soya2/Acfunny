<template>
  <div class="loading-container">
    <div class="loader" />
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Loading',
  props: {
    message: {
      type: String,
      default: '请稍后'
    },
    duration: {
      type: Number,
      default: 2000
    },
    remove: {
      type: Function,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    setTimeout(props.remove, props.duration)
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.loading-container {
  width: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
