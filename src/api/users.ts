import { Get, loginRequired, Post, Loading } from '@/utils/decorators'
import { Api, ResType } from '@/utils/request'

class UserApi extends Api {
  getBase () { return 'users' }

  @Get('')
  async getUserById (id: number): ResType {
    return { id }
  }

  @Get('userInfo')
  async getUserInfoById (id: number): ResType {
    return { id }
  }

  @Get('list')
  async getUserList (list: number[]): ResType {
    return { list }
  }

  @Post('login')
  @Loading()
  async login (info: { username: string, password: string }): ResType {
    return info
  }

  @Get('logout')
  async logout (id: number): ResType {
    return { id }
  }

  @Post('register')
  @Loading()
  async register (info: { username: string, password: string }): ResType {
    return info
  }

  @Get('isFollow')
  async isFollow (posterId: number): ResType {
    return {
      userId: Number(window.localStorage.getItem('userId')),
      posterId
    }
  }

  @loginRequired()
  @Post('follow')
  async follow (posterId: string | number, type: boolean): ResType {
    return {
      userId: Number(window.localStorage.getItem('userId')),
      posterId,
      type
    }
  }

  @loginRequired()
  @Loading()
  @Post('updateUserInfo')
  async editUserInfo (infoData: {
    userId: number,
    userName: string,
    userAvatar: string,
    introduction: string,
    showHistory: boolean;
    showFavorite: boolean
  }): ResType { return infoData }

  @loginRequired()
  @Loading()
  @Post('updateUserBanner')
  async editUserBanner (infoData: {
    userId: number,
    banner: string
  }): ResType { return infoData }
}

export default new UserApi()
