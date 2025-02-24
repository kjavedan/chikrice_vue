<template>
  <div>
    <component :is="content" />
  </div>
</template>

<script setup lang="ts">
import 'vue3-markdown/dist/style.css'

interface PropsTypes {
  content: Object
}

// PROPS
defineProps<PropsTypes>()
</script>
