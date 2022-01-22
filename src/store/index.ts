import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    noticeCount: 0
  },
  mutations: {
    changeLoginState (state, status: boolean) {
      window.localStorage.setItem('loginStatus', status ? 'True' : 'False')
      if (!status) window.localStorage.setItem('token', '')
      state.isLogin = status
    }
  },
  actions: {
  },
  modules: {
  }
})
