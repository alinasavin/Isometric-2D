<script setup lang="ts">
import { computed } from 'vue'
import type { Hotspot } from '../../types/Hotspot'

const props = defineProps<{
  hotspot: Hotspot
  scale: number
  showLabel: boolean
}>()

defineEmits(['click'])

const markerScale = computed(() => {
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
      class="relative group cursor-pointer w-6 h-6 -translate-x-1/2 -translate-y-1/2"
      :style="{ transform: `scale(${markerScale})` }"
      @click="$emit('click')"
    >
      <div class="relative w-full h-full">
        <!-- Pulse Animation Ring -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none">
          <div class="w-full h-full rounded-full bg-brand-green/30 animate-ping-slow origin-center"></div>
        </div>

        <!-- Core Marker -->
        <div class="absolute inset-0 rounded-full bg-white border-4 border-brand-green shadow-[0_0_15px_rgba(5,229,96,0.5)] transition-colors duration-300 flex items-center justify-center">
          <div class="w-2 h-2 bg-brand-dark-grey rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <!-- Tooltip Label -->
        <div
          v-if="showLabel"
          class="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white text-[#192D38] text-xs px-3 py-1.5 rounded shadow-xl whitespace-nowrap opacity-100 transition-all duration-300 pointer-events-none z-20 border border-gray-100"
        >
          <span class="font-bold block uppercase tracking-tight">{{ hotspot.title }}</span>
          <!-- Subtitle shown only on hover -->
          <span class="text-gray-500 font-medium lowercase italic block h-0 overflow-hidden group-hover:h-auto group-hover:mt-0.5 transition-all">
            {{ hotspot.subtitle }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the label triangle/arrow if needed or just use simple shadow */
</style>
