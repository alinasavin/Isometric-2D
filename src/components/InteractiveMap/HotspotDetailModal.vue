<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { Hotspot } from '../../types/Hotspot'
import Button from '../Shared/Button.vue'
import VideoModal from '../Shared/VideoModal.vue'

const props = defineProps<{
  hotspot: Hotspot
}>()

const emit = defineEmits(['close'])

const activeTab = ref<'case-studies' | 'articles'>('case-studies')
const selectedVideoUrl = ref<string | null>(null)

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#192D38]/60 backdrop-blur-sm" @click.self="close">
    <div class="bg-white w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
      <!-- Close Button -->
      <button @click="close" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20 bg-white/80 rounded-full p-1">
        <Icon icon="mdi:close" class="w-6 h-6" />
      </button>

      <div class="overflow-y-auto custom-scrollbar">
        <!-- Top: Full Width Image -->
        <div class="w-full aspect-[21/9] relative">
          <img :src="hotspot.content.image" :alt="hotspot.title" class="w-full h-full object-cover" />
        </div>

        <!-- Bottom Container: Grid -->
        <div class="flex flex-col md:flex-row min-h-[400px]">
          <!-- Left Column (1/3): Details -->
          <div class="w-full md:w-1/3 p-8 border-r border-gray-100">
            <div class="space-y-6">
              <div>
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ hotspot.content.subtitle }}</span>
                <h2 class="text-4xl font-bold text-[#192D38] mt-2">{{ hotspot.content.title }}</h2>
              </div>

              <div
                class="text-gray-600 text-sm leading-relaxed"
                v-if="hotspot.content.description"
                v-html="hotspot.content.description.html"
              ></div>

              <button
                v-if="hotspot.content.videoUrl"
                @click="selectedVideoUrl = hotspot.content.videoUrl"
                class="flex items-center gap-3 text-brand-green font-bold uppercase text-xs tracking-widest group"
              >
                <div class="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Icon icon="mdi:play" class="w-6 h-6" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>
          </div>

          <!-- Right Column (2/3): Tabs & Content -->
          <div class="w-full md:w-2/3 flex flex-col bg-gray-50/50">
            <!-- Tabs Header -->
            <div class="flex border-b border-gray-100 bg-white">
              <button
                @click="activeTab = 'case-studies'"
                class="px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors relative"
                :class="activeTab === 'case-studies' ? 'text-brand-green' : 'text-gray-400 hover:text-gray-600'"
              >
                Case Studies
                <div v-if="activeTab === 'case-studies'" class="absolute bottom-0 left-0 w-full h-1 bg-brand-green"></div>
              </button>
              <button
                @click="activeTab = 'articles'"
                class="px-8 py-4 text-xs font-bold uppercase tracking-widest transition-colors relative"
                :class="activeTab === 'articles' ? 'text-brand-green' : 'text-gray-400 hover:text-gray-600'"
              >
                Articles
                <div v-if="activeTab === 'articles'" class="absolute bottom-0 left-0 w-full h-1 bg-brand-green"></div>
              </button>
            </div>

            <!-- Tab Content Area -->
            <div class="p-8 space-y-8 flex-1">
              <template v-if="activeTab === 'case-studies'">
                <div v-if="hotspot.caseStudies.length === 0" class="text-gray-400 italic text-center py-12">
                  No case studies available for this hotspot.
                </div>
                <div
                  v-for="(item, index) in hotspot.caseStudies"
                  :key="index"
                  class="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row border border-gray-100"
                >
                  <!-- Item Left (1/2) -->
                  <div class="w-full md:w-1/2 p-6 flex flex-col">
                    <h3 class="text-xl font-bold text-[#192D38] mb-4">{{ item.title }}</h3>
                    <div
                      class="text-gray-500 text-sm leading-relaxed mb-6"
                      v-if="item.description"
                      v-html="item.description.html"
                    ></div>
                  </div>
                  <!-- Item Right (1/2) -->
                  <div class="w-full md:w-1/2 flex flex-col">
                    <div class="aspect-video w-full overflow-hidden bg-gray-200" v-if="item.image">
                      <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                    </div>
                    <div class="p-6 mt-auto flex items-center justify-between gap-4">
                      <Button :button="item.externalLink" className="text-sm px-4 py-2" />

                      <button
                        v-if="item.videoUrl"
                        @click="selectedVideoUrl = item.videoUrl"
                        class="w-10 h-10 rounded-full bg-brand-dark-grey flex items-center justify-center text-white hover:bg-brand-green transition-colors"
                      >
                        <Icon icon="mdi:play" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="activeTab === 'articles'">
                <div v-if="hotspot.articles.length === 0" class="text-gray-400 italic text-center py-12">
                  No articles available for this hotspot.
                </div>
                <div
                  v-for="(item, index) in hotspot.articles"
                  :key="index"
                  class="bg-white rounded-lg overflow-hidden shadow-sm flex flex-col md:flex-row border border-gray-100"
                >
                  <div class="w-full md:w-1/2 p-6 flex flex-col">
                    <h3 class="text-xl font-bold text-[#192D38] mb-4">{{ item.title }}</h3>
                    <div
                      class="text-gray-500 text-sm leading-relaxed mb-6"
                      v-if="item.description"
                      v-html="item.description.html"
                    ></div>
                  </div>
                  <div class="w-full md:w-1/2 flex flex-col">
                    <div class="aspect-video w-full overflow-hidden bg-gray-200" v-if="item.image">
                      <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                    </div>
                    <div class="p-6 mt-auto flex items-center justify-between gap-4">
                      <Button :button="item.externalLink" className="text-sm px-4 py-2" />

                      <button
                        v-if="item.videoUrl"
                        @click="selectedVideoUrl = item.videoUrl"
                        class="w-10 h-10 rounded-full bg-brand-dark-grey flex items-center justify-center text-white hover:bg-brand-green transition-colors"
                      >
                        <Icon icon="mdi:play" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Modal -->
    <VideoModal
      v-if="selectedVideoUrl"
      :url="selectedVideoUrl"
      @close="selectedVideoUrl = null"
    />
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
