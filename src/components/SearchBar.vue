<template>
  <div>
    <input />
    <button>
      <font-awesome-icon icon="search" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  components: {
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
