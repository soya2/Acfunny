import { Request } from '@/utils/request'
import { loginRequired } from '@/utils/decorators'

class NoticeApi {
  @loginRequired(false)
  getNoticeByUserId (id: number): Promise<any> {
    return Request.axiosInstance({
      url: '/notice',
      method: 'get',
      params: { id }
    })
  }
}

export default new NoticeApi()
