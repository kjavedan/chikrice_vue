<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStoreWithOut } from '@/store/modules/app'

const { initTheme } = useAppStoreWithOut()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <el-config-provider namespace="ep">
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
  </el-config-provider>
</template>

<style scoped></style>
