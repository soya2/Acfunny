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

  @loginRequired()
  follow (userId: string | number, posterId: string | number, type: boolean): any {
    return Request.axiosInstance({
      url: 'users/follow',
      method: 'post',
      data: {
        userId,
        posterId,
        type
      }
    })
  }

  test (): Promise<any> {
    return Request.axiosInstance({
      url: '/users/test',
      method: 'get'
    })
  }
}

export default new UserApi()
