import { Request } from '@/utils/request'
import { loginRequired } from '@/utils/decorators'

class NoticeApi {
  @loginRequired()
  getNoticeByUserId (id: number): Promise<any> {
    return Request.axiosInstance({
      url: '/notice',
      method: 'get',
      params: { id }
    })
  }
}

export default new NoticeApi()
