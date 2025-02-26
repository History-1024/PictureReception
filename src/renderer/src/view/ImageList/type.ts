export interface GetImageCountByDateResult_Type {
  code: number
  data: {
    list: Array<{
      id: string
      lineName: string
      count: number
      children: Array<children_Type>
    }>
    newData: Array<children_Type>
  }
  message: string
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
