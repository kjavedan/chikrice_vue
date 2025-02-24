<template>
  <div class="mt-20 flex items-center justify-center w-full">
    <ElRadioGroup v-model="step" size="small" class="steps-navigator">
      <ElRadioButton
        v-for="step in steps"
        :key="step.value"
        :label="step.label"
        :value="step.value"
        @click="goTo(step.value)"
      />
    </ElRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import { PropsTypes } from './types/index'

const props = defineProps<PropsTypes>()

const { step } = toRefs(props)
</script>

<style scoped lang="scss">
.steps-navigator {
  width: 100%;
}

.ep-radio-group {
  display: inline-block !important;
  width: fit-content;
}
</style>
