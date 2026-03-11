<script setup lang="ts">
import MapContainer from '../components/InteractiveMap/MapContainer.vue'

</script>

<template>
  <div class="w-screen h-screen bg-brand-light-grey overflow-hidden relative flex flex-col md:flex-row">


    <!-- Left Column: Content (2/3) -->
    <div data-testid="content-panel" class="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-center">
      <div class="max-w-2xl mx-auto space-y-8">
        <header class="space-y-4">
          <div class="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            Locomotive Heritage
          </div>
        </header>

        <div class="space-y-6 text-neutral-400 text-lg leading-relaxed">
          <p>
            Explore the intricate details of vintage steam locomotives, the engineering marvels that once dominated the global transportation landscape.
            From the massive 4-8-4 wheel configurations to the high-pressure boilers, every component tells a story of industrial innovation.
          </p>
        </div>
      </div>
    </div>

    <!-- Right Column: Map (1/3) -->
    <div data-testid="map-panel" class="w-full md:w-2/3 h-1/2 md:h-full relative border-t md:border-t-0 md:border-l border-neutral-800">
      <MapContainer />
    </div>
  </div>
</template>
