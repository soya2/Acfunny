import { RouteRecordRaw } from 'vue-router'
import Register from '@/views/Users/Register.vue'
import PersonalCenter from '@/views/Users/PersonalCenter.vue'

export const UserRoutes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/personal-center',
    name: 'PersonalCenter',
    component: PersonalCenter,
    meta: {
      title: '个人中心'
    }
  }
]
