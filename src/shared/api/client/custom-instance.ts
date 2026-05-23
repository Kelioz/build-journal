import { Config } from '@/shared/config'
import Axios, { AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: Config.API_URL,
})

export const customInstance = <T>(
  config: AxiosRequestConfig,

  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,

    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error(no-implicit-any)
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
