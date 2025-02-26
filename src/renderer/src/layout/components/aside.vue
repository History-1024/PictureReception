<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Menu from './menu.vue'
import logo from '@renderer/assets/logo.png'
import { useRouter, Router, RouteRecordRaw } from 'vue-router'
import { Expand, Fold } from '@element-plus/icons-vue'
defineOptions({
  name: 'AsideComponents'
})
onMounted(() => {
  getRouters()
})
const router: Router = useRouter()
//Router列表
const RouterList = ref([] as RouteRecordRaw[])

//获取菜单
const getRouters = () => {
  const currentRouterList = router.getRoutes().filter((router) => {
    return router.name === localStorage.getItem('routerType')
  })
  RouterList.value = currentRouterList[0]?.children || []
}
const Collapse = ref(false)
const handleIcon = () => {
  Collapse.value = !Collapse.value
}
</script>

<template>
  <el-aside width="auto">
    <div class="logo">
      <img :src="logo" alt="" />
      <div v-show="!Collapse" class="logo_title">北京三岭科技</div>
    </div>
    <Menu :is-collapse="Collapse" class="menu" :menu-tree="RouterList"></Menu>
    <div class="option">
      <el-icon :size="36">
        <component :is="Collapse ? Expand : Fold" @click="handleIcon"></component>
      </el-icon>
    </div>
  </el-aside>
</template>

<style lang="scss" scoped>
.logo {
  width: auto;
  height: 48px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  img {
    display: inline-block;
    height: 32px;
  }
  .logo_title {
    font-weight: 600;
    font-size: 20px;
    line-height: 50px;
  }
}
.menu {
  height: calc(100% - 101px);
}
.option {
  height: 45px;
  border-top: 1px var(--el-border-color) var(--el-border-style);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
