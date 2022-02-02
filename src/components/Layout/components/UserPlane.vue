<template>
  <div
    v-show="isVisible"
    class="rounded-container"
    @click.stop
  >
    <form v-if="!status" class="login-container">
      <h3>登录</h3>
      <label for="username">用户名：</label>
      <input
        id="username"
        required
        v-model="formData.username"
        placeholder="请使用用户名或邮箱登录"
      />
      <label for="password">密码：</label>
      <input
        id="password"
        required
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        @keyup.enter="handleLogin"
      />
      <div class="button-bar">
        <button class="btn-primary-plain" type="button" @click="routePush('/register')">注册</button>
        <button class="btn-primary" @click="handleLogin">登录</button>
      </div>
    </form>
    <div class="personal-container" v-else>
      <div
        class="aside-item"
        @click="routePush(`/personal-center?id=${userId}`)"
      >
        <font-awesome-icon icon="user" />
        个人中心
      </div>
      <div
        class="aside-item"
        @click="handleLogout"
      >
        <font-awesome-icon icon="reply" />
        登出
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import UserApi from '@/api/users'
import Message from '@/utils/message'

export default defineComponent({
  name: 'UserPlane',
  setup () {
    const isVisible = ref(false)
    const changeVisible = (flag: boolean) => { isVisible.value = flag }
    const isClickIcon = ref(false)
    const clickIcon = (flag = false) => { isClickIcon.value = flag }
    const handleClick = () => {
      changeVisible(!isVisible.value && isClickIcon.value)
      clickIcon()
    }
    onMounted(() => {
      window.addEventListener('click', handleClick, false)
    })
    onUnmounted(() => {
      window.removeEventListener('click', handleClick)
    })

    const formData = ref({
      username: '',
      password: ''
    })
    // 96b372c8042314c9ccde70eb601d4d89

    const store = useStore()
    const status = computed(() => store.state.isLogin)
    const router = useRouter()

    const userId = ref(Number(window.localStorage.getItem('userId')))
    const handleLogin = async () => {
      const { username, password } = formData.value
      if (username.trim() === '' || password.trim() === '') {
        Message.error('请正确填写用户名和密码')
        return false
      }
      try {
        const { data, msg } = await UserApi.login({ username, password })
        Message.success(msg)
        userId.value = data.id
        window.localStorage.setItem('username', formData.value.username)
        window.localStorage.setItem('userId', data.id)
        window.localStorage.setItem('token', data.token)
        store.commit('changeLoginState', true)
        formData.value.username = ''
        formData.value.password = ''
        router.push('/')
        handleClick()
      } catch {}
    }
    const handleLogout = async () => {
      const id = window.localStorage.getItem('userId')
      const { code, msg } = await UserApi.logout(Number(id))
      if (code === 0) {
        store.commit('changeLoginState', false)
        window.localStorage.setItem('username', '')
        window.localStorage.setItem('userId', '')
      } else {
        Message.error(msg)
      }
    }

    const routePush = (url: string) => {
      router.push(url)
      handleClick()
    }

    return {
      isVisible,
      clickIcon,
      handleLogin,
      handleLogout,
      routePush,
      userId,
      formData,
      status
    }
  }
})
</script>

<style lang="scss" scoped>
.rounded-container {
  height: fit-content;
  width: 18vw;
  overflow: hidden;
}
.login-container {
  margin: .5rem;
  input {
    width: 95%;
  }
  .button-bar {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
    }
  }
}
.personal-container > *{
  border-radius: 6px;
  margin: .2rem 0;
  padding: .2rem .6rem;
  transition: .2s;
  cursor: pointer;
  &:hover {
    color: red;
    background-color: #ffdde05d;
  }
}
</style>
