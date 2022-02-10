<template>
  <div v-if="hasList" class="follow-list">
    <div
      class="user-item slide-border"
      v-for="item in usersList"
      :key="item.id"
    >
      <Avatar
        style="cursor: pointer;"
        size="large"
        :name="item.avatar"
        @click="$router.push(`/personal-center?id=${item.id}`)"
      />
      <div
        class="name"
        @click="$router.push(`/personal-center?id=${item.id}`)"
      >{{ item.name }}</div>
    </div>
  </div>
  <div v-else class="empty-message">暂无数据</div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import Avatar from '@/components/Avatar.vue'
import { UserApi } from '@/api'

export default defineComponent({
  name: 'Follows',
  components: {
    Avatar
  },
  props: {
    list: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },
  setup (props) {
    const hasList = ref(false)
    const usersList = ref([])
    const getUserList = async (idList: number[]) => {
      try {
        if (idList.length === 0) {
          hasList.value = false
          return
        }
        const { data } = await UserApi.getUserList(idList)
        usersList.value = data
        hasList.value = data.length > 0
      } catch {}
    }
    getUserList(props.list)
    watch(props, (val) => {
      getUserList(val.list)
    })

    return {
      hasList,
      usersList
    }
  }
})
</script>

<style lang="scss" scoped>
.follow-list {
  display: flex;
  flex-wrap: wrap;
  .user-item {
    margin: 1rem;
    border-radius: 4px;
    padding: .4rem;
    .name {
      font-weight: bold;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
