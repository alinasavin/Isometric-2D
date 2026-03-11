<script setup lang="ts">
import { computed } from 'vue'
import type { Hotspot } from '../../types/MapTypes'

const props = defineProps<{
  hotspot: Hotspot
  scale: number
}>()

defineEmits(['click'])

const markerScale = computed(() => {
  // Keeps markers roughly the same size regardless of map zoom
  return Math.max(0.6, Math.min(1.2, 1 / props.scale * 0.8)) + 0.2
})
</script>

<template>
  <div
    class="absolute z-10"
    :style="{
      left: `${hotspot.x}%`,
      top: `${hotspot.y}%`,
      width: '0px',
      height: '0px'
    }"
  >
    <div
      class="relative group cursor-pointer"
      :style="{ transform: `scale(${markerScale})` }"
      @click="$emit('click')"
    >
      <div class="w-6 h-6 -translate-x-1/2 -translate-y-1/2 relative">
        <!-- Pulse Animation Ring -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none">
          <div class="w-full h-full rounded-full bg-brand-yellow/30 animate-ping-slow origin-center"></div>
        </div>

        <!-- Core Marker -->
        <div class="absolute inset-0 rounded-full bg-surface border-2 border-brand-yellow shadow-[0_0_15px_rgba(185,255,0,0.5)] transition-colors duration-300 group-hover:bg-brand-yellow group-hover:border-white flex items-center justify-center">
          <div class="w-2 h-2 bg-brand-dark-grey rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Tooltip Label -->
        <div class="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0 pointer-events-none border border-secondary/30 z-20 shadow-xl">
          <span class="font-semibold block text-brand-yellow">{{ hotspot.title }}</span>
          <span class="text-secondary font-light">{{ hotspot.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
