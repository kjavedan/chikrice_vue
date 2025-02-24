<template>
  <nav class="flex items-center justify-between h-20 container mx-auto">
    <Logo size="lg" />
    <ul class="flex items-center gap-8">
      <RouterLink
        v-for="item in navData"
        :key="item.label"
        :to="{ name: item.name }"
        :class="['nav-link', { active: route.name === item.name }]"
        >{{ $t(item.label) }}</RouterLink
      >
    </ul>
    <div class="flex items-center gap-3">
      <LocaleDropdown />
      <ThemeSwitch />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import navConfig from './nav-config'

const route = useRoute()

//refs
const navData = ref(navConfig)
</script>

<style scoped lang="scss"></style>
