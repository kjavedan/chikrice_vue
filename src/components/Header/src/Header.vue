<template>
  <header :class="headerClasses">
    <NavDesktop v-if="mdAndUp" />
    <NavMobile v-else />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavMobile from './NavMobile.vue'
import NavDesktop from './NavDesktop.vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndUp = breakpoints.greaterOrEqual('md')

const isScrolling = ref(false)

// Listen for scroll event
window.addEventListener('scroll', () => {
  isScrolling.value = window.scrollY !== 0
})

// Computed property for header classes
const headerClasses = computed(() => ({
  sticky: true,
  'top-0': true,
  'left-0': true,
  'z-50': true,
  'shadow-sm': isScrolling.value,
  'bg-[var(--ep-bg-color)]': true
}))
</script>

<style lang="scss">
.nav-link {
  color: var(--ep-text-color-primary);
  transition: all ease-in-out 0.1s;

  &:hover {
    color: var(--ep-color-primary);
  }

  &.active {
    color: var(--ep-color-primary);
    text-decoration: underline;
    text-decoration-style: dotted;
  }
}

.text-stroke {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--ep-text-color-primary);
  color: transparent;
}
</style>
