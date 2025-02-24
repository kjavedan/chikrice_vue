<template>
  <div class="min-h-dvh bg-[var(--ep-bg-color)]">
    <Header />
    <main :style="{ direction }" class="container mx-auto mt-2 p-4 md:p-0">
      <slot></slot>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { isLtr } from '@/utils/is'

// REFS
const ltr = ref(isLtr())

// COMPUTED
const direction = computed(() => (ltr.value ? 'ltr' : 'rtl'))
</script>

<style lang="scss" scoped></style>
