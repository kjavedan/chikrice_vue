<template>
  <div class="mt-1">
    <span v-show="error" class="text-[var(--ep-color-error)] whitespace-nowrap">{{
      $t(error)
    }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error: string }>()
</script>

<style scoped></style>
