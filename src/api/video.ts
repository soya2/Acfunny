import { Request } from '@/utils/request'
import { loginRequired } from '@/utils/decorators'

class VideoApi {
  getVideoById (
    id: number,
    userId = window.localStorage.getItem('userId')
  ): Promise<any> {
    return Request.axiosInstance({
      url: 'video',
      method: 'get',
      params: { id, userId }
    })
  }

  getVideoList (type: 0 | 1, list: number[]): Promise<any> {
    return Request.axiosInstance({
      url: 'video/videoList',
      method: 'get',
      params: { type, list }
    })
  }

  addVideoPalyCount (id: number): Promise<any> {
    return Request.axiosInstance({
      url: 'video/addPlayCount',
      method: 'post',
      params: {
        userId: Number(window.localStorage.getItem('userId')),
        id
      }
    })
  }

  getCommentList (id: number): Promise<any> {
    return Request.axiosInstance({
      url: 'video/commentList',
      method: 'get',
      params: { id }
    })
  }

  @loginRequired()
  addComment (videoId: number, content: string): Promise<any> {
    const posterId = Number(window.localStorage.getItem('userId'))
    return Request.axiosInstance({
      url: 'video/addComment',
      method: 'post',
      data: { videoId, posterId, content }
    })
  }

  @loginRequired()
  likeVideo (videoId: number, type: boolean): Promise<any> {
    return Request.axiosInstance({
      url: 'video/like',
      method: 'post',
      data: {
        userId: Number(window.localStorage.getItem('userId')),
        videoId,
        type
      }
    })
  }

  @loginRequired()
  favoriteVideo (videoId: number, type: boolean): Promise<any> {
    return Request.axiosInstance({
      url: 'video/favorite',
      method: 'post',
      data: {
        userId: Number(window.localStorage.getItem('userId')),
        videoId,
        type
      }
    })
  }

  @loginRequired()
  uploadVideoInfo (title: string, summary: string, tags: string[]): Promise<any> {
    return Request.axiosInstance({
      url: 'video/uploadInfo',
      method: 'post',
      data: {
        userId: Number(window.localStorage.getItem('userId')),
        username: window.localStorage.getItem('username'),
        title,
        summary,
        tags
      }
    })
  }

  @loginRequired()
  uploadVideoStream (from: FormData) {
    return Request.axiosInstance({
      url: 'video/videoBuffer',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: from
    })
  }
}

export default new VideoApi()
