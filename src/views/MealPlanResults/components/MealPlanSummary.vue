<template>
  <div class="max-w-120">
    <div class="grid grid-cols-2 gap-4 md:gap-16 p-4 md:p-8 bg-[var(--ep-color-card)] rounded-lg">
      <!-- COL 1 -->
      <div class="flex flex-col gap-4">
        <div>
          <h5>{{ $t('timeToCommit') }}</h5>
          <small class="mt-1">1 {{ $t('month') }}</small>
        </div>
        <div>
          <h5>{{ $t('goal') }}</h5>
          <small class="mt-1"> {{ $t(data?.goal) }}</small>
        </div>
        <div>
          <h5>{{ $t('numberOfDays') }}</h5>
          <small class="mt-1"> 3</small>
        </div>
      </div>
      <!-- COL 2 -->
      <div class="flex flex-col gap-4">
        <div>
          <h5>{{ $t('calories') }}</h5>
          <small class="mt-1">⚡{{ mealPlanSummary.calories }} main calories </small>
          <small class="block">
            {{ isIncludeSweet === 'yes' ? '🍫100 cheat allowence' : '' }}
          </small>
        </div>
        <div>
          <h5>{{ $t('macros') }}</h5>
          <ul>
            <li>
              <small class="text-[var(--ep-color-success)]">
                %{{ data?.macros.carbs }} <ArrowRight /> {{ mealPlanSummary.macros.carb.amount
                }}{{ $t('gram') }} {{ $t('carbs') }}</small
              >
            </li>
            <li>
              <small class="text-[var(--ep-color-error)]">
                %{{ data?.macros.proteins }} <ArrowRight /> {{ mealPlanSummary.macros.pro.amount
                }}{{ $t('gram') }} {{ $t('proteins') }}</small
              >
            </li>
            <li>
              <small class="text-[var(--ep-color-warning)]">
                %{{ data?.macros.fats }} <ArrowRight /> {{ mealPlanSummary.macros.fat.amount
                }}{{ $t('gram') }} {{ $t('fats') }}</small
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserInputsTypes } from '../../MealPlanGenerator/types'
import type { MealPlanSummaryTypes } from '../types/index'

interface PropsTypes {
  data: UserInputsTypes
  mealPlanSummary: MealPlanSummaryTypes
  isIncludeSweet: string
}
defineProps<PropsTypes>()
</script>

<style scoped></style>
