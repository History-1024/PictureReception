<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import {
  // doPostGetImageList,
  doPostGetImageById,
  type children_Type,
  doPostSubmitDispose
} from '@renderer/api/imageList'
import { ElMessage, ElMessageBox, ElProgress } from 'element-plus'
import dayjs from 'dayjs'
import { GetImageCountByDateResult_Type } from './type'

defineOptions({
  name: 'ImageList'
})
const imageList = ref([])
const loading = ref(false)
const handleFlush = useDebounceFn(async (status = 2) => {
  try {
    loading.value = true
    const data = {
      url: '/getImageCountByDate',
      method: 'post',
      data: { status }
    }
    const res = await window.ElectronApi.sendAxios<GetImageCountByDateResult_Type>(data)

    // const res = await doPostGetImageList({ status })

    if (res.code === 200) {
      imageList.value = res.data.list
      ElMessage.success('列表已刷新')
      timeNumber.value = 59
      form.value.status = status
      if (res.data.list.length > 0) {
        handleImageDesc(res.data.newData[0], 2)
        nextTick(() => {
          treeRef.value.setCurrentKey(res.data.newData[0].id)
        })
      }
    } else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    ElMessage.error('获取列表数据失败')
    console.log('error: ', error)
  } finally {
    loading.value = false
  }
}, 500)
const defaultProps = {
  children: 'children',
  label: 'lineName'
}
const imageDesc = reactive<children_Type>({
  date: undefined,
  id: 0,
  lineNum: '',
  lineName: '',
  liCheng: 0,
  xingBie: '',
  deviceType: '',
  deviceName: '',
  deviceliCheng: 0,
  faultType: '',
  trainSpeed: 0,
  trainModel: '',
  trainNumber: '',
  cheCi: '',
  tcyNumber: '',
  remark: '',
  imageUrl: '',
  person: '',
  status: 0
})
const imageBlob = ref()
const imageLoading = ref(false)
const getImage = async (id: number) => {
  imageLoading.value = true
  try {
    const res = await doPostGetImageById({ id })
    imageBlob.value = URL.createObjectURL(res as Blob)
  } catch (error) {
    console.log('error: ', error)
  } finally {
    imageLoading.value = false
  }
}
const handleImageDesc = (data: children_Type, node) => {
  if (node.level === 1) {
    // expanded.value = [data.id]
    return
  }
  getImage(data.id)
  imageDesc.date = data.date
  imageDesc.id = data.id
  imageDesc.lineNum = data.lineNum
  imageDesc.lineName = data.lineName
  imageDesc.liCheng = data.liCheng ? data.liCheng : 0
  imageDesc.xingBie = data.xingBie
  imageDesc.deviceType = data.deviceType
  imageDesc.deviceName = data.deviceName
  imageDesc.deviceliCheng = data.deviceliCheng ? data.deviceliCheng : 0
  imageDesc.faultType = data.faultType
  imageDesc.trainSpeed = data.trainSpeed
  imageDesc.trainModel = data.trainModel
  imageDesc.trainNumber = data.trainNumber
  imageDesc.cheCi = data.cheCi
  imageDesc.tcyNumber = data.tcyNumber
  imageDesc.remark = data.remark
  imageDesc.imageUrl = data.imageUrl
  imageDesc.status = data.status
  imageDesc.person = data.person
}
const timer = ref()
const timeNumber = ref(60)

