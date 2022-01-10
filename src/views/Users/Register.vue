<template>
  <div class="base-container">
    <p class="form-title">注册</p>
    <form>
      <label for="username">用户名：</label>
      <input
        id="username"
        required
        v-model="formData.username"
        placeholder="请输入用户名"
      />
      <label for="password">密码：</label>
      <input
        id="password"
        required
        type="password"
        v-model="formData.password"
        placeholder="请输入密码"
      />
      <label for="passwordCheck">再次输入密码：</label>
      <input
        id="passwordCheck"
        required
        type="password"
        v-model="formData.passwordCheck"
        placeholder="请再次输入密码"
      />
    </form>
    <div class="button-bar">
      <button
        class="btn-primary"
        type="submit"
        @click="handleRegister"
      >注册</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Message from '@/utils/message'
import { register } from '@/api/users'

export default defineComponent({
  name: 'Register',
  setup () {
    const formData = ref({
      username: '',
      password: '',
      passwordCheck: ''
    })

    const handleRegister = async () => {
      const { username, password, passwordCheck } = formData.value
      if (password.trim().length < 6) {
        Message.error('密码的长度小于6位')
        return false
      }
      if (password.trim() !== passwordCheck.trim()) {
        Message.error('两次输入的密码不一致')
        return false
      }
      const { code, msg } = await register({ username, password })
      switch (code) {
        case 200: Message.success(msg); break
        case 401: Message.error(msg); break
        default: Message.error('注册失败')
      }
    }

    return {
      formData,
      handleRegister
    }
  }
})
</script>

<style lang="scss" scoped>
.base-container {
  margin: auto;
  width: 36%;
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
  }
}
</style>
