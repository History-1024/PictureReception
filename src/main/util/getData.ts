import { http } from './http/request'
interface Response_Data_Type {
  code?: string
  message?: string
  data: { data: [] }
}
//列车报警-列表

export const sendAxiosGetData = (data) => {
  return http.request<Response_Data_Type>(data.method, data.url, {
    data: data.data
  })
}
