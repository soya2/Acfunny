import { Request } from '@/utils/request'

export function getNoticeByUserId (id: number): Promise<any> {
  return Request.axiosInstance({
    url: '/notice',
    method: 'get',
    params: { id }
  })
}
