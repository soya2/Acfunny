<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '@/components/Layout/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Layout
  },
  setup () {
    return {}
  }
})
</script>

<style lang="less" scoped>
</style>
