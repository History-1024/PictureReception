<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import { XING_BIE } from '@renderer/constant/train'
import { doPostGetReport } from '@renderer/api/daily'
import { useDebounceFn } from '@vueuse/core'

defineOptions({
  name: 'Daily'
})
onMounted(() => {
  //初始化时间
  formInline.daterange = initDate.value
  getReegoprtt()
})

const formInline = reactive({
  daterange: null,
  luju: 0,
  repeatTimes: 2,
  repetitions: 2,
  mileageDeviation: 25,
  startDate: '',
  endDate: ''
})
//给时间区间设置默认值
const initDate = computed(() => {
  const currentDate = dayjs()
  const threeDaysAgo = currentDate.subtract(3, 'day').format('YYYY-MM-DD')
  const formattedDate = currentDate.format('YYYY-MM-DD')
  return [threeDaysAgo, formattedDate]
})
const onSearch = useDebounceFn(() => {
  getReegoprtt()
}, 500)

//获取表格数据
const loading = ref(false)
const data = reactive({
  tableData: [],
  context: '',
  repeatInfoList: []
})

const getReegoprtt = async () => {
  try {
    loading.value = true
    const formData = { ...toRaw(formInline) }
    formData.startDate = formInline.daterange[0]
    formData.endDate = formInline.daterange[1]
    delete formData.daterange
    const res = await doPostGetReport(formData)
    data.context = res.data.reportText
    data.tableData = res.data.threeLevelDataList
    data.repeatInfoList = res.data.repeatInfoList
  } catch (error) {
    console.log('error: ', error)
  } finally {
    loading.value = false
  }
}
//时间修改
const handleDateChange = (value) => {
  const [startDate, endDate] = value
  formInline.startDate = startDate
  formInline.endDate = endDate
}
</script>

<template>
  <div class="container" style="height: 100%; overflow-y: hidden">
    <div class="top searchForm">
      <el-form :inline="true" :model="formInline" label-position="right">
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
        <el-form-item>
          <div class="specialLabel">
            <div>前后</div>
            <el-input-number
              v-model="formInline.repeatTimes"
              placeholder="请输入"
              clearable
              class="form_input"
            />
            <div>天合并</div>
          </div>
        </el-form-item>
        <el-form-item label="重复次数">
          <el-input-number
            v-model="formInline.repetitions"
            placeholder="请输入"
            clearable
            class="form_input"
          />
        </el-form-item>
        <el-form-item label="合并米数">
          <el-input-number
            v-model="formInline.mileageDeviation"
            placeholder="请输入"
            clearable
            class="form_input"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="success">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="loading" element-loading-text="正在请求数据中，请稍后……" class="bottom">
      <div class="bottom-left">
        <div class="table_title">三级病害明细</div>
        <div class="table_bottom">
          <div class="bottom-left-top">
            <el-table :data="data.tableData" style="width: 100%" height="100%" max-height="100%">
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

              <el-table-column prop="ddate" fixed="right" label="日期" width="180" sortable>
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
              <template #empty>
                <el-empty description="暂无数据" />
              </template>
            </el-table>
          </div>
          <div class="bottom-left-bottom">
            <el-scrollbar height="100%">
              <span v-if="data.context">{{ data.context }}</span>
              <el-empty v-else description="暂无数据" />
            </el-scrollbar>
          </div>
        </div>
      </div>
      <div class="bottom-right">
        <div class="table_title">重复病害明细</div>
        <div class="table_div">
          <el-table :data="data.repeatInfoList" style="width: 100%" height="100%" max-height="100%">
            <el-table-column prop="lineName" label="线名" />
            <el-table-column
              prop="xingBie"
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
              :formatter="(row) => row.liCheng?.toFixed(3) || 0"
              sortable
            />

            <el-table-column prop="shuipingMax" label="水加最大值"> </el-table-column>
            <el-table-column prop="chuizhiMax" label="垂加最大值"> </el-table-column>

            <el-table-column prop="gongWuDuan" label="工务段" />
            <template #empty>
              <el-empty description="暂无数据" />
            </template>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top {
    height: 60px;
    background-color: var(--el-bg-color);
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
  }
  .bottom {
    height: calc(100% - 75px);
    display: flex;
    justify-content: space-around;

    .bottom-left {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .table_title {
        height: 25px;
        line-height: 25px;
        padding: 0px 5px;
      }
      .table_bottom {
        height: calc(100% - 25px);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .bottom-left-top {
          width: 100%;
          height: 44%;
        }
        .bottom-left-bottom {
          width: 100%;
          height: 55%;
          padding: 0px 5px;
          background-color: var(--el-bg-color);
        }
      }
    }
    .bottom-right {
      width: 49%;
      height: calc(100% - 25px);
      justify-content: center;
      .table_div {
        height: calc(100%);
      }
    }
  }
}
</style>
