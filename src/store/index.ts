import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    noticeCount: 0
  },
  mutations: {
    changeLoginState (state, status: boolean) {
      state.isLogin = status
    }
  },
  actions: {
  },
  modules: {
  }
})
