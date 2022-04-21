import { RouteRecordRaw } from 'vue-router'

export const SearchRouter: Array<RouteRecordRaw> = [
  {
    path: '/search/:keyword',
    name: 'SearchPage',
    component: () => import('@/views/SearchPage.vue'),
    meta: {
      title: '搜索'
    }
  }
]
