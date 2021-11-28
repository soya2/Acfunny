import { Request } from '@/utils/request'

export function getUserById (id: number): Promise<any> {
  return Request.axiosInstance({
    url: '/users',
    method: 'get',
    params: { id }
  })
}
