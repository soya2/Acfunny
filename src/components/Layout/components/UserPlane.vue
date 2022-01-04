<template>
  <div
    v-show="isVisible"
    class="rounded-container"
    @click.stop
  >
    <div v-if="!status" class="login-container">
      <h3>登录</h3>
      <label>用户名：</label>
      <input
        v-model="formData.username"
        placeholder="请使用用户名或邮箱登录"
      />
      <label>密码：</label>
      <input
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        @keyup.enter="handleLogin"
      />
      <div class="button-bar">
        <button class="btn-primary-plain">注册</button>
        <button class="btn-primary" @click="handleLogin">登录</button>
      </div>
    </div>
    <div v-else>
      <a class="link-normal" @click="handleLogout">登出</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import { login } from '@/api/users'

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
      username: 'Alice',
      password: '123456'
    })
    // 96b372c8042314c9ccde70eb601d4d89

    const store = useStore()
    const status = computed(() => store.state.isLogin)
    const handleLogin = async () => {
      const { username, password } = formData.value
      if (username.trim() === '' || password.trim() === '') {
        console.error('请正确填写用户名和密码')
        return false
      }
      const { data } = await login({ username, password })
      if (data === true) {
        console.log('登录成功')
        formData.value.username = ''
        formData.value.password = ''
        store.commit('changeLoginState', true)
      } else {
        console.error('登录失败')
      }
    }
    const handleLogout = async () => {
      store.commit('changeLoginState', false)
    }

    return {
      isVisible,
      clickIcon,
      handleLogin,
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
