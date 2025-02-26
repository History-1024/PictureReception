import { http } from '@renderer/utils/http/request'
interface Response_Data_Type {
  code?: string
  message?: string
  data: { data: [] }
}
//列车报警-列表

export const doPostTrainData = (data?: object) => {
  return http.request<Response_Data_Type>('post', '/login/trainDataLevelCount', {
    data
  })
}

//线路报警

export const doPostLineData = (data?: object) => {
  return http.request<Response_Data_Type>('post', '/login/lineDataLevelCount', {
    data
  })
}
