<template>
  <div>
    <input v-model="keyword" @keyup.enter="search" />
    <button>
      <font-awesome-icon icon="search" @click="search" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@/components/common'

export default defineComponent({
  name: 'SearchBar',
  setup () {
    const router = useRouter()
    const keyword = ref('')
    const search = () => {
      if (keyword.value.trim() === '') {
        return Message.error('请输入关键词')
      }
      router.push({
        name: 'SearchPage',
        params: {
          keyword: keyword.value
        }
      })
    }

    return {
      keyword,
      search
    }
  }
})
</script>

<style lang="less" scoped>
@inputHeight: 24px;
@borderColor: rgb(230, 230, 230);
@activeColor: #fd4c5d;
div {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    position: absolute;
    right: 6px;
    z-index: 5;
    width: @inputHeight;
    height: @inputHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
    color: @borderColor;
  }
}
</style>
