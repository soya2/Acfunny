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
}

export default new VideoApi()
