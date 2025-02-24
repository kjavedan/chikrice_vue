<template>
  <div>
    <h3
      @click="$router.push('/')"
      :class="['cursor-pointer font-extrabold', { 'text-2xl': isMd }, { 'text-3xl': isLg }]"
    >
      <span> Chik </span>
      <span class="text-stroke">Rice</span>
    </h3>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PropsTypes {
  size: 'sm' | 'md' | 'lg'
}
const props = defineProps<PropsTypes>()

const isMd = computed(() => (props.size === 'md' ? true : false))
const isLg = computed(() => (props.size === 'lg' ? true : false))
</script>

<style scoped></style>
