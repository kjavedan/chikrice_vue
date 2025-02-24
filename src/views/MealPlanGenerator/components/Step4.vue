<template>
  <div>
    <HeaderLink
      :question="stepData.question"
      :link="stepData.questionLink"
      :content="stepData.questionContent"
    />
    <div class="mb-2">
      <h4>{{ $t('budget') }} 💵 ?</h4>
    </div>
    <ElRadioGroup v-model="userInputsData.budget" :class="{ 'flex gap-3': isRotate() }">
      <ElRadio label="low"> {{ $t('low') }} </ElRadio>
      <ElRadio label="enough"> {{ $t('enough') }} </ElRadio>
    </ElRadioGroup>

    <div class="mt-6 font-italic text-[var(--ep-text-color-regular)] text-sm">
      <p
        >The difference between lower budget and enough budget macros is the <b> proteins </b> and
        <b>carbs</b>
        percentages. <RouterLink to="#" class="underline">see why?</RouterLink></p
      >
      <p class="mt-4"
        >{{ $t('marcoRecommendation') }} <b>({{ $t(userInputsData.goal) }})</b> &
        {{ $t('yourCalories') }} <b>({{ userInputsData.calories }})</b> . {{ $t('yourBudget') }}
        <b> ({{ $t(userInputsData.budget) }}) </b>
      </p>

      <!-- Macros -->

      <div class="mt-8 flex gap-5 md:gap-15 items-center">
        <!-- Recommended Macros -->
        <div>
          <h6>Recommended</h6>
          <ul class="grid gap-1 text-sm mt-1">
            <li class="text-[var(--ep-color-success)]"
              >{{ macrosRecommendation.carbs }}% {{ $t('carbs') }}</li
            >
            <li class="text-[var(--ep-color-error)]">
              {{ macrosRecommendation.proteins }}% {{ $t('proteins') }}
            </li>
            <li class="text-[var(--ep-color-warning)]"
              >{{ macrosRecommendation.fats }}% {{ $t('fats') }}</li
            >
          </ul>
        </div>

        <ArrowRight v-if="userInputsData.isMacrosCustomized" />

        <div v-if="userInputsData.isMacrosCustomized">
          <!-- Customized Macros -->
          <h6>Customized</h6>
          <ul class="grid gap-1 text-sm mt-1">
            <li class="text-[var(--ep-color-success)]"
              >{{ userInputsData.macros.carbs }}% {{ $t('carbs') }}</li
            >
            <li class="text-[var(--ep-color-error)]">
              {{ userInputsData.macros.proteins }}% {{ $t('proteins') }}
            </li>
            <li class="text-[var(--ep-color-warning)]"
              >{{ userInputsData.macros.fats }}% {{ $t('fats') }}</li
            >
          </ul>
        </div>
      </div>
    </div>

    <div class="my-8">
      <ElButton type="info" plain @click="dialogVisible = true">{{ $t('customize') }}</ElButton>
    </div>

    <FooterLink :link="stepData.footerLink" :content="stepData.footerContent" />
  </div>

  <ElDialog
    v-model="dialogVisible"
    :title="$t('customizeMacros')"
    width="95%"
    style="max-width: 500px; margin-top: 30vh"
  >
    <ElForm
      ref="ruleFormRef"
      :model="macros"
      :rules="rules"
      labelPosition="top"
      @keydown.enter.prevent="submitForm(ruleFormRef)"
      class="grid grid-cols-3 gap-2"
    >
      <ElFormItem prop="carbs" :label="$t('carbs')">
        <ElInput v-model.number="macros.carbs" type="number">
          <template #suffix>%</template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="proteins" :label="$t('proteins')">
        <ElInput v-model.number="macros.proteins" type="number">
          <template #suffix>%</template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="fats" :label="$t('fats')">
        <ElInput v-model.number="macros.fats" type="number">
          <template #suffix>%</template>
        </ElInput>
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div :class="['dialog-footer flex justify-end', { 'gap-2': isRotate() }]">
        <ElButton @click="dialogVisible = false" class="mx-2"> {{ $t('close') }}</ElButton>
        <ElButton type="primary" @click="submitForm(ruleFormRef)"> {{ $t('confirm') }}</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import HeaderLink from './HeaderLink.vue'
import FooterLink from './FooterLink.vue'

import type { FormRules, FormInstance } from 'element-plus'

import {
  ElForm,
  ElRadio,
  ElInput,
  ElButton,
  ElDialog,
  ElMessage,
  ElFormItem,
  ElRadioGroup
} from 'element-plus'

import { isRotate } from '@/utils/is'
import { PropsTypes } from '../types'
import { MacrosTypes } from '../types/index'
import { useI18n } from 'vue-i18n'

const props = defineProps<PropsTypes>()

const { t } = useI18n()
const dialogVisible = ref(false)

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<MacrosTypes>>({
  fats: [
    { required: true, message: t('fatsRequired'), trigger: 'blur' },
    { type: 'number', min: 10, max: 50, message: t('fatsRange'), trigger: 'blur' }
  ],
  carbs: [
    { required: true, message: t('carbsRequired'), trigger: 'blur' },
    { type: 'number', min: 10, max: 50, message: t('carbsRange'), trigger: 'blur' }
  ],
  proteins: [
    { required: true, message: t('proteinsRequired'), trigger: 'blur' },
    { type: 'number', min: 10, max: 50, message: t('proteinsRange'), trigger: 'blur' }
  ]
})

const macros = ref<MacrosTypes>({
  fats: 20,
  carbs: 40,
  proteins: 40
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    const { fats, carbs, proteins } = macros.value
    const is100Percent = fats + carbs + proteins === 100 ? true : false
    if (valid && is100Percent) {
      props.onUpdate('macros', { fats, carbs, proteins })
      props.onUpdate('isMacrosCustomized', true)
      dialogVisible.value = false
    } else if (!is100Percent) {
      ElMessage.error(t('totalPercentageError'))
    } else {
      ElMessage.error(t('resolveErrors'))
    }
  })
}
</script>

<style></style>
