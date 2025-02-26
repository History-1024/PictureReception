<script setup lang="ts">
import Echarts from '@renderer/components/ECharts/index.vue'
import { ECOption } from '@renderer/components/ECharts/echart'
import { ref, onMounted, reactive } from 'vue'
import { useAppHook } from '@renderer/store/modules/system'
import IndexCard from './IndexCard.vue'
defineOptions({
  name: 'Home'
})

const openWindow = (hash: string) => {
  localStorage.setItem('routerType', 'Desc')
  window.ElectronApi.createChildWindow({ url: hash, data: { name: '子窗口' } })
}
const loading = ref(false)
const tableData = ref([
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  },
  {
    xianName: '线路一',
    xingbie: '上',
    cusuo: '处所一',
    erji: 10
  }
])

const option1: ECOption = reactive({
  title: {
    text: '7天内数据总量分布',

    left: 'center',
    top: 10
  },
  legend: {
    data: ['一级', '二级', '三级'],
    top: 40
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 80,
    bottom: 40,
    right: 20
  },
  xAxis: {
    type: 'category',
    data: ['05/01', '05/02', '05/03', '05/04', '05/05', '05/06', '05/07']
  },
  yAxis: {
    type: 'value'
  },

  series: [
    {
      name: '一级',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    },
    {
      name: '二级',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    },
    {
      name: '三级',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
})
const option2: ECOption = reactive({
  title: {
    text: '24小时内各车型数据总量分布',

    left: 'center',
    top: 10
  },
  legend: {
    data: ['一级', '二级', '三级'],
    top: 40
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 80,
    bottom: 40,
    right: 20
  },
  xAxis: {
    type: 'category',
    data: ['车型A', '车型B', '车型C', '车型D', '车型E']
  },
  yAxis: {
    type: 'value'
  },

  series: [
    {
      name: '一级',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    },
    {
      name: '二级',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    },
    {
      name: '三级',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    }
  ]
})
const option3: ECOption = reactive({
  title: {
    text: '24小时内各车型上线机车数，趟次',

    left: 'center',
    top: 10
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['机车数', '趟次'],
    top: 40
  },
  grid: {
    top: 80,
    bottom: 40,
    right: 20
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '机车数',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar'
    },
    {
      name: '趟次',
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line'
    }
  ]
})
const option4: ECOption = reactive({
  title: {
    text: '24小时内二级数量分布',

    left: 'center',
    top: 10
  },
  legend: {
    data: ['机车数', '趟次'],
    top: 40
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 80,
    bottom: 40,
    right: 20
  },
  xAxis: {
    type: 'category',
    data: ['线路A', '线路B', '线路C', '线路D']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '二级数量',
      data: [120, 200, 150, 80],
      type: 'bar',
      barWidth: 30
    }
  ]
})
// const getElectronToken = async () => {
//   const res = await window.ElectronApi.getAppToken({
//     password: '63771258',
//     username: 'NanChangGongWuBu'
//   })
//   console.log('res: ', res)
// }
onMounted(() => {
  window.ElectronApi.toggleTheme(() => {
    useAppHook().changeTheme()
  })
})
</script>

