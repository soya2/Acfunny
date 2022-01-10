import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { UserRoutes } from './Users'
import Home from '../views/Home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...UserRoutes,
  {
    path: '/test',
    name: 'TestPage',
    component: () => import('../views/TestPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
