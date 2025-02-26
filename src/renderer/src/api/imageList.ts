import { http } from '@renderer/utils/http/request'
interface Result {
  code: number
  message: string
}
interface Image_Result extends Result {
  data: {
    list: Array<{
      id: string
      lineName: string
      count: number
      children: Array<children_Type>
    }>
    newData: Array<children_Type>
  }
}
export type children_Type = {
  date: Date
  id: number
  lineNum: string
  lineName: string
  liCheng: number
  xingBie: string
  deviceType: string
  deviceName: string
  deviceliCheng: number
  faultType: string
  trainSpeed: number
  trainModel: string
  trainNumber: string
  cheCi: string
  tcyNumber: string
  remark: string
  imageUrl: string
  person: string
  status: number
}

export const doPostGetImageList = (data) => {
  console.log('data: ', data)
  return http.request<Image_Result>('post', '/getImageCountByDate', { data })
}
export const doPostGetImageById = (data) => {
  return http.request('post', '/getImageById', { data }, { responseType: 'blob' })
}
export const doPostSubmitDispose = (data: {
  id: number
  person: string
  status: number
  remark: string
  faultType: string
  xingBie: string
  deviceliCheng: number
}) => {
  return http.request<Result>('post', '/submitDispose', { data })
}
