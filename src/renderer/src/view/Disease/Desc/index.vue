<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import dayjs from 'dayjs'
import { doPostGetBingHaiList, doPostGetLineList } from '@renderer/api/Disease'
import { ElMessage } from 'element-plus'
import { XING_BIE } from '@renderer/constant/train'
import Echarts from '@renderer/components/ECharts/index.vue'
import { ECOption } from '@renderer/components/ECharts/echart'
import { useDebounceFn } from '@vueuse/core'
import { doPostEveryDayMaxData } from '@renderer/api/Disease'
defineOptions({
  name: 'DiseaseDesc'
})
const formInline = reactive({
  daterange: null,
  startDate: '',
  endDate: '',
  liCheng: 0,
  pianCha: 25,
  xingBie: 1,
  dengji: [1, 2, 3, 4],
  lineNum: '0008',
  pageSize: 10,
  pageNum: 1,
  liCheng_km: 725,
  liCheng_m: 45
})
const table = reactive({
  data: [],
  total: 0
})
const loading = ref(false)

onMounted(() => {
  //初始化时间
  formInline.daterange = initDate.value
  getTableData()
})
//时间修改
const handleDateChange = (value) => {
  const [startDate, endDate] = value
  formInline.startDate = startDate
  formInline.endDate = endDate
}
//给时间区间设置默认值
const initDate = computed(() => {
  const currentDate = dayjs()
  const threeDaysAgo = currentDate.subtract(3, 'day').format('YYYY-MM-DD')
  const formattedDate = currentDate.format('YYYY-MM-DD')
  return [threeDaysAgo, formattedDate]
})

//获取表格数据
const getTableData = async () => {
  try {
    loading.value = true
    // 将响应式对象转换为普通 JavaScript 对象
    const formData = { ...toRaw(formInline) }
    formData.startDate = formInline.daterange[0]
    formData.endDate = formInline.daterange[1]
    formData.liCheng = formInline.liCheng_km + formInline.liCheng_m / 1000
    delete formData.daterange
    delete formData.liCheng_km
    delete formData.liCheng_m
    const res = await doPostGetBingHaiList(formData)
    if (res.code === '200') {
      table.data = res.data.list
      // table.data = [{ duanName: '测试' }]
      table.total = res.data.total
    } else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    console.log('error: ', error)
  } finally {
    loading.value = false
  }
}
const lineNameOption = ref([])
//获取线名下拉数据
const getLineList = async () => {
  try {
    const res = await doPostGetLineList()
    if (res.code === '200') {
      lineNameOption.value = res.data.data
    } else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    console.log('error: ', error)
  }
}
getLineList()
//查询
const onSearch = useDebounceFn(() => {
  getTableData()
}, 500)
//查看图表
const dialogVisible = ref(false)
const chartOption: ECOption = reactive({
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  legend: [
    {
      show: true,
      data: ['垂加值', '水加值'],
      selected: {
        // 选中'系列1'
        垂加值: true,
        // 不选中'系列2'
        水加值: false
      }
    }
  ],
  tooltip: [
    {
      trigger: 'axis'
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: []
    }
  ],
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '垂加值',
      data: [],
      type: 'line',
      smooth: true
    },
    {
      name: '水加值',
      data: [],
      type: 'line',
      smooth: true
    }
  ]
})
//获取图表数据
const chartLoading = ref(false)
const getChartData = async (params) => {
  try {
    chartLoading.value = true
    const res = await doPostEveryDayMaxData(params)
    if (res.code === '200') {
      chartOption.xAxis[0].data = res.data.data.map((item) => {
        return item.date
      })
      chartOption.series[0].data = res.data.data.map((item) => {
        return item.chuiZhiValue
      })
      chartOption.series[1].data = res.data.data.map((item) => {
        return item.shuiPingValue
      })
    }
  } catch (error) {
    console.log('error: ', error)
  } finally {
    chartLoading.value = false
  }
}
const dialogTitle = ref('')
const handleChart = (row) => {
  dialogVisible.value = true
  const { clinenum, ixingBie, flicheng, ddate } = row

  if (row.fchuizhilevel > row.fshuipinglevel) {
    dialogTitle.value = '垂直加速图表'
    chartOption.legend[0].selected = {
      垂加值: true,
      水加值: false
    }
  } else if (row.fchuizhilevel == row.fshuipinglevel) {
    dialogTitle.value = '数据图表'
    chartOption.legend[0].selected = {
      垂加值: true,
      水加值: true
    }
  } else {
    dialogTitle.value = '水平加速图表'
    chartOption.legend[0].selected = {
      垂加值: false,
      水加值: true
    }
  }
  getChartData({
    lineNum: clinenum,
    xingBie: ixingBie,
    liCheng: flicheng,
    date: dayjs(ddate).format('YYYY-MM-DD hh:mm:ss')
  })
}
const handleClose = () => {
  dialogVisible.value = false
}
</script>

