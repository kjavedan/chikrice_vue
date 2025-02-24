<template>
  <div class="mb-2 mt-3">
    <!-- Macros -->
    <div class="w-[90%] max-w-80 flex items-end gap-2">
      <HorizontalMacroBar name="carbs" :amount="macros.carb" :width="macrosRatio.carbs" />
      <HorizontalMacroBar name="proteins" :amount="macros.pro" :width="macrosRatio.proteins" />
      <HorizontalMacroBar name="fats" :amount="macros.fat" :width="macrosRatio.fats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import HorizontalMacroBar from './HorizontalMacroBar.vue'

import type { MacrosTypes } from '../../MealPlanGenerator/types/index'
import { toRefs } from 'vue'
import { computed } from 'vue'

interface PropsTypes {
  mealData: any
  macrosRatio: MacrosTypes
}
const props = defineProps<PropsTypes>()

const { mealData } = toRefs(props)

// I want to loop over meal items and sum up the macros of each item so we have the full meal macros as a sum of each item macr
// then when the user will chagne anything since we have a computed value the  macros will change dynamically
// but before that we need to do one thing and that is to calculate the macros correctly so we hit the macros targ3t precisely
const macros = computed(() => {
  const data = { pro: 0, carb: 0, fat: 0 }
  mealData.value.items.forEach((item) => {
    data.carb += item.calculatedItemMacros?.carb
    data.pro += item.calculatedItemMacros?.pro
    data.fat += item.calculatedItemMacros?.fat
  })
  return data
})
</script>

<style scoped></style>
