<template>
  <div>
    <draggable v-model="mealPlanData.data" item-key="id" handle=".handle-meal">
      <template #item="{ index }">
        <div class="mb-8">
          <div class="flex justify-between items-center">
            <p
              class="py-1.5 px-4 bg-[var(--ep-color-card)] rounded-md w-fit mt-6 font-bold whitespace-nowrap"
            >
              {{ $t('meal') + ' ' + (index + 1) }}
            </p>

            <!-- Actions -->
            <div class="flex gap-3 cursor-pointer">
              <div
                class="i-akar-icons:drag-horizontal-fill handle-meal w-5 h-5 cursor-move icon"
              ></div>
            </div>
          </div>
          <MacrosInfo :mealData="mealPlanData.data[index]" :macrosRatio="macrosRatio" />

          <draggable
            v-model="mealPlanData.data[index].items"
            handle=".handle-food"
            group="people"
            class="mt-2"
            item-key="id"
          >
            <template #item="{ element }">
              <div class="flex gap-2 items-center mb-1 py-1">
                <div class="i-ic:outline-drag-indicator cursor-move handle-food icon"></div>
                <div> {{ element.icon }} {{ $t(element.value) }} </div>
                <small class="color-gray"> ~ {{ element.weight }}</small>
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

import MacrosInfo from './MacrosInfo.vue'

import type { MacrosDetailTypes } from '../types'
import type { MacrosTypes } from '../../MealPlanGenerator/types/index'
import { toRefs } from 'vue'

interface PropsTypes {
  macrosDetails: MacrosDetailTypes
  macrosRatio: MacrosTypes
  mealPlanData: any
}
const props = defineProps<PropsTypes>()
console.log('🚀 ~ props:', props)

const { mealPlanData } = toRefs(props)
</script>

<style scoped>
.icon {
  color: var(--ep-text-color-regular);
}

.icon:hover {
  color: var(--ep-text-color-primary);
}
</style>
