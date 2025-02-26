import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { SLHttpError, RequestMethods, SLHttpResponse, SLHttpRequestConfig, Token } from './types'
import { getStoreToken } from '../../store'
import { formatToken, getAppToken } from '../auth'

const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  // 请求超时时间
  timeout: 300000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    withCredentials: true
  }
}

class SLHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }
  /** token过期后，暂存待执行的请求 */
  public static requestList: ((token: string) => void)[] = []
  /** 防止重复刷新token */
  private static isRefreshing = false
  /** 初始化配置对象 */
  private static initConfig: SLHttpRequestConfig = {}
  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)
  /** 重连原始请求 */
  private static retryOriginalRequest(config: SLHttpRequestConfig) {
    return new Promise((resolve) => {
      SLHttp.requestList.push((token: string) => {
        config.headers!['Authorization'] = token
        resolve(config)
      })
    })
  }
  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    SLHttp.axiosInstance.interceptors.request.use(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (config: SLHttpRequestConfig): Promise<any> => {
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config)
          return config
        }
        if (SLHttp.initConfig.beforeRequestCallback) {
          SLHttp.initConfig.beforeRequestCallback(config)
          return config
        }
        /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
        const whiteList = ['/login', '/getImageCountByDate']
        return whiteList.find((url) => {
          return url === config.url
        })
          ? config
          : new Promise((resolve) => {
              //获取token
              const tokenData = getStoreToken()
              //token存在
              if (tokenData) {
                //检查超时
                const flag = new Date().getTime() > tokenData.expires
                if (flag) {
                  //检查是否在刷新token
                  if (!SLHttp.isRefreshing) {
                    SLHttp.isRefreshing = true
                    // token过期刷新
                    getAppToken()
                      .then((res: Token) => {
                        const { access_token, token_type } = res
                        config.headers!['Authorization'] = formatToken(token_type, access_token)
                        SLHttp.requestList.forEach((cb) => cb(token_type + ' ' + access_token))
                        SLHttp.requestList = []
                      })
                      .finally(() => {
                        SLHttp.isRefreshing = false
                      })
                  }
                  resolve(SLHttp.retryOriginalRequest(config))
                } else {
                  config.headers!['Authorization'] = formatToken(
                    tokenData.token_type,
                    tokenData.access_token
                  )
                  resolve(config)
                }
              } else {
                getAppToken().then((res: Token) => {
                  const { access_token, token_type } = res
                  config.headers!['Authorization'] = formatToken(access_token, token_type)
                  resolve(config)
                })
              }
            })
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = SLHttp.axiosInstance
    instance.interceptors.response.use(
      (response: SLHttpResponse) => {
        const $config = response.config
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data
        }
        if (SLHttp.initConfig.beforeResponseCallback) {
          SLHttp.initConfig.beforeResponseCallback(response)
          return response.data
        }
        return response
      },
      (error: SLHttpError) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      }
    )
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: SLHttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as SLHttpRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise<T>((resolve, reject) => {
      SLHttp.axiosInstance
        .request(config)
        .then((response: AxiosResponse<T>) => {
          resolve(response.data) // 返回响应数据而不是整个 AxiosResponse
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的post工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: SLHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('post', url, params, config)
  }

  /** 单独抽离的get工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<T>,
    config?: SLHttpRequestConfig
  ): Promise<P> {
    return this.request<P>('get', url, params, config)
  }
}

export const http = new SLHttp()
