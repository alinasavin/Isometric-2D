<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { CustomButton } from '../../types/button'

const props = defineProps<{
  button: CustomButton
  className?: string
}>()

const isExternal = (url: string) => {
  return !url.startsWith('mailto:') && !url.startsWith('tel:')
}
</script>

<template>
  <a
    :href="button.url"
    :target="isExternal(button.url) ? '_blank' : undefined"
    :rel="isExternal(button.url) ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-lg font-bold transition-all hover:bg-opacity-90 active:scale-95 group"
    :class="className"
  >
    <Icon v-if="button.icon" :icon="button.icon" class="text-xl group-hover:translate-x-1 transition-transform" />
    <span>{{ button.title }}</span>
  </a>
</template>
