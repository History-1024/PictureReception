import { http } from '@renderer/utils/http/request'
interface Response_Data_Type {
  code: string
  message: string
  data: {
    data: []
  }
}
//密集区段数据统计-列表
export const doPostDenseList = (data?: object) => {
  return http.request<Response_Data_Type>('post', '/login/denseSectionStatistics', {
    data
  })
}
export const doPostDenseSectionStatistics = (data?: object) => {
  return http.post(
    '/login/denseSectionStatistics/download',
    {
      data
    },
    {
      responseType: 'arraybuffer'
    }
  )
}
