import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Store from '@/store/index'
const successCode = [200, 201]

export class Request {
  public static axiosInstance: AxiosInstance;

  public static init (): AxiosInstance {
    this.axiosInstance = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
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
        const { expired } = response.data
        if (!expired) {
          Store.commit('changeLoginState', false)
          window.localStorage.setItem('token', '')
        }
        if (successCode.includes(response.status)) {
          return response.data
        } else {
          Request.errorHandle(response)
          return response.data
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
