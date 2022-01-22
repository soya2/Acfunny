<template>
  <img
    class="banner"
    :src="userData.banner"
  />
  <Tabs
    :tabs="tabsList"
    @handleChangeTab="handleChangeTab"
  />
  <div class="content-container">
    <user-info
      v-show="isActiveTab === 1" :userId="userId"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Tabs, { TabsOptions } from '@/components/Tabs.vue'
import UserInfo from './components/UserInfo.vue'
export default defineComponent({
  name: 'PersonalCenter',
  components: {
    Tabs,
    UserInfo
  },
  setup () {
    const route = useRoute()
    const userId = Number(route.query.id)

    const isActiveTab = ref(1)
    const tabsList = ref([
      { id: 1, name: '首页' },
      { id: 2, name: '视频' },
      { id: 3, name: '收藏夹' },
      { id: 4, name: '历史记录' }
    ] as TabsOptions[])
    const handleChangeTab = (id: number) => {
      isActiveTab.value = id
    }

    const userInfoRef = ref()
    watch(route.query, (oldVal, newVal) => {
      userInfoRef.value.getUserInfo(newVal.id)
    })

    const userData = ref({
      banner: 'https://imgs.aixifan.com/newUpload/1046727_bbffc13f6d2443aebf74c4ecfb6d1697.jpeg.jpeg'
    })

    return {
      tabsList,
      handleChangeTab,
      userData,
      userId,
      isActiveTab,
      userInfoRef
    }
  }
})
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 8rem;
  object-fit: cover;
}
.content-container {
  display: flex;
  justify-content: center;
  background-color: white;
  padding: .4rem 1rem;
  & > * { width: 70%; }
}
</style>
