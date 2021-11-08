import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './assets/css/global.css'

import { Request } from './utils/request'
import VueAxios from 'vue-axios'

library.add(fas)

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, Request.init())
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
