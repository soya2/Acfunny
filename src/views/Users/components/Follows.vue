<template>
  <div v-if="hasList" class="follow-list">
    <div
      class="user-item slide-border"
      v-for="item in usersList"
      :key="item.id"
    >
      <img
        :src="item.avatar"
        @click="$router.push(`/personal-center?id=${item.id}`)"
      >
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
import UsersApi from '@/api/users'
export default defineComponent({
  name: 'Follows',
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
        const { data } = await UsersApi.getUserList(idList)
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
    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      cursor: pointer;
    }
    .name {
      font-weight: bold;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
