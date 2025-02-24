<template>
  <div>
    <HeaderLink
      :question="stepData.question"
      :link="stepData.questionLink"
      :content="stepData.questionContent"
    />
    <ElCheckboxGroup v-model="userInputsData.proteins" class="grid gap-4 justify-start">
      <ElCheckbox v-for="option in optionsData.proteins" :label="option.value" :key="option.value">
        <span>{{ option.icon }}</span>
        <span>{{ $t(option.value) }}</span>
      </ElCheckbox>
    </ElCheckboxGroup>
    <StepError :error="stepError" />
    <FooterLink :link="stepData.footerLink" :content="stepData.footerContent" />
  </div>
</template>

<script setup lang="ts">
import HeaderLink from './HeaderLink.vue'
import FooterLink from './FooterLink.vue'

import { ElCheckboxGroup, ElCheckbox } from 'element-plus'

import { PropsTypes } from '../types'

defineProps<PropsTypes>()
</script>

<style></style>
