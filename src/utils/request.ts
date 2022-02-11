import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Store from '@/store/index'
import { Message } from '@/components/common'

export class Request {
  public static axiosInstance: AxiosInstance;

  public static init (): AxiosInstance {
    this.axiosInstance = axios.create({
      baseURL: '/api',
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // },
      timeout: 5000
    })
    this.initInterceptors()
    return axios
  }

  // 拦截器
  public static initInterceptors (): void {
    // request 拦截
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (error: unknown) => {
        console.log(error)
      }
    )

    // response 拦截
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const { code, msg } = response.data
        if (code === 403) {
          Store.commit('changeLoginState', false)
          Message.error(msg)
        }
        if (code === 0 || code === 405) {
          return response.data
        } else {
          Request.errorHandle(response)
          Message.error(msg)
          return Promise.reject(msg)
        }
      },
      (error) => {
        const { response } = error
        if (response) {
          Request.errorHandle(response)
          return Promise.reject(response.data)
        } else {
          console.log('net error!')
        }
      }
    )
  }

  private static errorHandle (res: AxiosResponse) {
    switch (res.status) {
      case 401: break
      case 403: break
      case 404: console.log('not found!'); break
      default:
    }
  }
}

export type ResType = Promise<any>
export abstract class Api {
  abstract getBase (): string
}
