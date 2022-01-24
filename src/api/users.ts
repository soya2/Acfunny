import { loginRequired } from '@/utils/decorators'
import { Request } from '@/utils/request'

class UserApi {
  getUserById (id: number): Promise<any> {
    return Request.axiosInstance({
      url: '/users',
      method: 'get',
      params: { id }
    })
  }

  getUserInfoById (id: number): Promise<any> {
    return Request.axiosInstance({
      url: '/users/userInfo',
      method: 'get',
      params: { id }
    })
  }

  login (info: { username: string, password: string }): Promise<any> {
    return Request.axiosInstance({
      url: '/users/login',
      method: 'post',
      data: info
    })
  }

  logout (id: number): Promise<any> {
    return Request.axiosInstance({
      url: '/users/logout',
      method: 'get',
      params: { id }
    })
  }

  register (info: { username: string, password: string }): Promise<any> {
    return Request.axiosInstance({
      url: '/users/register',
      method: 'post',
      data: info
    })
  }

  isFollow (posterId: number): Promise<any> {
    return Request.axiosInstance({
      url: 'users/isFollow',
      method: 'get',
      params: {
        userId: Number(window.localStorage.getItem('userId')),
        posterId
      }
    })
  }

  @loginRequired()
  follow (posterId: string | number, type: boolean): Promise<any> {
    return Request.axiosInstance({
      url: 'users/follow',
      method: 'post',
      data: {
        userId: Number(window.localStorage.getItem('userId')),
        posterId,
        type
      }
    })
  }
}

export default new UserApi()
