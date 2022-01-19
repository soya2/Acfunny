import { Request } from '@/utils/request'
import { loginRequired } from '@/utils/decorators'

class VideoApi {
  getVideoById (id: number): Promise<any> {
    return Request.axiosInstance({
      url: 'video',
      method: 'get',
      params: { id }
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
}

export default new VideoApi()
