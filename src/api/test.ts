import { Request } from '@/utils/request'

export function getTestData (params?: any): Promise<any> {
  return Request.axiosInstance({
    url: '/test',
    method: 'get',
    params: params || {}
  })
}
