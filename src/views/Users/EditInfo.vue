<template>
  <div class="base-container">
    <p class="form-title">账号信息</p>
    <form>
      <label for="avatar">头像：</label>
      <div v-show="avatarUrl !== ''">
        <img
          class="avatar"
          :src="avatarUrl"
        />
      </div>
      <Upload
        accept=".jpg"
        :hasUpload="false"
        @handleChooseFile="handleChoose"
        @handleClickDelete="avatarUrl = ''"
      />
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
import { UserApi } from '@/api'
import Message from '@/utils/message'
import Upload from '@/components/Upload.vue'
import Switch from '@/components/Switch.vue'
export default defineComponent({
  name: 'EditInfo',
  components: {
    Upload,
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
        const { data } = await UserApi.getUserById(id)
        userData.value = data
        const { data: info } = await UserApi.getUserInfoById(id)
        userInfo.value = info
      } catch {}
    }
    getUserInfo(userId.value)

    const avatarUrl = ref('')
    const handleChoose = (buffer: ArrayBuffer) => {
      avatarUrl.value = URL.createObjectURL(new Blob([buffer]))
    }

    const submit = async () => {
      const { msg } = await UserApi.editUserInfo({
        userId: userId.value,
        userName: userData.value.name,
        introduction: userData.value.introduction,
        showHistory: userInfo.value.showHistory,
        showFavorite: userInfo.value.showFavorite
      })
      Message.success(msg)
    }

    return {
      userData,
      userInfo,
      avatarUrl,
      handleChoose,
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
  .avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
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
