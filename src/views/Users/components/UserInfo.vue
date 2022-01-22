<template>
  <div>
    <div class="user-data-bar">
      <div style="display: flex;">
        <img class="avatar" :src="userData.avatar" />
        <div class="info">
          <div class="name">{{ userData.name }}</div>
          <div>
            <span class="intro">关注：{{ userData.subscript }}</span>
            <span class="intro">粉丝：{{ userData.fans }}</span>
          </div>
          <div class="intro">{{ userData.introduction }}</div>
        </div>
      </div>
      <div class="button-bar">
        <button
          v-if="loginId === userId"
          class="btn-primary-plain info-btn"
        >编辑资料</button>
        <Button
          :content="isFollow ? '已关注' : '关注'"
          class="info-btn"
          :isCheck="isFollow"
          @click="handleClickFollow"
        />
      </div>
    </div>
    <div class="line" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import UserApi from '@/api/users'
import Button from '@/components/Button.vue'
export default defineComponent({
  name: 'UserInfo',
  components: {
    Button
  },
  props: {
    userId: {
      type: Number,
      default: -1
    }
  },
  setup (props) {
    const loginId = Number(window.localStorage.getItem('userId'))
    const userData = ref({
      avatar: '',
      fans: 0,
      introduction: '',
      id: '',
      name: '',
      subscript: 0
    })
    const isFollow = ref(false)
    const getUserInfo = async (id: number) => {
      try {
        const { data } = await UserApi.getUserById(id)
        userData.value = data
        userData.value.subscript = data.subscript === ''
          ? 0
          : data.subscript.split(',').length
        const { data: followData } = await UserApi.isFollow(id)
        isFollow.value = followData
      } catch {}
    }
    onMounted(() => { getUserInfo(props.userId) })

    const handleClickFollow = async () => {
      try {
        await UserApi.follow(userData.value.id, !isFollow.value)
        isFollow.value = !isFollow.value
        const temp = userData.value.fans
        userData.value.fans = isFollow.value
          ? temp + 1
          : temp - 1
      } catch {}
    }

    return {
      loginId,
      userData,
      isFollow,
      getUserInfo,
      handleClickFollow
    }
  }
})
</script>

<style lang="scss" scoped>
.user-data-bar {
  display: flex;
  justify-content: space-between;
  margin: .8rem 0;
  .avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 2rem;
    .name {
      font-size: 2rem;
      font-weight: bold;
    }
    .intro {
      margin-right: .6rem;
      color: gray;
    }
  }
  .button-bar {
    display: flex;
    align-items: center;
    & > * { margin-left: 1rem; }
    .info-btn {
      font-size: 1rem;
    }
  }
}
</style>
