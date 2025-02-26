<template>
  <div class="container">
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
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="success">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="loading" element-loading-text="正在请求数据中，请稍后……" class="bottom">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        max-height="100%"
        :default-sort="{ prop: 'twoLevelCount', order: 'descending' }"
      >
        <el-table-column prop="trainModelNum" label="车型" />
        <el-table-column prop="trainNum" label="车号" />
        <el-table-column
          prop="yunXingLiCheng"
          label="运行里程"
          :formatter="(row) => row.yunXingLiCheng?.toFixed(3) || 0"
        />
        <el-table-column prop="twoLevelCount" label="二级数量" sortable />
        <el-table-column prop="threeLevelCount" label="三级数量" sortable />
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'HaulageMotor'
})
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import { doPostTrainData } from '@renderer/api/siren'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { useDebounceFn } from '@vueuse/core'

const formInline = reactive({
  daterange: null,
  startDate: '',
  endDate: ''
})
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

//查询
const onSearch = useDebounceFn(() => {
  getTableData()
}, 500)
const loading = ref(false)
//重点病害处所
const tableData = ref([])
//获取表格数据
const getTableData = async () => {
  try {
    loading.value = true
    // 将响应式对象转换为普通 JavaScript 对象
    const formData = { ...toRaw(formInline) }
    formData.startDate = formInline.daterange[0]
    formData.endDate = formInline.daterange[1]
    delete formData.daterange
    const res = await doPostTrainData(formData)
    if (res.code === '200') {
      tableData.value = res.data.data
    } else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    console.log('error: ', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    background-color: var(--el-bg-color);
    height: 60px;
  }
  .bottom {
    height: calc(100% - 75px);
  }
}
</style>
