<template>
  <div :style="styles">
    <div>
      <div class="text-xs font-semibold md:text-xs">
        <small class="block">
          {{ $t(name) }}: <b>{{ amount }} </b> g
        </small>
      </div>
      <div
        :class="[
          'h-1  text-white rounded-md w-full',
          { 'bg-[var(--ep-color-error)]': name === 'proteins' },
          { 'bg-[var(--ep-color-success)]': name === 'carbs' },
          { 'bg-[var(--ep-color-warning)]': name === 'fats' }
        ]"
      >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PropsTypes {
  name: 'carbs' | 'proteins' | 'fats'
  amount: number
  width: number
}
const props = defineProps<PropsTypes>()

const styles = computed(() => ({
  width: `${props.width}%`
}))
</script>

<style scoped></style>
