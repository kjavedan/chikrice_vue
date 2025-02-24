<template>
  <!-- Progress bar -->
  <div class="progress-bar">
    <div class="progress-indicator" :style="{ width: (100 / 10.1) * step + '%' }"></div>
    <span class="step-label">{{ step * 10 }}%</span>
  </div>

  <!-- Header -->
  <MealPlanHeader
    title="mealPlanGenerator"
    link="whatMakesAGreatMealPlan"
    :isEdit="false"
    @open-dialog="FAQStore.handleFAQData"
  />

  <div class="mt-8">
    <h2>{{ $t('step') }} {{ step }}</h2>
  </div>

  <!-- Step -->
  <div v-for="item in stepsData" :key="item.step">
    <!-- Active step -->
    <component
      :is="stepComponents[item.step]"
      :macrosRecommendation="macrosRecommendation"
      :userInputsData="userInputsData"
      :onUpdate="onUpdateUserInputs"
      :onNext="onNext"
      :optionsData="optionsData"
      :stepError="stepError"
      :stepData="item"
      v-if="step === item.step"
    />
  </div>

  <!-- Footer -->
  <div class="mt-15 flex gap-3 justify-end w-full">
    <ElButton
      type="primary"
      plain
      :disabled="isDisabled || step === 1"
      @click="onBack"
      class="w-30"
      >{{ $t('back') }}</ElButton
    >
    <ElButton type="primary" @click="onNext" :disabled="isDisabled" class="w-30">{{
      $t('next')
    }}</ElButton>
  </div>

  <!-- FAST NAVIGATION -->
  <StepsNavigator :step="step" :steps="stepNavigationData" :goTo="handleGoToStep" />

  <!-- Tutorial Dialog -->
  <FAQDialog
    :isVisible="FAQStore.isVisible"
    :title="FAQStore.data.title"
    :content="FAQStore.data.content"
    @update:is-visible="FAQStore.handleVisibility"
  />
</template>

<script setup lang="ts">
import { ref, markRaw, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

import { stepsConfig, optionsConfig, budgetData } from './data'

import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'
import Step4 from './components/Step4.vue'
import Step5 from './components/Step5.vue'
import Step6 from './components/Step6.vue'
import Step7 from './components/Step7.vue'
import Step8 from './components/Step8.vue'
import Step9 from './components/Step9.vue'
import Step10 from './components/Step10.vue'

import type { UserInputsTypes, OptionsTypes, MacrosTypes, StepDataType } from './types'

import { useStorage } from '@/hooks/web/useStorage'
import { StepType } from '@/components/StepsNavigator/src/types/index'
import { useFAQDialogStoreWithout } from '@/store/modules/faq-dialog'

// USE HOOKS
const { getStorage, setStorage } = useStorage()

// NAVIGATION
const router = useRouter()

// STORE
const FAQStore = useFAQDialogStoreWithout()

// REFS
const step = ref(getStorage('meal-plan-step') || 1)

const stepNavigationData = ref<StepType[]>([
  { label: '🏋️', value: 1 },
  { label: '🐌', value: 2 },
  { label: '📱', value: 3 },
  { label: '💵', value: 4 },
  { label: '🥩', value: 5 },
  { label: '🍚', value: 6 },
  { label: '🍌', value: 7 },
  { label: '🥦', value: 8 },
  { label: '🔢', value: 9 },
  { label: '🍫', value: 10 }
])

const stepsData = ref<StepDataType[]>(stepsConfig)

const optionsData = ref<OptionsTypes>(optionsConfig)

const macrosRecommendation = ref<MacrosTypes>({
  fats: 20,
  carbs: 40,
  proteins: 40
})

const defaultInputsData = {
  snacksNumber: '1',
  mealsNumber: '3',
  calories: 2000,
  budget: 'enough',
  goalAchievementSpeed: 'moderate',
  isIncludeSweet: 'no',
  goal: 'loseWeight',
  fats: ['oliveOil', 'regularOil'],
  macros: {
    proteins: 40,
    carbs: 40,
    fats: 20
  },
  isMacrosCustomized: false,
  carbs: ['oats', 'rice', 'potato'],
  fruits: ['apple', 'orange'],
  proteins: ['flankSteak', 'fish', 'eggs', 'chicken'],
  vegetables: ['tomato', 'lettuce', 'broccoli', 'cucumber', 'billPepper']
}

const userInputsData = ref<UserInputsTypes>(getStorage('meal-plan-generator') || defaultInputsData)

const stepComponents = ref(
  markRaw({
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
    5: Step5,
    6: Step6,
    7: Step7,
    8: Step8,
    9: Step9,
    10: Step10
  })
)

const stepError = ref<String>('')

// COMPUTED
const isDisabled = computed(() => (stepError.value ? true : false))

// FUNCS
const onNext = () => {
  if (step.value < 10) {
    step.value++
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  } else if (step.value == 10) {
    router.push({ name: 'mealPlanResults' })
  }
}

const onBack = () => {
  if (step.value > 1) {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    step.value--
  }
}

const handleGoToStep = (index: number) => {
  if (index && index > 0 && index < 11) {
    step.value = +index
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  }
}

const onUpdateUserInputs = (key: string, value: any) => {
  userInputsData.value[key] = value
}

const updateMacrosRecommendation = () => {
  const { budget, goal } = userInputsData.value
  macrosRecommendation.value = budgetData[budget][goal]
}

// HOOKS
watch(step, (newVal) => setStorage('meal-plan-step', newVal))

watch(userInputsData.value, (newVal) => {
  setStorage('meal-plan-generator', newVal)
})

watch(
  () => [userInputsData.value.budget, userInputsData.value.goal],
  () => {
    updateMacrosRecommendation()
  }
)

watch(
  () => [
    userInputsData.value.carbs,
    userInputsData.value.fruits,
    userInputsData.value.calories,
    userInputsData.value.proteins,
    userInputsData.value.calories,
    userInputsData.value.vegetables
  ],
  () => {
    const { carbs, proteins, calories, fruits, vegetables } = userInputsData.value
    if (calories < 1200) {
      stepError.value = 'caloriesError'
    } else if (proteins.length < 2) {
      stepError.value = 'proteinsError'
    } else if (carbs.length < 2) {
      stepError.value = 'carbsError'
    } else if (fruits.length < 2) {
      stepError.value = 'fruitsError'
    } else if (vegetables.length < 2) {
      stepError.value = 'vegetablesError'
    } else {
      stepError.value = ''
    }
  }
)
</script>

<style lang="scss" scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 8px;
  align-items: center;
}

.progress-indicator {
  position: relative;
  height: 100%;
  background-color: var(--ep-color-primary);
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  transition: width 0.3s ease-in-out;
}

.step-label {
  margin-left: 4px;
  font-size: 10px;
}
</style>
