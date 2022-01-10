import { RouteRecordRaw } from 'vue-router'
import Register from '@/views/Users/Register.vue'

export const UserRoutes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]
