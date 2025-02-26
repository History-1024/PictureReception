<template>
  <el-scrollbar>
    <el-menu :router="true" class="outer-most" :collapse="isCollapse" :collapse-transition="false">
      <template v-for="routeItem in menuTree" :key="routeItem.path">
        <el-sub-menu v-if="routeItem.children?.length > 0" :index="routeItem.path">
          <template #title>
            <el-icon v-if="routeItem.meta.icon">
              <component :is="routeItem.meta.icon"></component>
            </el-icon>
            <span>{{ routeItem.meta?.title }}</span>
          </template>
          <Menu :menu-tree="routeItem.children"></Menu>
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="routeItem.path"
          :class="currentRouterPath === routeItem.path ? 'selectedMenu' : ''"
          class="outer-most"
          ><el-icon v-if="routeItem.meta.icon">
            <component :is="routeItem.meta.icon"></component>
          </el-icon>
          <span>{{ routeItem.meta?.title }}</span></el-menu-item
        >
      </template>
    </el-menu>
  </el-scrollbar>
</template>
<script setup>
import { useRoute } from 'vue-router'
import Menu from './menu.vue'
import { computed } from 'vue'
defineProps({
  menuTree: {
    type: Array,
    required: true,
    default: () => []
  },
  isCollapse: Boolean
})
defineOptions({
  name: 'MenuItem'
})

const currentRoute = useRoute()
//获取当前route.path
const currentRouterPath = computed(() => {
  return currentRoute.path
})
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.selectedMenu {
  background-color: #1677ff90;
  border-radius: 3px;
  color: var(--el-text-color-primary);
}
</style>
