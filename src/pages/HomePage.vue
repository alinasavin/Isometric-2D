<script setup lang="ts">
import MapContainer from '../components/InteractiveMap/MapContainer.vue'
import Brilliance from '../components/Shared/Brilliance.vue'
</script>

<template>
  <div class="w-screen h-screen bg-background overflow-hidden relative">
    <Brilliance />
    <MapContainer />
  </div>
</template>
