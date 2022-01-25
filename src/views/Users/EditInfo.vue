<template>
  <div class="base-container">
    <p class="form-title">账号信息</p>
    <form>
      <label for="username">用户名：</label>
      <input
        id="username"
        required
        v-model="userData.name"
        placeholder="用户名"
      />
      <label for="introduction">简介：</label>
      <input
        id="introduction"
        required
        v-model="userData.introduction"
        placeholder="简介"
      />
      <label for="showHistory">是否展示历史：</label>
      <Switch v-model="userInfo.showHistory" />
      <label for="showFavorite">是否展示收藏：</label>
      <Switch v-model="userInfo.showFavorite" />
    </form>
    <div class="button-bar">
      <button
        class="btn-primary-plain"
        type="submit"
        @click="$router.go(-1)"
      >取消</button>
      <button
        class="btn-primary"
        type="submit"
        @click="submit"
      >提交</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import UsersApi from '@/api/users'
import Switch from '@/components/Switch.vue'
export default defineComponent({
  name: 'EditInfo',
  components: {
    Switch
  },
  setup () {
    const route = useRoute()
    const userId = ref(Number(route.query.id))

    const userData = ref({
      name: '',
      introduction: ''
    })
    const userInfo = ref({
      showHistory: false,
      showFavorite: false
    })
    const getUserInfo = async (id: number) => {
      try {
        const { data } = await UsersApi.getUserById(id)
        userData.value = data
        const { data: info } = await UsersApi.getUserInfoById(id)
        userInfo.value = info
      } catch {}
    }
    getUserInfo(userId.value)

    const submit = () => {
      console.log(1)
    }

    return {
      userData,
      userInfo,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.base-container {
  margin: 2rem auto;
  width: 25%;
  .form-title {
    font-size: 1.4rem;
    font-weight: bold;
  }
  input {
    margin: 10px 0;
  }
  .button-bar {
    display: flex;
    justify-content: flex-end;
    button {
      margin-left: .6rem;
    }
  }
}
</style>
