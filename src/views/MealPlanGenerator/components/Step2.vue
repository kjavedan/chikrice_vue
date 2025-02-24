<template>
  <div>
    <HeaderLink
      :question="stepData.question"
      :link="stepData.questionLink"
      :content="stepData.questionContent"
    />
    <ElRadioGroup v-model="userInputsData.goalAchievementSpeed">
      <ElRadio
        v-for="option in optionsData.goalAchievementSpeed"
        :label="option.value"
        :key="option.value"
      >
        <span>{{ option.icon }}</span>
        <span>{{ $t(option.value) }}</span>
      </ElRadio>
    </ElRadioGroup>
    <FooterLink :link="stepData.footerLink" :content="stepData.footerContent" />
  </div>
</template>

<script setup lang="ts">
import HeaderLink from './HeaderLink.vue'
import FooterLink from './FooterLink.vue'

import { PropsTypes } from '../types'

defineProps<PropsTypes>()
</script>

<style></style>
