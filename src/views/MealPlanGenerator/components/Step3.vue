<template>
  <div>
    <HeaderLink
      :question="stepData.question"
      :link="stepData.questionLink"
      :content="stepData.questionContent"
    />
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-2">
        <ElButton type="primary" @click="dialogVisible = true" class="w-50">{{
          $t('calculate')
        }}</ElButton>
      </div>
      <div class="whitespace-nowrap w-full text-xs">
        <span>
          {{ $t('orEnterManually') }}
        </span>
        <div class="i-majesticons:arrow-down-line"></div>
      </div>
      <div class="relative flex items-center gap-4 w-50">
        <ElInput
          v-model="userInputsData.calories"
          size="large"
          type="number"
          :placeholder="$t('enterYourCalories')"
          @blur="validateCalories"
        />
      </div>
    </div>
    <StepError :error="stepError" />
    <Br />
    <FooterLink :link="stepData.footerLink" :content="stepData.footerContent" />
  </div>

  <ElDialog
    v-model="dialogVisible"
    :title="$t('bmrCalculator')"
    width="95%"
    style="max-width: 500px"
  >
    <BmrCalculator :updateCalories="handleUpdate" />

    <template #footer>
      <div class="dialog-footer flex gap-2 justify-end">
        <ElButton type="primary" @click="handleUse" class="w-full"> {{ $t('use') }}</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderLink from './HeaderLink.vue'
import FooterLink from './FooterLink.vue'
import { ElInput, ElDialog, ElButton } from 'element-plus'
import { PropsTypes } from '../types'

const props = defineProps<PropsTypes>()

const calories = ref('2000')
const caloriesError = ref(false)
const dialogVisible = ref(false)

const handleUpdate = (value: string): void => {
  calories.value = value
}

const handleUse = (): void => {
  props.onUpdate('calories', calories)
  dialogVisible.value = false
}

const validateCalories = (): void => {
  const enteredCalories = props.userInputsData.calories
  if (enteredCalories < 1200) {
    caloriesError.value = true
  } else {
    caloriesError.value = false
  }
}
</script>

<style></style>
