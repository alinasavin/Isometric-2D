<script setup lang="ts">
import type { HotspotContent } from '../../types/MapTypes'

const props = defineProps<{
  alerts: HotspotContent[]
}>()

const getLevelClasses = (level?: string) => {
  switch (level) {
    case 'red': return 'border-red-500/30 bg-red-500/20 text-red-400'
    case 'amber': return 'border-amber-500/30 bg-amber-500/20 text-amber-400'
    case 'green': return 'border-brand-green/30 bg-brand-green/20 text-brand-green'
    default: return 'border-secondary/30 bg-secondary/5 text-secondary'
  }
}

const getIconClasses = (level?: string) => {
  switch (level) {
    case 'red': return 'bg-red-950/40 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]'
    case 'amber': return 'bg-amber-950/40 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
    default: return 'bg-green-950/40 border-brand-green/30 shadow-[0_0_10px_rgba(5,229,96,0.1)]'
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
    <div
      v-for="alert in alerts"
      :key="alert.message"
      class="border rounded-xl p-4 transition-all duration-500 hover:scale-105"
      :class="getLevelClasses(alert.level)"
    >
      <div class="flex items-center gap-2 mb-2">
        <div class="w-2 h-2 rounded-full animate-pulse bg-current"></div>
        <span class="text-xs font-bold tracking-widest uppercase">{{ alert.value }}</span>
      </div>
      <p class="text-sm font-medium">{{ alert.message }}</p>

      <!-- Visual status bar -->
      <div class="mt-4 h-0.5 w-full bg-current opacity-10"></div>
    </div>
  </div>
</template>
