<template>
  <div>
    <div
      v-if="buttonObject.count > 0"
      class="bubble"
    />
    <div
      ref="icon"
      class="icon-container slide-border"
      @click="$emit('handleClickIcon', buttonObject.id)"
    >
      <font-awesome-icon :icon="buttonObject.icon" />
    </div>
    <div
      v-if="buttonObject.tip && buttonObject.tip !== ''"
      class="tip"
    >{{ buttonObject.tip }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, PropType } from 'vue'

export type IconButtonType = {
  id: number;
  icon: string;
  tip?: string | undefined;
  count?: number | undefined
}

export default defineComponent({
  name: 'IconButton',
  props: {
    buttonObject: {
      type: Object as PropType<IconButtonType>,
      required: true
    }
  },
  emits: ['handleClickIcon'],
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
  width: fit-content;
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
  z-index: 9;
}

.bubble {
  position: absolute;
  transform: translate(28px, 4px);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: @highLightColor;
  pointer-events: none;
}
</style>
