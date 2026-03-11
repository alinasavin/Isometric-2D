<script setup lang="ts">
import MapContainer from '../components/InteractiveMap/MapContainer.vue'
import Footer from '../components/Shared/Footer.vue'
import Button from '../components/Shared/Button.vue'
import homeData from '../data/home.json'
import type { HomeContent, FooterContent } from '../types/home'

const homeContent = homeData.home as HomeContent
const footerContent = homeData.footer as FooterContent
</script>

<template>
  <div class="w-screen h-screen bg-brand-light-grey overflow-hidden relative flex flex-col md:flex-row">
    <!-- Left Side: Home Content (1/3) -->
    <div data-testid="content-panel" class="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-center bg-brand-dark-grey text-white">
      <div class="max-w-2xl mx-auto space-y-8">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white">
          {{ homeContent.title }}
        </h1>

        <div class="space-y-6 text-secondary text-lg leading-relaxed" v-html="homeContent.description">
        </div>

        <Button :button="homeContent.button" />
      </div>
    </div>

    <!-- Right Side/Background: Map Container (2/3) -->
    <div data-testid="map-panel" class="w-full md:w-2/3 h-1/2 md:h-full relative border-t md:border-t-0 md:border-l border-neutral-800">
      <MapContainer />
    </div>

    <!-- Bottom: Footer -->
    <Footer :content="footerContent" />
  </div>
</template>
