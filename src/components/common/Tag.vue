<template>
  <div
    class="tag slide-border"
    @click="clickTag"
  >
    <font-awesome-icon
      style="color: #b8b8b8;"
      icon="tag"
    />
    <span style="margin-left: .4rem;">
      {{ tagName }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Tag',
  props: {
    tagName: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const router = useRouter()
    const clickTag = () => {
      router.push({
        name: 'SearchPage',
        params: {
          keyword: props.tagName
        }
      })
    }

    return {
      clickTag
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
