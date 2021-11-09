<template>
  <div
    v-if="bubble !== 0"
    class="bubble"
  >{{ bubble }}</div>
  <div
    ref="icon"
    class="icon-container slide-border"
  >
    <font-awesome-icon :icon="icon" />
  </div>
  <div
    v-if="tip !== ''"
    class="tip"
  >{{ tip }}</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
export default defineComponent({
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    bubble: {
      type: Number,
      default: 0
    }
  },
  setup () {
    const data = reactive({
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped>
@IconHeight: 32px;
@tipFontSize: 12px;
@bubbleSize: 14px;
@highLightColor: #fd4c5d;

.icon-container {
  height: @IconHeight;
  width: @IconHeight;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover +.tip { opacity: 1; }
  &:active { color: @highLightColor; }
}

.tip {
  position: absolute;
  transform: translate(calc(-50% + (@IconHeight / 2)), 10px);
  display: inline-flex;
  opacity: 0;
  transition: .2s;
  background-color: rgba(49, 49, 49, 0.6);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: @tipFontSize;
  line-height: @tipFontSize;
  color: white;
}

.bubble {
  position: absolute;
  transform: translate(20px, -2px);
  width: @bubbleSize;
  height: @bubbleSize;
  font-size: @bubbleSize * 0.6;
  line-height: @bubbleSize;
  text-align: center;
  color: white;
  border-radius: 50%;
  background-color: @highLightColor;
  pointer-events: none;
}
</style>
