import Store from '@/store/index'

export const loginRequired = () => {
  return function (target: unknown, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const method = descriptor.value
    descriptor.value = function (...args: any[]) {
      const status = Store.state.isLogin
      if (status) {
        return method.apply(this, args)
      } else {
        return { code: 400, msg: '请先登录', data: null }
      }
    }
    return descriptor
  }
}
