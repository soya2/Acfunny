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

  addVideoPalyCount (id: number): Promise<any> {
    return Request.axiosInstance({
      url: 'video/addPlayCount',
      method: 'post',
      params: { id }
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
  addComment (commentData: {
    videoId: number,
    posterId: number,
    content: string
  }): Promise<any> {
    return Request.axiosInstance({
      url: 'video/addComment',
      method: 'post',
      data: commentData
    })
  }

  @loginRequired()
  likeVideo (userId: number, videoId: number, type: boolean): Promise<any> {
    return Request.axiosInstance({
      url: 'video/like',
      method: 'post',
      data: { userId, videoId, type }
    })
  }

  @loginRequired()
  favoriteVideo (userId: number, videoId: number, type: boolean): Promise<any> {
    return Request.axiosInstance({
      url: 'video/favorite',
      method: 'post',
      data: { userId, videoId, type }
    })
  }
}

export default new VideoApi()
