<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue' // 引入 Vue 的生命周期钩子和 ref 函数
import { echarts as ECharts, type ECOption } from './echart' // 引入 ECharts
import { dark } from './theme.js'
// import 'echarts-liquidfill' // 引入 ECharts 的液态填充图插件
defineOptions({
  name: 'ECharts'
})
interface Props {
  option: ECOption // 定义属性接口，包含用于图表配置的 option 对象
}
const props = defineProps<Props>() // 定义接收的 props
const emit = defineEmits(['chart-click']) // 定义一个事件发射器，用于发射 chart-click 事件

const chartRef = ref<HTMLElement>() // 创建一个 ref 用于获取图表容器的 DOM 元素
let myChart // 声明 myChart 变量来存储 ECharts 实例

onMounted(async () => {
  initChart() // 在组件挂载时初始化图表
})
// 使用watch监听options的变化，并更新图表
watch(props.option, (newOptions) => {
  myChart.setOption(newOptions)
})
onUnmounted(() => {
  myChart?.dispose() // 组件卸载时销毁图表实例
  window.removeEventListener('resize', resizeChart) // 移除窗口 resize 事件监听器
})

const initChart = async () => {
  //确保在dom挂在后渲染
  await nextTick()
  if (!chartRef.value) return // 如果没有获取到 DOM 元素则返回
  // ECharts.registerTheme('defaultTheme', defaultTheme)
  ECharts.registerTheme('dark', dark)

  myChart = ECharts.init(chartRef.value, dark) // 使用 ECharts.init 初始化图表实例
  myChart.on('click', handleChartClick, { passive: true }) // 绑定图表的点击事件
  window.addEventListener('resize', resizeChart, false) // 添加窗口 resize 事件监听器，用于调整图表大小
  myChart.setOption(props.option) // 设置图表的配置项
}
const resizeChart = () => {
  myChart?.resize() // 调整图表大小以适应容器大小
}
const handleChartClick = (event: MouseEvent) => {
  emit('chart-click', event) // 当图表被点击时发射 chart-click 事件
}
</script>

<style scoped lang="scss">
.chart-container {
  height: 100%;
  width: 100%;
  padding: 3px 5px;
}
</style>
