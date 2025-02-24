import { defineStore } from 'pinia'
import { store } from '..'
import { markRaw, ref } from 'vue'
import { DialogDataTypes } from '@/views/MealPlanGenerator/types'

export const useFAQDialogStore = defineStore('faq', () => {
  // REFS
  const isVisible = ref<boolean>(false)

  const data = ref<DialogDataTypes>({ title: '', content: {}, videoUrl: '' })

  // FUNCS
  const handleFAQData = (value: DialogDataTypes) => {
    data.value = {
      title: value?.title,
      content: markRaw(value?.content),
      videoUrl: value?.videoUrl
    }
    isVisible.value = true
  }

  const handleVisibility = (value: boolean) => {
    isVisible.value = value
  }

  return { isVisible, data, handleFAQData, handleVisibility }
})

export const useFAQDialogStoreWithout = () => {
  return useFAQDialogStore(store)
}
