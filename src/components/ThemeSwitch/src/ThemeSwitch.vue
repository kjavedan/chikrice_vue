<template>
  <div>
    <ElButton @click="switchTheme" type="info" text
      ><div
        class="i-line-md:moon-to-sunny-outline-transition dark:i-line-md:sunny-filled-loop-to-moon-filled-loop-transition h-8"
      ></div
    ></ElButton>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useAppStoreWithOut } from '@/store/modules/app'

const { switchTheme } = useAppStoreWithOut()
</script>

<style scoped></style>
