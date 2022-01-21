import { RouteRecordRaw } from 'vue-router'
import VideoPage from '@/views/VideoPage/index.vue'

export const VideoRoutes: Array<RouteRecordRaw> = [
  {
    path: '/video',
    name: 'VideoPage',
    component: VideoPage
  }
]
