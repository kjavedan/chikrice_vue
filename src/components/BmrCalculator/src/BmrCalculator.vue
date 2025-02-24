<template>
  <div>
    <ElForm v-model="formData" label-position="top">
      <div class="grid items-center md:flex md:gap-2">
        <!-- Height -->
        <ElFormItem :label="$t('height')">
          <ElInput type="number" v-model="formData.height" style="direction: ltr">
            <template #append>
              <ElSelect style="width: 70px" v-model="formData.heightUnit">
                <ElOption value="cm" label="cm" />
                <ElOption value="feet" label="feet" />
              </ElSelect>
            </template>
          </ElInput>
        </ElFormItem>

        <!-- Weight -->
        <ElFormItem :label="$t('weight')">
          <ElInput type="number" v-model="formData.weight" style="direction: ltr">
            <template #append>
              <ElSelect style="width: 70px" v-model="formData.weightUnit">
                <ElOption value="kg" label="kg" />
                <ElOption value="lb" label="lb" />
              </ElSelect>
            </template>
          </ElInput>
        </ElFormItem>

        <!-- Age -->
        <ElFormItem :label="$t('age')">
          <ElInput type="number" v-model="formData.age" style="direction: ltr" />
        </ElFormItem>
      </div>

      <!-- Gender -->
      <ElFormItem :label="$t('gender')" style="direction: ltr">
        <ElRadioGroup v-model="formData.gender">
          <ElRadio label="male"> 🧍{{ $t('male') }} </ElRadio>
          <ElRadio label="female"> 🧍‍♀️{{ $t('female') }} </ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <!-- Activity Level -->
      <ElFormItem :label="$t('activityLevel')">
        <ElSelect v-model="formData.activityLevel">
          <ElOption value="1" label="BMR" />
          <ElOption value="1.2" :label="$t('activityLevel2')" />
          <ElOption value="1.375" :label="$t('activityLevel3')" />
          <ElOption value="1.418" :label="$t('activityLevel4')" />
          <ElOption value="1.462" :label="$t('activityLevel5')" />
          <ElOption value="1.725" :label="$t('activityLevel6')" />
        </ElSelect>
      </ElFormItem>

      <div class="mt-8 mb-4">
        <p class="text-center"
          >{{ $t('yourDailyCalories') }}
          <span
            class="text-2xl font-bold underline underline-double underline-[var(--ep-color-primary)]"
            >{{ formData.calories }}</span
          >
        </p>
      </div>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

import {
  ElForm,
  ElRadio,
  ElInput,
  ElSelect,
  ElOption,
  ElFormItem,
  ElRadioGroup
} from 'element-plus'

interface PropsTypes {
  updateCalories: (value: string) => void
}

const props = defineProps<PropsTypes>()

const formData = ref({
  age: 25,
  weight: 75,
  height: 180,
  calories: '',
  gender: 'male',
  weightUnit: 'kg',
  heightUnit: 'cm',
  activityLevel: '1'
})

// Function to convert different units to CM for height
const convertToCM = (value: number, unit: string): number => {
  return unit === 'cm' ? value : value * 30.48 // 1 Feet = 30.48 CM
}

// Function to convert different units to KG for weight
const convertToKG = (value: number, unit: string): number => {
  return unit === 'kg' ? value : value * 0.453592 // 1 LB = 0.453592 KG
}

const calculateBMR = () => {
  const { height, weight, heightUnit, weightUnit, age, activityLevel, gender } = formData.value
  const heightInCM = convertToCM(height, heightUnit)
  const weightInKG = convertToKG(weight, weightUnit)

  let bmr: number
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weightInKG + 4.799 * heightInCM - 5.677 * age
  } else {
    bmr = 447.593 + 9.247 * weightInKG + 3.098 * heightInCM - 4.33 * age
  }

  const result = bmr * +activityLevel
  formData.value.calories = result.toFixed(0)
  props.updateCalories(formData.value.calories)
}

watch(
  formData,
  () => {
    calculateBMR()
  },
  { deep: true }
)
onMounted(() => {
  calculateBMR()
})
</script>

<style scoped></style>
