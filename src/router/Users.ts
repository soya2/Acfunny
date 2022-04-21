import { RouteRecordRaw } from 'vue-router'

export const UserRoutes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Users/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/personal-center',
    name: 'PersonalCenter',
    component: () => import('@/views/Users/PersonalCenter.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/edit-user-info',
    name: 'EditUserInfo',
    component: () => import('@/views/Users/EditInfo.vue'),
    meta: {
      title: '个人信息编辑'
    }
  }
]
