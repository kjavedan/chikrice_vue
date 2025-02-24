<template>
  <p class="mt-1 text-[var(--ep-text-color-regular)] cursor-pointer mb-5 capitalize">
    {{ $t(question) }}
    <span
      v-if="link"
      class="underline text-[var(--ep-color-link)] cursor-pointer text-sm"
      @click="FAQStore.handleFAQData({ title: link, content, videoUrl: '' })"
    >
      {{ $t(link) }}</span
    >
  </p>
</template>

<script setup lang="ts">
import { useFAQDialogStoreWithout } from '@/store/modules/faq-dialog'

interface PropsTypes {
  question: string
  link?: string
  content: object
}

// PROPS
defineProps<PropsTypes>()

// STORE
const FAQStore = useFAQDialogStoreWithout()
</script>
<style scoped></style>
