<template>
  <footer>
    <div>18计算机11班 邹其峰@2022</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FooterBar',
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
footer {
  margin-top: auto;
  padding: 12px;
  background-color: rgb(236, 236, 236);
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .5rem;
    color: gray;
  }
}
</style>
