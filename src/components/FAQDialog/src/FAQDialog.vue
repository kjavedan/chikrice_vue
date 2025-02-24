<template>
  <div>
    <ElDialog
      :modelValue="isVisible"
      @update:model-value="updateVisibility"
      width="95%"
      style="max-width: 800px"
    >
      <template #header>
        <h2>
          {{ $t(title) }}
        </h2>
      </template>
      <div class="content-dialog">
        <DialogContent :content="markRaw(content)" />
      </div>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, markRaw } from 'vue'

interface PropsTypes {
  title: string
  content: object
  isVisible: boolean
}

defineProps<PropsTypes>()

const emit = defineEmits(['update:isVisible'])

const updateVisibility = (value: boolean) => {
  emit('update:isVisible', value)
}
</script>
