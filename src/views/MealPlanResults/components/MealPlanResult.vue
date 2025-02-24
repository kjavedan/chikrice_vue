<template>
  <div class="mt-8">
    <h5
      >{{ $t('youCanCustomizeMealPlan') }}
      <span>
        (
        <div class="i-ic:outline-drag-indicator"></div>,
        <div class="i-akar-icons:drag-horizontal-fill"></div>
        )
      </span>
      {{ $t('icons') }}
    </h5>

    <!-- Day 1 -->
    <div class="mt-2" v-for="(value, key) in mealPlanData" :key="key">
      <div class="b-b-solid b-[#E0E0E0] dark:b-[#5B5656]">
        <div class="font-extrabold text-2xl">{{ $t('day') }} {{ key }}</div>
      </div>
      <Draggable :macrosDetails="macrosDetails" :macrosRatio="macrosRatio" :mealPlanData="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Draggable from './Draggable.vue'

import type { MacrosDetailTypes } from '../types'
import type { MacrosTypes } from '../../MealPlanGenerator/types/index'

interface PropsTypes {
  macrosDetails: MacrosDetailTypes
  macrosRatio: MacrosTypes
  mealPlanData: any
}
const props = defineProps<PropsTypes>()
console.log(props)
</script>

<style scoped></style>
