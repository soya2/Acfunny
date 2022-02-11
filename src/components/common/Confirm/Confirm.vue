<template>
  <div class="base-container">
    {{ message }}
    <div class="button-bar">
      <button
        class="btn-primary btn-sm"
        @click="remove(true)"
      >确认</button>
      <button
        class="btn-primary-plain btn-sm"
        style="margin-left: .4rem;"
        @click="remove(false)"
      >取消</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Confirm',
  props: {
    message: {
      type: String,
      default: ''
    },
    remove: {
      type: Function,
      default: () => {
        return {}
      }
    }
  },
  setup () {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
.base-container {
  width: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px;
  .button-bar {
    margin-top: .4rem;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
