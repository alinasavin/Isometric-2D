<script setup lang="ts">
import MapContainer from '../components/InteractiveMap/MapContainer.vue'
import Button from '../components/Shared/Button.vue'
import homeData from '../data/home.json'
import type { HomeContent, FooterContent } from '../types/Home'

const homeContent: HomeContent = homeData.home
const footerContent: FooterContent = homeData.footer
</script>

<template>
  <div class="w-screen h-screen bg-[#BEDAE5] overflow-hidden relative flex flex-col">
    <div class="flex-1 flex flex-col md:flex-row min-h-0">
      <!-- Left Panel: Content -->
      <div
        data-testid="content-panel"
        class="w-full md:w-1/3 h-1/2 md:h-auto overflow-y-auto p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-center bg-[#BEDAE5]"
      >
        <div class="max-w-md mx-auto space-y-8">
          <h1 class="text-4xl md:text-5xl font-bold text-[#192D38] leading-tight">
            {{ homeContent.title }}
          </h1>

          <div
            class="text-[#192D38] text-lg leading-relaxed space-y-4"
            v-html="homeContent.description"
          ></div>

          <div class="pt-4">
            <Button :button="homeContent.button" />
          </div>
        </div>
      </div>

      <!-- Right Panel: Map -->
      <div
        data-testid="map-panel"
        class="w-full md:w-2/3 h-1/2 md:h-auto relative border-t md:border-t-0 md:border-l border-white/20"
      >
        <MapContainer />
      </div>
    </div>

    <!-- Footer -->
    <footer class="h-16 bg-[#3F32F1] flex items-center justify-between px-8 z-20">
      <p class="text-white text-sm font-medium">
        {{ footerContent.text }}
      </p>
      <div class="flex items-center gap-4">
        <Button
          :button="footerContent.button"
          className="bg-transparent text-white p-0 hover:scale-110 active:scale-90"
        />
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Specific overrides for footer button to match the LinkedIn icon look if needed */
:deep(.bg-transparent) {
  background-color: transparent !important;
}
</style>
