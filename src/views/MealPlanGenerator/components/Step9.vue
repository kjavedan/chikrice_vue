<template>
  <div>
    <HeaderLink
      :question="stepData.question"
      :link="stepData.questionLink"
      :content="stepData.questionContent"
    />
    <div>
      <h5>{{ $t('mealsNumber') }}</h5>
      <ElRadioGroup v-model="userInputsData.mealsNumber">
        <ElRadio label="2" />
        <ElRadio label="3" />
        <ElRadio label="4" />
      </ElRadioGroup>
    </div>

    <div class="mt-8">
      <h5>{{ $t('snacksNumber') }}</h5>
      <ElRadioGroup v-model="userInputsData.snacksNumber">
        <ElRadio label="1" />
        <ElRadio label="2" />
      </ElRadioGroup>
    </div>

    <FooterLink :link="stepData.footerLink" :content="stepData.footerContent" />
  </div>
</template>

<script setup lang="ts">
import HeaderLink from './HeaderLink.vue'
import FooterLink from './FooterLink.vue'

import { ElRadioGroup, ElRadio } from 'element-plus'

import { PropsTypes } from '../types'

defineProps<PropsTypes>()
</script>

<style scoped></style>
