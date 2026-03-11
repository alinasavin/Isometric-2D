<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  url: string
}>()

defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-black/90" @click.self="$emit('close')">
    <button
      @click="$emit('close')"
      class="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-10"
    >
      <Icon icon="mdi:close" class="w-8 h-8" />
    </button>

    <div class="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
      <video :src="url" controls autoplay class="w-full h-full"></video>
    </div>
  </div>
</template>
