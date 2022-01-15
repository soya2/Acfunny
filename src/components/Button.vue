<template>
  <button
    :class="{
      'btn-primary': !isCheck,
      'btn-primary-plain': isCheck,
      'btn-loading': isLoading
    }"
    :style="{ width: width }"
  >
    <font-awesome-icon v-if="frontIcon !== '' && !isCheck" :icon="frontIcon" />
    <span style="margin: 0 .4rem;">
      {{ content }}
    </span>
    <font-awesome-icon v-if="backIcon !== '' && !isCheck" :icon="backIcon" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Button',
  props: {
    content: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    frontIcon: {
      type: String,
      default: ''
    },
    backIcon: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'fit-content'
    }
  }
})
</script>

<style lang="scss" scoped>
.loading {
  background-color: rgba(255, 255, 255, .6);
}
</style>
