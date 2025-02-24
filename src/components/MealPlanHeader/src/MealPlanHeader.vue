<template>
  <div class="md:mt-10">
    <h1 class="mb-1 text-3xl">{{ $t(title) }} </h1>
    <div
      @click="handleClick(isEdit)"
      class="underline text-[var(--ep-color-link)] cursor-pointer text-sm"
    >
      {{ $t(link) }}
      <ArrowRight />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { getHeaderContentByLocale } from '@/utils/locale'
import { DialogDataTypes } from '@/views/MealPlanGenerator/types'
import { useRouter } from 'vue-router'

interface PropsTypes {
  title: string
  link: string
  isEdit: boolean
  openDialog?: (arg0: DialogDataTypes) => void
}

// EMITS
const emit = defineEmits(['openDialog'])

// STORE
const { currentLocale } = useLocaleStoreWithOut()

// PROPS
defineProps<PropsTypes>()

// NAVIGATION
const router = useRouter()

// FUNC
const handleClick = (isEdit: boolean) => {
  isEdit
    ? router.push({ name: 'mealPlanGenerator' })
    : emit('openDialog', {
        title: 'whatMakesGreatMealPlan',
        content: getHeaderContentByLocale(currentLocale.lang, 0),
        videoUrl: 'videoUrl'
      })
}
</script>

<style scoped></style>
