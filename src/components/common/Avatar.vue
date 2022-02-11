<template>
  <img
    v-if="hasDefault"
    class="avatar"
    :class="{
      'normal': size === 'normal',
      'small': size === 'small',
      'large': size === 'large'
    }"
    src="../../assets/defaultAvatar.jpg"
  >
  <img
    v-else
    class="avatar"
    :class="{
      'normal': size === 'normal',
      'small': size === 'small',
      'large': size === 'large'
    }"
    :src="url"
  >
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { ImagesApi } from '@/api'
export default defineComponent({
  name: 'Avatar',
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  setup (props) {
    const url = ref('')
    const hasDefault = ref(true)
    const getUrl = async (name: string) => {
      if (name.trim() === '') return
      url.value = await ImagesApi.getImage(name)
      hasDefault.value = url.value === ''
    }
    getUrl(props.name)
    watch(props, async (val) => await getUrl(val.name))
    return {
      url,
      hasDefault
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
}
.large {
  width: 8rem;
  height: 8rem;
}
.normal {
  width: 4rem;
  height: 4rem;
}
.small {
  width: 32px;
  height: 32px;
}
</style>
