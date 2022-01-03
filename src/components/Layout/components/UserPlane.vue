<template>
  <div
    v-show="isVisible"
    class="rounded-container"
    @click.stop
  >
    <div v-if="!status" class="login-container">
      <h3>登录</h3>
      <label>用户名：</label>
      <input />
      <label>密码：</label>
      <input type="password" />
      <div class="button-bar">
        <button class="btn-primary-plain">注册</button>
        <button class="btn-primary" @click="changeLogin">登录</button>
      </div>
    </div>
    <div v-else>
      User Message
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
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

    const store = useStore()
    const status = computed(() => store.state.isLogin)
    const changeLogin = () => {
      store.commit('changeLoginState', true)
    }

    return {
      isVisible,
      clickIcon,
      changeLogin,
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