<template>
  <div class="container">
    <div class="top searchForm">
      <el-form :inline="true" :model="formInline" label-position="right">
        <el-form-item label="线名">
          <el-select v-model="formInline.lineNum" placeholder="请选择" style="width: 120px">
            <el-option
              v-for="item in lineNameOption"
              :key="item.lineNum"
              :label="item.lineName"
              :value="item.lineNum"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="行别">
          <el-select v-model="formInline.xingBie" placeholder="请选择" style="width: 120px">
            <el-option
              v-for="item in XING_BIE"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="K" style="font-weight: bold">
          <el-input-number
            v-model="formInline.liCheng_km"
            placeholder="请输入"
            clearable
            :controls="false"
            style="width: 60px"
            :min="0"
            :max="9999"
          />
          <span>+</span>
          <el-input-number
            v-model="formInline.liCheng_m"
            placeholder="请输入"
            clearable
            :controls="false"
            style="width: 60px"
            :min="0"
            :max="999"
          />
          <span>M</span>
        </el-form-item>
        <el-form-item>
          <div class="specialLabel">
            <div>前后</div>
            <el-input-number
              v-model="formInline.pianCha"
              placeholder="请输入"
              clearable
              class="form_input"
            />
            <div>米</div>
          </div>
        </el-form-item>

        <el-form-item label="时间范围" style="font-weight: bold">
          <el-date-picker
            v-model="formInline.daterange"
            :clearable="false"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD"
            @change="handleDateChange"
          />
        </el-form-item>
        <el-form-item label="数据等级">
          <el-checkbox-group v-model="formInline.dengji">
            <el-checkbox v-for="item in [1, 2, 3, 4]" :key="item" :label="item" :value="item" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <!-- <el-button type="primary" @click="onReset">重置</el-button> -->
          <el-button type="success">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <div class="table_div">
        <el-table
          v-loading="loading"
          element-loading-text="正在请求数据中，请稍后……"
          :data="table.data"
          style="width: 100%"
          height="100%"
          :default-sort="{ prop: 'ddate', order: 'descending' }"
        >
          <el-table-column prop="duanName" label="工务段" />
          <el-table-column prop="lineName" label="线名" />
          <el-table-column prop="clinenum" label="线号" />
          <el-table-column
            prop="ixingBie"
            label="行别"
            :formatter="
              (_, __, cellValue) => {
                return XING_BIE.find((item) => item.value == cellValue)?.name
              }
            "
          />

          <el-table-column
            prop="flicheng"
            label="里程"
            :formatter="(row) => row.flicheng?.toFixed(3) || 0"
            sortable
          />

          <el-table-column prop="ddate" label="日期" width="180" sortable>
            <template #default="scope">
              {{ dayjs(scope.row.ddate).format('YYYY-MM-DD hh:mm') }}
            </template>
          </el-table-column>
          <el-table-column prop="fchuizhi" label="垂加" />
          <el-table-column prop="fchuizhilevel" label="垂加等级" width="110" sortable />
          <el-table-column prop="fshuiping" label="水加" />
          <el-table-column prop="fshuipinglevel" label="水加等级" width="110" sortable />
          <el-table-column prop="fspeed" label="车速" />
          <el-table-column prop="cmodel" label="车型" />
          <el-table-column prop="cnum" label="车号" />
          <el-table-column prop="ccheci" label="车次" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click.prevent="handleChart(scope.row)">
                查看图表
              </el-button>
            </template>
          </el-table-column>
          <template #empty>
            <el-empty description="暂无数据" />
          </template>
        </el-table>
      </div>

      <div v-show="table.total > 0" class="table_pagination">
        <el-pagination
          v-model:current-page="formInline.pageNum"
          v-model:page-size="formInline.pageSize"
          background
          layout="sizes,prev, pager, next"
          :total="table.total"
          :page-sizes="[5, 15, 25]"
          @change="onSearch"
        />
      </div>
    </div>
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="80%" :before-close="handleClose">
      <div
        v-loading="chartLoading"
        style="width: 100%; height: 400px"
        element-loading-text="正在请求数据中，请稍后……"
      >
        <Echarts :option="chartOption" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    background-color: var(--el-bg-color);
    height: 100px;
  }
  .bottom {
    height: calc(100% - 115px);
    .table_div {
      height: calc(100% - 40px);
    }
    .table_pagination {
      height: 50px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
}

.specialLabel {
  color: var(--el-text-color-regular);
  display: flex;
  font-weight: bold;
  align-items: flex-start;
  .form_input {
    margin: 0 10px;
    width: 150px;
  }
}
</style>
