import { http } from '@renderer/utils/http/request'
interface Response_Data_Type {
  code: string
  message: string
  data: {
    reportText: string
    threeLevelDataList: []
    repeatInfoList: []
  }
}

export const doPostGetReport = (data?: object) => {
  return http.request<Response_Data_Type>('post', '/login/getReport', {
    data
  })
}
