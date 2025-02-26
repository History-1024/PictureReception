import { http } from '@renderer/utils/http/request'
interface RepeatInfo {
  gongWuDuan: string
  lineName: string
  lineNum: number
  xingBie: number
  repeatMergeCounts: number
  repeatCount: number
  chuizhiMax: number
  shuipingMax: number
}
interface DoPostGetDataResult {
  code: string
  data: {
    duanRepeatCounts: Array<object>
    lineRepeatCounts: Array<object>
    repeatInfoList: Array<RepeatInfo>
  }
  message: string
}

interface LineListType {
  code: string
  data: {
    data: Array<{
      lineNum: string
      lineName: string
    }>
  }
  message: string
}
//线别下拉数据
export const doPostGetLineList = (data?: object) => {
  return http.request<LineListType>('post', '/login/getLineList', {
    data
  })
}

/*--重复病害统计--*/
//列表
export const doPostGetData = (data?: object) => {
  return http.request<DoPostGetDataResult>('post', '/login/statisticsRepeatErJi', {
    data
  })
}

/* --大致病害统计-- */
//列表
export const doPostRepeatLargeValue = (data?: object) => {
  return http.request<DoPostGetDataResult>('post', '/login/statisticsRepeatLargeValue', {
    data
  })
}

interface ResponseDataType {
  code: string
  message: string
  data: {
    total: number
    list: []
  }
}
/*--病害明细--*/
//列表
export const doPostGetBingHaiList = (data?: object) => {
  return http.request<ResponseDataType>('post', '/login/getBingHaiList', {
    data
  })
}

interface ResponseChartDataType {
  code: string
  message: string
  data: {
    data: [{ date: string; chuiZhiValue: string; shuiPingValue: string }]
  }
}
//查看图表
export const doPostEveryDayMaxData = (data?: object) => {
  return http.request<ResponseChartDataType>('post', '/login/everyDayMaxData', {
    data
  })
}