<template>
  <div class="container">
    <div class="left">
      <div class="item">
        <Echarts :option="option1" />
      </div>
      <div class="item"><Echarts :option="option2" /></div>
      <div class="item"><Echarts :option="option3" /></div>
    </div>
    <div class="center">
      <div class="center-top">
        <div class="title">北京三岭科技</div>
        <div class="button" @click="openWindow('Disease/Desc')">查看详细数据</div>
      </div>
      <div class="center-center">
        <div class="center-center-top">
          <div class="index-top"><IndexCard :title="'今日一级数量'" :value="10000" /></div>
          <div class="index-bottom">
            <div class="item">
              <IndexCard :title="'今日二级数量'" :value="20000" />
            </div>
            <div class="item">
              <IndexCard :title="'今日三级数量'" :value="30000" />
            </div>
          </div>
        </div>
        <div class="center-center-bottom">
          <div class="index-top"><IndexCard :title="'近七天一级数量'" :value="1000" /></div>
          <div class="index-bottom">
            <div class="item">
              <IndexCard :title="'近七天二级数量'" :value="2000" />
            </div>
            <div class="item">
              <IndexCard :title="'本月三级数量'" :value="3000" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="center-bottom">
        <el-button type="primary" @click="openWindow('Disease/Desc')">打开病害明细窗口</el-button>
        <el-button type="primary" @click="openWindow('Disease/RepeatedDisease')"
          >打开重复病害窗口</el-button
        >
        <el-button type="primary" @click="getElectronToken">getElectronToken</el-button>
      </div> -->
    </div>
    <div class="right">
      <div class="item"><Echarts :option="option4" /></div>
      <div class="table-item">
        <div class="el-table-title">24小时内病害处所二级数据辆TOP10</div>
        <div class="table-div">
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%"
            :default-sort="{ prop: 'ddate', order: 'descending' }"
            row-class-name="tableRowClass"
          >
            <el-table-column type="index" width="50" />
            <el-table-column prop="xianName" label="线路" />
            <el-table-column prop="xingbie" label="行别" />
            <el-table-column prop="cusuo" label="病害处所" />
            <el-table-column prop="erji" label="二级数量" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  padding: 8px 10px;
  justify-content: space-between;
  background: linear-gradient(to bottom, #001d66, #0958d9, #001d66);
  .left {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item {
      height: 32.5%;
      width: 100%;
      border-radius: 15px;
      background-color: #4096ff50;
      box-shadow: 0px 0px 2px #001d66;
    }
  }
  .center {
    width: 33%;
    height: 100%;
    .center-top {
      height: 100px;
      font-size: 30px;
      text-align: center;
      border-bottom: 1px solid var(--el-border-color);
      color: var(--el-bg-color);
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .button {
        font-size: 18px;
        color: #4096ff;
        cursor: pointer;
        &:hover {
          color: #bae0ff;
        }
      }
    }
    .center-center {
      height: calc(100% - 200px);
      width: 100%;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .center-center-top {
        height: 48.75%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .index-top {
          height: 50%;
          width: 50%;
          margin: 0 auto;
        }
        .index-bottom {
          margin-top: 10px;
          height: 50%;
          width: 100%;
          display: flex;
          justify-content: space-around;
          .item {
            height: 100%;
            width: 48%;
          }
        }
      }
      .center-center-bottom {
        height: 48.75%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .index-top {
          height: 50%;
          width: 50%;
          margin: 0 auto;
        }
        .index-bottom {
          margin-top: 10px;
          height: 50%;
          width: 100%;
          display: flex;
          justify-content: space-around;
          .item {
            height: 100%;
            width: 48%;
          }
        }
      }
    }
  }
  .right {
    width: 33%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .table-item {
      height: 66.5%;
      width: 100%;
      border-radius: 15px;
      background-color: #4096ff50;
      box-shadow: 0px 0px 2px #001d66;
      .el-table-title {
        height: 50px;
        width: 100%;
        font-size: 18px;
        padding: 10px;
        text-align: center;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--el-bg-color);
      }
      .table-div {
        height: calc(100% - 60px);
        background-color: rgba(0, 0, 0, 0);
        :deep(.el-table th.el-table__cell) {
          background-color: rgba(0, 0, 0, 0) !important;
          color: var(--el-bg-color);
        }
        :deep(.el-table) {
          background-color: rgba(0, 0, 0, 0);
        }
        :deep(.el-table tr) {
          background-color: rgba(0, 0, 0, 0);
          color: var(--el-bg-color);
        }
        :deep(.el-table tr:hover) {
          background-color: #4096ff !important;
        }
        .el-table {
          --el-table-row-hover-bg-color: var(--el-transfer-border-color);
        }
      }
    }
    .item {
      height: 32.5%;
      width: 100%;
      border-radius: 15px;
      background-color: #4096ff50;
      box-shadow: 0px 0px 2px #001d66;
    }
  }
}
.tableRowClass {
  background-color: #4096ff50;
}
</style>
