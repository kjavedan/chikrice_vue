<template>
  <div class="w-full h-75svh flex flex-col gap-10 items-center text-center justify-center">
    <h1>{{ $t('notAvailable') }} 😞</h1>
    <h2>{{ $t('tryMealPlanGenerator') }} 😃 💪</h2>
    <ElButton type="primary" size="large" @click="$router.push({ name: 'mealPlanGenerator' })"
      >Meal Plan Generator</ElButton
    >
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
</script>
