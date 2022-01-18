<template>
  <div>
    <div
      v-if="buttonObject.count > 0"
      class="bubble"
    />
    <div
      ref="icon"
      class="icon-container slide-border"
      :class="{ 'checkbox': type === 'checkbox' }"
      :style="{ color: color }"
      @click="clickIcon"
      @mousedown="handleMousedown(1)"
      @mouseup="handleMousedown(0)"
    >
      <font-awesome-icon :icon="buttonObject.icon" />
      <span
        v-if="followNumber"
        class="checkbox-number"
      >{{ followNumber }}</span>
    </div>
    <div
      v-if="buttonObject.tip && buttonObject.tip !== ''"
      class="tip"
    >{{ buttonObject.tip }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed } from 'vue'

export type IconButtonType = {
  id: number;
  icon: string;
  color?: string;
  type?: string | undefined;
  tip?: string | undefined;
  count?: number | undefined,
  followNumber: number;
}

export default defineComponent({
  name: 'IconButton',
  props: {
    buttonObject: {
      type: Object as PropType<IconButtonType>,
      required: true
    },
    followNumber: {
      type: Number,
      default: 0
    }
  },
  emits: ['handleClickIcon'],
  setup (props, context) {
    const type = ref(props.buttonObject.type)
    const isCheck = ref(false)
    const isActive = ref(false)
    const color = computed(() => isCheck.value || isActive.value ? props.buttonObject.color : '')
    const handleMousedown = (type: number) => { isActive.value = type === 1 }

    const clickIcon = () => {
      if (type.value === 'checkbox') {
        isCheck.value = !isCheck.value
        context.emit('handleClickIcon', props.buttonObject.id, isCheck.value)
      } else {
        context.emit('handleClickIcon', props.buttonObject.id)
      }
    }
    return {
      type,
      isCheck,
      handleMousedown,
      color,
      clickIcon
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
.checkbox {
  width: fit-content;
  padding: 0 .4rem;
  border-radius: 24px;
  .checkbox-number {
    margin-left: .4rem;
  }
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
