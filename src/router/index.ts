import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { UserRoutes } from './Users'
import { VideoRoutes } from './VideoPage'
import Home from '../views/Home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  ...UserRoutes,
  ...VideoRoutes,
  {
    path: '/*',
    name: 'Error',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const { title } = to.meta
  if (title !== undefined) {
    document.title = title as string
  }
  NProgress.done()
  next()
})

export default router
