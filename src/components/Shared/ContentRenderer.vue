<script setup lang="ts">
import { ref } from 'vue'
import type { HotspotContent } from '../../types/MapTypes'
import RagStatusPanel from './RagStatusPanel.vue'

const props = defineProps<{
  content: HotspotContent[]
}>()

const activeSection = ref<string | null>(null)

const toggleSection = (id: string) => {
  activeSection.value = activeSection.value === id ? null : id
}

const titles = props.content.filter(item => item.type === 'title')
const alerts = props.content.filter(item => item.type === 'alert')
const sections = props.content.filter(item => item.type === 'section')
const media = props.content.filter(item => item.type === 'image' || item.type === 'video')
</script>

<template>
  <div class="flex flex-col lg:flex-row h-full">
    <!-- Main Content Area -->
    <div class="flex-1 p-6 sm:p-8">
      <header v-for="title in titles" :key="title.value" class="mb-4">
        <h2 class="text-2xl font-bold tracking-wider text-white uppercase">{{ title.value }}</h2>
        <div class="h-1 w-16 bg-brand-yellow mt-2"></div>
      </header>

      <RagStatusPanel v-if="alerts.length" :alerts="alerts" />

      <!-- Interactive Sections -->
      <div class="mt-4 space-y-2">
        <div
          v-for="section in sections"
          :key="section.value"
          class="border border-white/10 rounded-xl overflow-hidden bg-white/10 transition-all duration-300"
        >
          <button
            @click="toggleSection(section.value)"
            class="w-full flex items-center justify-between p-4 text-left hover:bg-white/10 transition-colors group"
          >
            <span class="font-semibold tracking-wide text-secondary group-hover:text-white uppercase text-sm">{{ section.value }}</span>
            <svg
              class="w-4 h-4 transition-transform duration-300"
              :class="{ 'rotate-180': activeSection === section.value }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            class="overflow-hidden transition-all duration-300 ease-in-out"
            :style="{ maxHeight: activeSection === section.value ? '400px' : '0' }"
          >
            <div class="p-4 pt-0 text-secondary/70 text-sm leading-relaxed border-t border-white/5">
              {{ section.content }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar Visual / Media Area -->
    <div class="lg:w-1/3 bg-black/20 p-6 border-l border-white/10 flex flex-col gap-4 overflow-y-auto">
      <template v-if="media.length">
        <div
          v-for="item in media"
          :key="item.url"
          class="relative border border-white/10 rounded-xl overflow-hidden bg-black/40 group"
        >
          <div v-if="item.type === 'image'" class="aspect-video">
            <img :src="item.url" :alt="item.value" class="w-full h-full object-cover" />
          </div>
          <div v-else-if="item.type === 'video'" class="aspect-video">
            <video :src="item.url" controls class="w-full h-full object-cover"></video>
          </div>
          <div class="p-3 bg-white/5 backdrop-blur-sm border-t border-white/10">
            <span class="text-[10px] uppercase tracking-widest text-brand-yellow font-bold">{{ item.value }}</span>
          </div>
        </div>
      </template>
      <div v-else class="relative h-64 lg:h-full min-h-[300px] border border-dashed border-white/20 rounded-xl overflow-hidden group">
        <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#000_25%,#000_50%,transparent_50%,transparent_75%,#000_75%,#000_100%)] bg-[length:10px_10px] opacity-10"></div>
        <div class="absolute inset-0 flex items-center justify-center p-8">
           <div class="w-full h-full border border-brand-yellow/30 flex items-center justify-center text-center italic text-xs tracking-widest text-secondary/60 uppercase">
             No Media Available
           </div>
        </div>
      </div>
    </div>
  </div>
</template>
