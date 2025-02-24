<template>
  <div
    class="mt-1 mt-4 underline text-[var(--ep-color-link)] cursor-pointer text-sm"
    @click="FAQStore.handleFAQData({ title: link, content, videoUrl: '' })"
  >
    {{ $t(link) }}
    <ArrowRight
  /></div>
</template>

<script setup lang="ts">
import { useFAQDialogStoreWithout } from '@/store/modules/faq-dialog'

interface PropsTypes {
  link: string
  content: object
}
// PROPS
defineProps<PropsTypes>()

// STORE
const FAQStore = useFAQDialogStoreWithout()
</script>

<style scoped></style>
