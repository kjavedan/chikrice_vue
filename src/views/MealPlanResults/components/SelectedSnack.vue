<template>
  <div>
    <div class="flex gap-3 b-0 b-b b-solid b-gray-3 dark:b-gray-7 pb-2">
      <!-- image -->
      <div class="h-18 aspect-square overflow-hidden rounded-md flex-center">
        <img :src="item.image" :alt="item.name" class="h-full rounded-md" />
      </div>
    </div>

    <!-- macros -->
    <div class="mt-2">
      <h4>Macros</h4>
      <div class="flex gap-4 font-bold my-2">
        <ElTag type="danger" style="border-radius: 0px;"> pro: {{ formattedMacros.pro }}g </ElTag>
        <ElTag type="success" style="border-radius: 0px;">
          carb: {{ formattedMacros.carb }}g
        </ElTag>
        <ElTag type="warning" style="border-radius: 0px;"> fat: {{ formattedMacros.fat }}g </ElTag>
      </div>
      <div>
        calories:
        <span class="text-[--ep-color-primary] font-bold">
          {{ formattedMacros.calories }} ⚡️
        </span></div
      >
    </div>

    <!-- ingridients -->
    <div class="mt-4 pb-2">
      {{ item.icon }} {{ item.value }} -> {{ item.portionDetails.servingInGram }}g ~
      {{ item.portionDetails.servingInQty }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PropsTypes {
  item: any
  calculatedMacros: any
}
const props = defineProps<PropsTypes>()

const formattedMacros = computed(() => {
  const { pro, carb, fat, calories } = props.calculatedMacros
  return {
    pro: pro?.toFixed(),
    carb: carb?.toFixed(),
    fat: fat?.toFixed(),
    calories: calories?.toFixed()
  }
})
</script>

<style scoped></style>
