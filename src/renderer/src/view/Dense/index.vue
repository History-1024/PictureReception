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
          <div class="specialLabel">
            <div>区段长度</div>
            <el-input-number
              v-model="formInline.sectionLength"
              placeholder="请输入"
              clearable
              class="form_input"
            />
            <div>公里</div>
          </div>
        </el-form-item>
        <el-form-item label="数据等级">
          <el-checkbox-group v-model="formInline.dengji">
            <el-checkbox v-for="item in [1, 2, 3, 4]" :key="item" :label="item" :value="item" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button
            v-loading="exportLoading"
            element-loading-spinner='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-ea893728=""><path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>'
            type="success"
            @click="exportTableData"
            >导出</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div v-loading="loading" element-loading-text="正在请求数据中，请稍后……" class="bottom">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        max-height="100%"
        :default-sort="{ prop: 'oneLevelCount', order: 'descending' }"
      >
        <el-table-column prop="lineName" label="线名" />
        <el-table-column prop="lineNum" label="线号" />
        <el-table-column
          prop="xingBie"
          label="行别"
          :formatter="
            (_, __, cellValue) => {
              return XING_BIE?.find((item) => item.value === cellValue).name
            }
          "
        />
        <el-table-column prop="startLiCheng" label="开始里程" />
        <el-table-column prop="endLiCheng" label="结束里程" />
        <el-table-column prop="oneLevelCount" label="一级数量" sortable />
        <el-table-column prop="twoLevelCount" label="二级数量" sortable />
        <el-table-column prop="threeLevelCount" label="三级数量" sortable />
        <el-table-column prop="fourLevelCount" label="四级数量" sortable />
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Disease'
})
import { computed, onMounted, reactive, ref, toRaw } from 'vue'
import { doPostDenseList, doPostDenseSectionStatistics } from '@renderer/api/dense'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import { XING_BIE } from '@renderer/constant/train'
import { useDebounceFn } from '@vueuse/core'
const formInline = reactive({
  daterange: null,
  sectionLength: 2,
  dengji: [4],
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
  if (formInline.sectionLength && formInline.dengji.length > 0) {
    getTableData()
  } else {
    ElMessage.error('请填写查询条件！')
    return
  }
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
    const res = await doPostDenseList(formData)

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
const exportLoading = ref(false)
const exportTableData = useDebounceFn(async () => {
  try {
    exportLoading.value = true
    const formData = { ...toRaw(formInline) }
    formData.startDate = formInline.daterange[0]
    formData.endDate = formInline.daterange[1]
    delete formData.daterange
    const res = await doPostDenseSectionStatistics(formData)

    handleFileDownload(res)
  } catch (error) {
    console.log('error: ', error)
  } finally {
    exportLoading.value = false
  }
}, 500)
const handleFileDownload = (blobData) => {
  // 创建一个Blob对象，表示二进制数据
  const blob = new Blob([blobData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })

  // 创建一个a标签，用于下载
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = `【密集区段】${formInline.daterange[0]}~${formInline.daterange[1]}.xls` // 指定文件名和扩展名

  // 将a标签添加到DOM中，并模拟点击下载
  document.body.appendChild(link)
  link.click()

  // 移除a标签
  document.body.removeChild(link)
}
</script>

<style scoped lang="scss">
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

.container {
  height: 100%;
  width: 100%;
  .top {
    background-color: var(--el-bg-color);
    height: 60px;
    margin-bottom: 15px;
  }
  .bottom {
    height: calc(100% - 75px);
  }
}
</style>
