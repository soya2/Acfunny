import { Request, Api, ResType } from '@/utils/request'
import { loginRequired, Get, Post, Loading } from '@/utils/decorators'

class VideoApi extends Api {
  getBase () { return 'video' }

  @Get('')
  async getVideoById (
    id: number,
    userId = Number(window.localStorage.getItem('userId'))
  ): ResType {
    return { id, userId }
  }

  @Get('videoList')
  async getVideoList (type: 0 | 1, list?: number[] | number): ResType {
    return { type, list }
  }

  @Get('addPlayCount')
  async addVideoPalyCount (id: number): ResType {
    return {
      userId: Number(window.localStorage.getItem('userId')),
      id
    }
  }

  @Get('commentList')
  async getCommentList (id: number): ResType {
    return { id }
  }

  @loginRequired()
  @Loading()
  @Post('addComment')
  async addComment (videoId: number, content: string): ResType {
    return {
      videoId,
      posterId: Number(window.localStorage.getItem('userId')),
      content
    }
  }

  @loginRequired()
  @Post('like')
  async likeVideo (videoId: number, type: boolean): ResType {
    return {
      userId: Number(window.localStorage.getItem('userId')),
      videoId,
      type
    }
  }

  @loginRequired()
  @Post('favorite')
  async favoriteVideo (videoId: number, type: boolean): ResType {
    return {
      userId: Number(window.localStorage.getItem('userId')),
      videoId,
      type
    }
  }

  @loginRequired()
  @Loading()
  @Post('uploadInfo')
  async uploadVideoInfo (
    title: string,
    summary: string,
    tags: string[],
    fileName: string,
    cover: string
  ): ResType {
    return {
      userId: Number(window.localStorage.getItem('userId')),
      username: window.localStorage.getItem('username'),
      title,
      summary,
      tags,
      fileName,
      cover
    }
  }

  @loginRequired()
  @Loading()
  @Post('deleteInfo')
  async deleteVideo (videoId: number): ResType {
    return { videoId }
  }

  @loginRequired()
  @Loading()
  @Post('updateInfo')
  async updateVideo (dto: {
    id: number,
    title: string,
    cover: string,
    summary: string,
    tags: string
  }): ResType {
    return dto
  }

  @loginRequired()
  @Loading()
  uploadVideoStream (from: FormData) {
    return Request.axiosInstance({
      url: 'video/videoBuffer',
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: from
    })
  }

  @loginRequired()
  @Get('removeVideoFile')
  async deleteVideoFile (hash: string): ResType {
    return { name: hash }
  }
}

export default new VideoApi()