const timeDask = () => {
  timer.value = setInterval(() => {
    timestamp.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    if (timeNumber.value === 0) {
      timeNumber.value = 60
      handleFlush()
    }
    timeNumber.value--
  }, 1000)
}
const submitting = ref(false)
const handleSubmit = useDebounceFn(async () => {
  submitting.value = true
  try {
    if (!imageDesc.id) {
      ElMessage.warning('请选择一条数据')
      return
    } else {
      const data = {
        id: imageDesc.id,
        person: imageDesc.person || '',
        status: imageDesc.status,
        remark: imageDesc.remark || '',
        faultType: imageDesc.faultType || '',
        xingBie: imageDesc.xingBie || '',
        deviceliCheng: imageDesc.deviceliCheng || 0
      }
      const res = await doPostSubmitDispose(data)
      if (res.code === 200) {
        ElMessage.success(res.message)
        handleFlush()
      } else {
        ElMessage.error(res.message)
      }
    }
  } catch (error) {
    ElMessage.error(error)
    console.log('error: ', error)
  } finally {
    submitting.value = false
  }
})
const expanded = ref([])
const open = () => {
  ElMessageBox.alert('<span style="font-size:16px;font-weight:bold">确认提交吗？<span/>', {
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    customClass: 'alertClass'
  })
    .then(() => {
      handleSubmit()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消操作'
      })
    })
}
const treeRef = ref()
// const formatLiCheng = (value) => {
//   if (value) {
//     const num = value.toFixed(3)
//     const res = num.split('.')
//     return 'K' + res[0] + '+' + res[1]
//   } else {
//     return 'K0+0'
//   }
// }
const timestamp = ref()
const form = ref({
  status: 2
})
const handleStatusChange = (e) => {
  handleFlush(e)
}
const disposeStatistics = (data) => {
  if (data.children.length > 0) {
    const res = data.children.filter((item) => !item.status)
    return res.length
  } else {
    return 0
  }
}
// const updateVisionApp = () => {
//   // 监听更新事件
//   window.ElectronApi.updateDownloaded(() => {
//     ElMessage.success('触发该方法updateDownloaded')
//   })
//   window.ElectronApi.downloadProgress((data) => {
//     ElMessage.success('触发该方法updateDownloaded', data)
//   })
// }
const progress = ref(0)
const dialog = ref(false)
const dialogCtrl = ref(true)
const processDialog = computed(() => {
  return dialog.value && dialogCtrl.value
})
const handleDisplayDialog = () => {
  dialogCtrl.value = false
}

