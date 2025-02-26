<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
defineOptions({
  name: 'Test2'
})
const routeParams = ref()
onMounted(() => {
  const route = useRoute()
  routeParams.value = route.params
})
</script>
<template>
  <div class="container">{{ routeParams }}</div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
}
</style>
