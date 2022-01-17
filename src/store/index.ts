import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    noticeCount: 0
  },
  mutations: {
    changeLoginState (state, status: boolean) {
      window.localStorage.setItem('loginStatus', status ? 'True' : 'False')
      state.isLogin = status
    }
  },
  actions: {
  },
  modules: {
  }
})