onMounted(() => {
  timeDask()
  handleFlush()

  window.ElectronApi.downloadProgress((data) => {
    if (!dialog.value) dialog.value = true
    progress.value = Number(data.percent.toFixed(2))
    // if (data.progress >= 100) {
    //   dialog.value = false
    //   ElMessageBox.alert('更新下载完成，是否重启安装？', '提示', {
    //     type: 'success',
    //     confirmButtonText: '确认',
    //     callback: () => {
    //       window.ElectronApi.restartApp()
    //     }
    //   })
    // }
  })
})
onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div class="image-list-container">
    <div class="left">
      <div class="left-header">
        <el-button style="font-size: 12px; height: 40px" type="primary" @click="handleFlush()"
          >刷新</el-button
        >
        <div style="font-size: 16px; height: 40px; line-height: 40px">{{ timestamp }}</div>
        <div class="timer" style="font-size: 18px; height: 40px; line-height: 40px">
          {{ timeNumber }}
        </div>
      </div>
      <el-tree
        ref="treeRef"
        v-loading="loading"
        style="width: 100%; height: calc(100% - 135px); overflow: auto"
        :data="imageList"
        :props="defaultProps"
        node-key="id"
        accordion
        :highlight-current="true"
        :default-expanded-keys="expanded"
        @node-click="handleImageDesc"
      >
        <template #default="{ node, data }">
          <div style="font-size: 12px; font-weight: bold; width: 100%">
            <div v-if="node.level === 1">
              {{ node.label }}
              <span style="font-size: 12px; font-weight: 300; color: #2b2b2b"
                >{{ disposeStatistics(data) }}/{{ data.children.length }}</span
              >
            </div>

            <div
              v-if="node.level !== 1"
              style="
                width: 100%;
                font-size: 10px;
                line-height: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              "
            >
              <div>
                {{ dayjs(data.date).format('YYYY-MM-DD HH:mm:ss') }}
                <div>{{ data.lineName }}_{{ data.xingBie }}_{{ data.liCheng }}</div>
              </div>
              <div>
                <el-tag
                  style="font-size: 12px"
                  size="small"
                  :type="data.status ? 'success' : 'warning'"
                  >{{ data.status ? '已处置' : '未处置' }}</el-tag
                >
              </div>
            </div>
          </div>
        </template>
      </el-tree>
      <div class="form" style="height: 30px; width: 100%; font-size: 14px">
        <div>处置状态:</div>
        <el-radio-group v-model="form.status" size="small" @change="handleStatusChange">
          <el-radio :value="2">全部</el-radio>
          <el-radio :value="0">未处置</el-radio>
          <el-radio :value="1">已处置</el-radio>
        </el-radio-group>
      </div>
      <div class="icon-info" style="font-size: 14px; height: 65px">
        <div class="prodName">电务设备登乘检查图像接收处理系统</div>
        <div class="name">北京三岭基业科技发展有限公司</div>
        <div class="phone">010-63771258</div>
      </div>
    </div>
    <div class="right">
      <div class="right-top" :v-loading="imageLoading">
        <el-image
          v-if="imageBlob"
          style="width: 100%; height: 100%"
          :src="imageBlob"
          :preview-src-list="[imageBlob]"
          fit="contain"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          show-progress
          :image-size="200"
        ></el-image>
        <el-empty v-else description="暂无图片" />
      </div>
      <div class="right-bottom">
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>故障类型</div></div>
          <div class="desc-value" style="font-size: 12px; padding: 0">
            <el-input
              v-model="imageDesc.faultType"
              style="width: 100%; height: 100%; font-size: 12px"
              placeholder="请输入故障类型"
            />
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>检查日期</div></div>
          <div class="desc-value" style="font-size: 12px">
            {{ imageDesc.date ? dayjs(imageDesc.date).format('YYYY-MM-DD') : '空' }}
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>检查时间</div></div>
          <div class="desc-value" style="font-size: 12px">
            {{ imageDesc.date ? dayjs(imageDesc.date).format('HH:mm:ss') : '空' }}
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>线路名称</div></div>
          <div class="desc-value" style="font-size: 12px">
            <div>{{ imageDesc.lineName || '空' }}</div>
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>线路行别</div></div>
          <div class="desc-value" style="font-size: 12px; padding: 0">
            <el-input
              v-model="imageDesc.xingBie"
              style="width: 100%; height: 100%; font-size: 12px"
              placeholder="请输入线路行别"
            />
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>拍照里程</div></div>
          <div class="desc-value" style="font-size: 12px; padding: 0">
            <el-input
              v-model="imageDesc.liCheng"
              style="width: 100%; height: 100%; font-size: 12px"
              placeholder="请输入设备里程"
            />
            <!-- {{ formatLiCheng(imageDesc.deviceliCheng) || '空' }} -->
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>设备类型</div></div>
          <div class="desc-value" style="font-size: 12px">
            <div>{{ imageDesc.deviceType || '空' }}</div>
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>设备名称</div></div>
          <div class="desc-value" style="font-size: 12px">
            <div>{{ imageDesc.deviceName || '空' }}</div>
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>中心里程</div></div>
          <div class="desc-value" style="font-size: 12px">
            <div>{{ imageDesc.deviceliCheng ? imageDesc.deviceliCheng.toFixed(3) : 0 }}</div>
          </div>
        </div>
        <div class="desc" style="width: 100%">
          <div class="desc-title" style="font-size: 12px"><div>现场情况</div></div>
          <div class="desc-value" style="font-size: 12px; padding: 0">
            <el-input
              v-model="imageDesc.remark"
              input-style="width: 100%; height: 100%;font-size: 12px;"
              style="width: 100%; height: 100%"
              type="textarea"
              placeholder="请输入现场情况"
            />
            <!-- <span v-if="imageDesc.remark.length <= 50">{{ imageDesc.remark || '空' }}</span>
            <span v-else>{{ imageDesc.remark.substring(0, 50) || '空' }}...</span> -->
          </div>
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>处置状态</div></div>
          <div class="desc-value" style="font-size: 12px">
            <el-switch
              v-model="imageDesc.status"
              :disabled="!imageDesc"
              size="small"
              class="mb-2"
              active-text="已处置"
              :active-value="1"
              inactive-text="未处置"
              :inactive-value="0"
              style="
                align-self: center;
                --el-switch-on-color: #67c23a;
                --el-switch-off-color: #e6a23c;
              "
            />
          </div>
          <!-- <div class="desc-value" style="font-size: 12px">
            <span v-if="imageDesc.remark.length <= 50">{{ imageDesc.remark || '空' }}</span>
            <span v-else>{{ imageDesc.remark.substring(0, 50) || '空' }}...</span>
          </div> -->
        </div>
        <div class="desc">
          <div class="desc-title" style="font-size: 12px"><div>填报人</div></div>
          <div class="desc-value" style="font-size: 12px; padding: 0">
            <el-input
              v-model="imageDesc.person"
              style="width: 100%; height: 100%; font-size: 12px"
              placeholder="请输入填报人"
            />
          </div>
        </div>

        <div class="desc btn-3d" style="font-size: 20px" @click="open">
          <div class="sub-btn">点击提交</div>
        </div>
      </div>
    </div>
    <el-dialog v-model="processDialog" :show-close="false" title="" width="500">
      <template #title>
        <div style="font-size: 18px">应用更新中</div>
      </template>
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="progress"
        :striped-flow="true"
        :striped="true"
      />
      <el-button type="primary" size="small" style="margin-top: 10px" @click="handleDisplayDialog"
        >隐藏</el-button
      >
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.image-list-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  ::v-deep(.el-input__inner) {
    text-align: center;
  }
  .left {
    width: 33%;
    height: 100%;
    background-color: #f0f0f0;
    border: 1px solid #000;
    padding: 3px 5px;
    .left-header {
      display: flex;
      justify-content: space-between;

      .timer {
        color: #fff;
        text-align: center;
        height: 100%;
        width: 60px;
        padding: 3px 8px;
        font-size: 18px;
        background-color: rgb(184, 129.6, 48);
      }
    }
    .form {
      padding: 3px;
      border-top: 1px solid #d3d2d2;
      display: flex;
      align-items: center;
      background-color: #ffffff;
    }
    .icon-info {
      color: #3c82eb;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .right {
    width: 72%;
    height: 100%;
    background-color: #f0f0f0;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right-top {
      width: 100%;
      height: 59%;
      background-color: #ffffff;
    }
    .right-bottom {
      width: 100%;
      height: 40%;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .desc {
        width: 33.33%;
        display: flex;
        border-bottom: 1px solid #d3d2d2;
        .desc-title {
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          width: 130px;
          height: 100%;
          color: #fff;
          background: #347edf;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .desc-value {
          padding: 3px 5px;
          font-size: 18px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sub-btn {
          margin: 0 auto;
          align-self: center;
          color: #fff;
          cursor: pointer;
        }
      }
      .btn-3d {
        /* 基础样式 */
        padding: 3px 6x;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        color: white;
        position: relative;
        transition: all 0.2s ease;

        /* 主背景色 */
        background-color: #67c23a;

        /* 立体阴影系统 */
        box-shadow:
          0 4px 0 rgb(82.4, 155.2, 46.4),
          /* 底部阴影 */ 0 5px 8px rgba(0, 0, 0, 0.15); /* 环境阴影 */

        /* 渐变高光 */
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.05) 0%,
          rgba(255, 255, 255, 0.1) 90%,
          rgba(255, 255, 255, 0.2) 91%,
          transparent 100%
        );
      }

      /* 悬停状态增强立体感 */
      .btn-3d:hover {
        transform: translateY(-5px);
        box-shadow:
          0 5px 0 rgb(82.4, 155.2, 46.4),
          0 7px 12px rgba(0, 0, 0, 0.2);
      }

      /* 点击状态 */
      .btn-3d:active {
        transform: translateY(3px);
        box-shadow:
          0 1px 0 rgb(82.4, 155.2, 46.4),
          0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }
  }
  .customClass {
    font-size: 24px;
  }
}
</style>
<style>
.image-list-container .el-message-box__btns > .el-button--primary {
  font-size: 12px;
}
.image-list-container
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #80b2e0;
}
.image-list-container .el-radio {
  margin: 3px;
}
</style>
