<script setup lang="ts">
import MapContainer from '../components/InteractiveMap/MapContainer.vue'
import Brilliance from '../components/Shared/Brilliance.vue'
</script>

<template>
  <div class="w-screen h-screen bg-neutral-950 overflow-hidden relative flex flex-col md:flex-row">
    <Brilliance />

    <!-- Left Column: Content (2/3) -->
    <div data-testid="content-panel" class="w-full md:w-2/3 h-1/2 md:h-full overflow-y-auto p-8 md:p-12 lg:p-16 z-10 flex flex-col justify-center">
      <div class="max-w-2xl mx-auto space-y-8">
        <header class="space-y-4">
          <div class="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            Locomotive Heritage
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            The Golden Era of <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Steam Engines</span>
          </h1>
        </header>

        <div class="space-y-6 text-neutral-400 text-lg leading-relaxed">
          <p>
            Explore the intricate details of vintage steam locomotives, the engineering marvels that once dominated the global transportation landscape.
            From the massive 4-8-4 wheel configurations to the high-pressure boilers, every component tells a story of industrial innovation.
          </p>
          <p>
            This interactive experience allows you to dive deep into the technical specifications and historical significance of various parts of the train.
            Click on the hotspots on the map to learn more about the mechanics, maintenance, and scenic routes of these majestic machines.
          </p>
        </div>

        <div class="pt-4 flex flex-wrap gap-4">
          <div class="flex flex-col">
            <span class="text-white font-bold text-2xl">4-8-4</span>
            <span class="text-neutral-500 text-sm uppercase tracking-wider">Wheel Config</span>
          </div>
          <div class="w-px h-10 bg-neutral-800 hidden sm:block"></div>
          <div class="flex flex-col">
            <span class="text-white font-bold text-2xl">260 PSI</span>
            <span class="text-neutral-500 text-sm uppercase tracking-wider">Boiler Pressure</span>
          </div>
          <div class="w-px h-10 bg-neutral-800 hidden sm:block"></div>
          <div class="flex flex-col">
            <span class="text-white font-bold text-2xl">100+ MPH</span>
            <span class="text-neutral-500 text-sm uppercase tracking-wider">Top Speed</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column: Map (1/3) -->
    <div data-testid="map-panel" class="w-full md:w-1/3 h-1/2 md:h-full relative border-t md:border-t-0 md:border-l border-neutral-800">
      <MapContainer />
    </div>
  </div>
</template>
