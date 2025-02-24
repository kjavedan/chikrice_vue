<template>
  <div :class="['i-flowbite:arrow-right-outline', { 'rotate-180': isRotate() }]"></div>
</template>

<script setup lang="ts">
import { isRotate } from '@/utils/is'
</script>

<style scoped></style>
