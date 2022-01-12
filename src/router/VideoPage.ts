import { RouteRecordRaw } from 'vue-router'
import VideoPage from '@/components/VideoPage/index.vue'

export const VideoRoutes: Array<RouteRecordRaw> = [
  {
    path: '/video',
    name: 'VideoPage',
    component: VideoPage
  }
]
