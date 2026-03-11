<script setup lang="ts">
import type { FooterContent } from '../../types/home'
import Button from './Button.vue'

defineProps<{
  content: FooterContent
}>()
</script>

<template>
  <footer class="fixed bottom-0 left-0 w-full bg-brand-dark-grey/90 backdrop-blur-md border-t border-white/10 p-4 z-50 flex items-center justify-between px-8">
    <p class="text-secondary text-sm font-medium">{{ content.text }}</p>
    <Button :button="content.button" class-name="py-2 px-4 text-sm" />
  </footer>
</template>
