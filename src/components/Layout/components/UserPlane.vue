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
        <button class="btn-primary-plain" type="button" @click="handleRegister">注册</button>
        <button class="btn-primary" @click="handleLogin">登录</button>
      </div>
    </form>
    <div v-else>
      <a class="link-normal" @click="handleLogout">登出</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { login } from '@/api/users'
import Message from '@/utils/message'

export default defineComponent({
  name: 'UserPlane',
  setup () {
    const isVisible = ref(false)
    const changeVisible = (flag: boolean) => { isVisible.value = flag }
    const isClickIcon = ref(false)
    const clickIcon = (flag = false) => { isClickIcon.value = flag }
    const handleClick = () => {
      if (!isVisible.value && isClickIcon.value) {
        changeVisible(true)
      } else {
        changeVisible(false)
      }
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

    const handleLogin = async () => {
      const { username, password } = formData.value
      if (username.trim() === '' || password.trim() === '') {
        Message.error('请正确填写用户名和密码')
        return false
      }
      const { data, msg } = await login({ username, password })
      if (data !== null) {
        Message.success(msg)
        formData.value.username = ''
        formData.value.password = ''
        window.localStorage.setItem('loginStatus', 'True')
        window.localStorage.setItem('userId', data.id)
        store.commit('changeLoginState', true)
        router.push('/')
      } else {
        Message.error(msg)
      }
    }
    const handleLogout = async () => {
      store.commit('changeLoginState', false)
      window.localStorage.setItem('loginStatus', 'False')
      window.localStorage.setItem('userId', '')
    }

    const handleRegister = () => {
      router.push('/register')
      handleClick()
    }

    return {
      isVisible,
      clickIcon,
      handleLogin,
      handleRegister,
      handleLogout,
      formData,
      status
    }
  }
})
</script>

<style lang="scss" scoped>
.rounded-container {
  width: 18vw;
  overflow: hidden;
}
.login-container {
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
</style>
