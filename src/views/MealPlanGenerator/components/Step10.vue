<template>
  <div>
    <HeaderLink
      :question="stepData.question"
      :link="stepData.questionLink"
      :content="stepData.questionContent"
    />
    <ElRadioGroup v-model="userInputsData.isIncludeSweet">
      <ElRadio label="no">
        <span>{{ $t('no') }}</span>
      </ElRadio>
      <ElRadio label="yes">
        <span>{{ $t('yes') }}</span>
      </ElRadio>
    </ElRadioGroup>

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
