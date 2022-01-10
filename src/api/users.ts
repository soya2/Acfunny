import { Request } from '@/utils/request'

export function getUserById (id: number): Promise<any> {
  return Request.axiosInstance({
    url: '/users',
    method: 'get',
    params: { id }
  })
}

export function login (info: { username: string, password: string }): Promise<any> {
  return Request.axiosInstance({
    url: '/users/login',
    method: 'post',
    data: info
  })
}

export function register (info: { username: string, password: string }): Promise<any> {
  return Request.axiosInstance({
    url: '/users/register',
    method: 'post',
    data: info
  })
}
