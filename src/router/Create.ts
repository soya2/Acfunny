import { RouteRecordRaw } from 'vue-router'

export const CreateRouter: Array<RouteRecordRaw> = [
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create/index.vue'),
    meta: {
      title: '创作中心'
    }
  }
]
