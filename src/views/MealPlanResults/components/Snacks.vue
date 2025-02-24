<template>
  <div class="flex gap-4 w-full overflow-x-scroll overflow-y-hidden mt-2 absolute pb-4">
    <div
      v-for="item in items"
      :key="item.name"
      class="inline-block cursor-pointer"
      @click="handleClick(item)"
    >
      <div
        class="rounded-xl w-35 h-25 mt-1 flex items-center justify-center overflow-hidden relative bg-gray-2"
      >
        <img :src="item.image" alt="egg sandwich" class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PropsTypes {
  items: any
  defaultCalorie: any
  macrosRange: any
  mealNumber: any
  filledMacros: any
}

const props = defineProps<PropsTypes>()
console.log(props)

const emits = defineEmits(['updateSelectedSnack'])
const handleClick = (item) => {
  emits('updateSelectedSnack', props.mealNumber, item, props.defaultCalorie, props.macrosRange)
}
</script>

<style scoped></style>
