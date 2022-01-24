import Store from '@/store/index'
import Message from './message'

export const loginRequired = (isBreak = true) => {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const method = descriptor.value
    document.cookie = `token=${window.localStorage.getItem('token')}`
    descriptor.value = function (...args: any[]) {
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
