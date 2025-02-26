<template>
  <el-container class="container">
    <Aside class="aside"></Aside>
    <el-container class="el-container">
      <el-main class="el-main">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Aside from './components/aside.vue'
import { RouterView } from 'vue-router'

defineOptions({
  name: 'Layout'
})
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  .el-container {
    background-color: #f0f2f5;
  }
}
</style>
