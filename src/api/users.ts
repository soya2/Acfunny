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
  follow (targetId: number, isfollow: boolean): any {
    return {
      code: 0,
      data: targetId,
      msg: '关注成功'
    }
  }

  test (): Promise<any> {
    return Request.axiosInstance({
      url: '/users/test',
      method: 'get'
    })
  }
}

export default new UserApi()
