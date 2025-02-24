<template>
  <div class="md:grid grid-cols-3 gap-5 md:mt-10">
    <!-- MEAL -->
    <div
      v-for="section in sectionsData"
      class="mb-8 md:mb-0"
      :key="section.name"
      @click="$router.push({ name: section.name })"
    >
      <div
        class="w-full cursor-pointer aspect-video bg-[var(--ep-color-card)] rounded-md mt-4 flex flex-col gap-5 text-center items-center justify-center"
      >
        <div class="text-5xl">
          {{ section.img }}
        </div>
        <p class="text-[var(--ep-text-color-regular)]">{{ $t(section.label) }}</p>
      </div>
      <ElButton class="my-3 w-full" type="primary" size="large" plain>{{
        $t(section.action)
      }}</ElButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const sectionsData = ref([
  { label: 'mealPlanGenerator', action: 'generate', name: 'mealPlanGenerator', img: '🍇🥚🍚' },
  {
    label: 'workoutPlanGenerator',
    action: 'generate',
    name: 'workoutPlanGenerator',
    img: '🏋️💪🏃‍♂️'
  },
  { label: 'bmrCalculator', name: 'bmrCalculator', action: 'calculate', img: '📱✖️📄' }
])
</script>

<style lang="scss" scoped></style>
