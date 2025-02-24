<template>
  <div>
    <HeaderLink
      :question="stepData.question"
      :link="stepData.questionLink"
      :content="stepData.questionContent"
    />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div
        v-for="goal in optionsData.goals"
        :key="goal.value"
        @click="handleClick(goal.value)"
        :class="[
          'bg-[var(--ep-color-card)]  rounded-md h-30 cursor-pointer md:h-50 lg:aspect-video lg:h-auto flex flex-col items-center justify-center gap-4',
          {
            'b-solid border-[var(--ep-color-primary)] shadow-md shadow-[var(--ep-color-primary)]':
              userInputsData.goal === goal.value
          }
        ]"
      >
        <span class="text-3xl">{{ goal.icon }}</span>
        <span>{{ $t(goal.value) }}</span>
      </div>
    </div>

    <FooterLink :link="stepData.footerLink" :content="stepData.footerContent" />
  </div>
</template>

<script setup lang="ts">
import { PropsTypes } from '../types'
import HeaderLink from './HeaderLink.vue'
import FooterLink from './FooterLink.vue'
const props = defineProps<PropsTypes>()

const handleClick = (goal) => {
  props.onUpdate('goal', goal)
  props.onNext()
}
</script>

<style></style>
