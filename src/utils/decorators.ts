import Store from '@/store/index'
import { Loader, Message } from '@/components/common'
import { Request, Api } from '@/utils/request'

type Args = any[]

export const loginRequired = (isBreak = true) => {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const method = descriptor.value
    document.cookie = `token=${window.localStorage.getItem('token')}`
    descriptor.value = function (...args: Args) {
      const status = Store.state.isLogin
      if (status) {
        return method.apply(this, args)
      } else if (isBreak) {
        Message.error('请先登录')
        throw Error('请先登录')
      } else {
        return { code: 403, data: null, msg: '请先登录' }
      }
    }
    return descriptor
  }
}

export const Loading = (msg = '请稍后', duration = 5000) => {
  return function (
    target: Api,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const method = descriptor.value
    descriptor.value = async function (...args: Args) {
      Loader.start(duration, msg)
      const result = await method.apply(this, args)
      Loader.stop()
      return result
    }
    return descriptor
  }
}

export const Get = (controller: string) => {
  return function (
    target: Api,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const url = `${target.getBase()}/${controller}`
    const method = descriptor.value
    descriptor.value = async function (...args: Args) {
      return Request.axiosInstance({
        url,
        method: 'get',
        params: await method.apply(this, args)
      })
    }
    return descriptor
  }
}

export const Post = (controller: string) => {
  return function (
    target: Api,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const url = `${target.getBase()}/${controller}`
    const method = descriptor.value
    descriptor.value = async function (...args: Args) {
      return Request.axiosInstance({
        url,
        method: 'post',
        data: await method.apply(this, args)
      })
    }
    return descriptor
  }
}
