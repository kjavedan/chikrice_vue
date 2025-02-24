<script setup lang="ts">
import { unref } from 'vue'
import { useLocale } from '@/hooks/web/useLocale'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

const { currentLocale, localeMap, setCurrentLocale } = useLocaleStoreWithOut()

const setLang = (newLang: LocaleType) => {
  if (newLang === unref(currentLocale).lang) return

  window.location.reload()
  setCurrentLocale({ lang: newLang })
  const { changeLocale } = useLocale()
  changeLocale(newLang)
}
</script>

<template>
  <ElDropdown trigger="hover" @command="setLang">
    <div class="i-heroicons-solid:translate cursor-pointer"></div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in localeMap" :key="item.lang" :command="item.lang">{{
          item.name
        }}</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style></style>
