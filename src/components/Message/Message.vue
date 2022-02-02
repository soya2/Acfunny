<template>
  <transition name="vertical" appear>
    <div
      v-show="visible"
      :class="messageType"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
interface MessageConfig {
  type: string;
  icon: string;
  content: string;
  close?: boolean;
  duration?: number;
}

export default defineComponent({
  name: 'Message',
  props: {
    config: {
      type: Object as PropType<MessageConfig>,
      default: () => {
        return {
          type: 'info',
          icon: '',
          content: '',
          close: false,
          duration: 2000
        }
      }
    },
    remove: {
      type: Function,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const visible = ref(false)

    const onClose = () => {
      visible.value = false
      setTimeout(() => {
        props.remove()
      }, 200)
    }

    const message = ref('')
    const messageType = ref('')
    const onOpen = (config: MessageConfig) => {
      message.value = config.content
      messageType.value = config.type
      visible.value = true
      if (config.duration !== 0) {
        setTimeout(() => {
          onClose()
        }, config.duration)
      }
    }

    onOpen(props.config)

    return {
      visible,
      message,
      messageType
    }
  }
})
</script>

<style lang="scss" scoped>
.message-base-box {
  width: 16%;
  margin: 12px 0;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: .8rem;
  box-shadow: 0 2px 6px 0 rgb(233, 233, 233);
}
.success {
  @extend .message-base-box;
  color: green;
  background-color: rgb(219, 240, 219);
}

.error {
  @extend .message-base-box;
  color: rgb(238, 54, 54);
  background-color: rgb(245, 224, 224);
}

.info {
  @extend .message-base-box;
  color: gray;
  background-color: rgb(218, 218, 218);
}
</style>
