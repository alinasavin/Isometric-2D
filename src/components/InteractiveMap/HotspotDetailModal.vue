<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { Hotspot, ContentItem } from '../../types/hotspot'
import Button from '../Shared/Button.vue'

const props = defineProps<{
  hotspot: Hotspot
}>()

const activeTab = ref<'caseStudies' | 'articles'>('caseStudies')

const videoToPlay = ref<string | null>(null)

const playVideo = (url: string) => {
  videoToPlay.value = url
}

const closeVideo = () => {
  videoToPlay.value = null
}
</script>

<template>
  <div class="flex flex-col h-full bg-brand-dark-grey text-white overflow-hidden">
    <!-- Top: Hotspot Image (100% width) -->
    <div class="w-full aspect-video md:aspect-[21/9] relative">
      <img
        :src="hotspot.content.image"
        :alt="hotspot.content.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-brand-dark-grey to-transparent opacity-60"></div>
    </div>

    <!-- Bottom Container (Flex/Grid) -->
    <div class="flex flex-col md:flex-row flex-1 min-h-0">
      <!-- Left Column: Hotspot details (1/3 width) -->
      <div class="w-full md:w-1/3 p-6 md:p-8 border-r border-white/10 flex flex-col space-y-4">
        <h2 class="text-3xl font-bold tracking-tight text-white">{{ hotspot.content.title }}</h2>
        <h3 class="text-brand-yellow font-semibold uppercase tracking-widest text-sm">{{ hotspot.content.subtitle }}</h3>
        <div class="text-secondary leading-relaxed" v-html="hotspot.content.description"></div>

        <button
          v-if="hotspot.content.videoUrl"
          @click="playVideo(hotspot.content.videoUrl)"
          class="flex items-center gap-3 text-white hover:text-brand-yellow transition-colors group mt-4 w-fit"
        >
          <div class="w-12 h-12 rounded-full border-2 border-brand-yellow flex items-center justify-center group-hover:bg-brand-yellow group-hover:text-brand-dark-grey transition-all">
            <Icon icon="mdi:play" class="text-2xl" />
          </div>
          <span class="font-bold uppercase tracking-widest text-sm">Play Video</span>
        </button>
      </div>

      <!-- Right Column: Case Studies & Articles (2/3 width) -->
      <div class="w-full md:w-2/3 flex flex-col min-h-0">
        <!-- Header: Tabs -->
        <div class="flex border-b border-white/10">
          <button
            @click="activeTab = 'caseStudies'"
            class="flex-1 py-4 px-6 font-bold uppercase tracking-widest text-sm transition-all relative"
            :class="activeTab === 'caseStudies' ? 'text-brand-yellow' : 'text-secondary hover:text-white'"
          >
            Case Studies
            <div v-if="activeTab === 'caseStudies'" class="absolute bottom-0 left-0 w-full h-1 bg-brand-yellow"></div>
          </button>
          <button
            @click="activeTab = 'articles'"
            class="flex-1 py-4 px-6 font-bold uppercase tracking-widest text-sm transition-all relative"
            :class="activeTab === 'articles' ? 'text-brand-yellow' : 'text-secondary hover:text-white'"
          >
            Articles
            <div v-if="activeTab === 'articles'" class="absolute bottom-0 left-0 w-full h-1 bg-brand-yellow"></div>
          </button>
        </div>

        <!-- Tab Content Area -->
        <div class="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div v-if="hotspot[activeTab].length === 0" class="h-full flex items-center justify-center text-secondary/50 italic">
            No {{ activeTab === 'caseStudies' ? 'case studies' : 'articles' }} available for this location.
          </div>
          <div v-else class="space-y-8">
            <div
              v-for="(item, index) in hotspot[activeTab]"
              :key="index"
              class="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <!-- Left Side (1/2 width): Item title and description -->
              <div class="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <h4 class="text-xl font-bold mb-3 text-white">{{ item.title }}</h4>
                  <div class="text-secondary text-sm leading-relaxed" v-html="item.description"></div>
                </div>
              </div>

              <!-- Right Side (1/2 width): Item image, externalLink, Video play button -->
              <div class="w-full md:w-1/2 flex flex-col gap-4">
                <div v-if="item.image" class="aspect-video rounded-lg overflow-hidden border border-white/10">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                </div>
                <div class="flex items-center justify-between gap-4 mt-auto">
                  <Button :button="item.externalLink" class-name="py-2 px-4 text-xs" />
                  <button
                    v-if="item.videoUrl"
                    @click="playVideo(item.videoUrl)"
                    class="w-10 h-10 rounded-full border border-brand-yellow flex items-center justify-center text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark-grey transition-all"
                    title="Play Video"
                  >
                    <Icon icon="mdi:play" class="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal Overlay (Local) -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="videoToPlay"
        class="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 md:p-12"
        @click="closeVideo"
      >
        <button
          @click="closeVideo"
          class="absolute top-8 right-8 text-white hover:text-brand-yellow transition-colors z-[70] p-2"
        >
          <Icon icon="mdi:close" class="text-3xl" />
        </button>
        <div class="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl" @click.stop>
          <video :src="videoToPlay" controls autoplay class="w-full h-full"></video>
        </div>
      </div>
    </Transition>
  </div>
</template>
