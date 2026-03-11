<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { CustomButton } from '../../types/Hotspot'

const props = defineProps<{
  button: CustomButton
  className?: string
}>()

const isExternal = computed(() => {
  const url = props.button.url.toLowerCase()
  return !url.startsWith('mailto:') && !url.startsWith('tel:')
})

const target = computed(() => (isExternal.value ? '_blank' : undefined))
const rel = computed(() => (isExternal.value ? 'noopener noreferrer' : undefined))
</script>

<template>
  <a
    :href="button.url"
    :target="target"
    :rel="rel"
    class="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-brand-dark-grey font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 group"
    :class="className"
  >
    <span>{{ button.title }}</span>
    <Icon
      v-if="button.icon"
      :icon="button.icon"
      class="w-5 h-5 transition-transform group-hover:translate-x-1"
    />
  </a>
</template>
