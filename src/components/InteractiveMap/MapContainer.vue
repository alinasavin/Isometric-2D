<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Hotspot } from '../../types/Hotspot'
import hotspotsData from '../../data/hotspots.json'
import HotspotMarker from './HotspotMarker.vue'
import HotspotDetailModal from './HotspotDetailModal.vue'
import isometric from '../../assets/isometric.png'

const mapData = hotspotsData.hotspots as Hotspot[]

const containerRef = ref<HTMLDivElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const scale = ref(0.8)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const selectedHotspot = ref<Hotspot | null>(null)
const showLabels = ref(true)

// Natural image dimensions
const IMAGE_WIDTH = 1600
const IMAGE_HEIGHT = 900

const minScale = ref(0.4)
const maxScale = 2.5

const calculateDynamicBoundaries = () => {
  if (!containerRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()

  const scaleX = containerRect.width / IMAGE_WIDTH
  const scaleY = containerRect.height / IMAGE_HEIGHT
  minScale.value = Math.max(scaleX, scaleY)

  if (scale.value < minScale.value) {
    scale.value = minScale.value
  }

  position.value = calculateClampedTranslation(position.value.x, position.value.y, scale.value)
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  const zoomSpeed = 0.001
  const delta = -e.deltaY
  const newScale = Math.min(Math.max(scale.value + delta * zoomSpeed, minScale.value), maxScale)

  position.value = calculateClampedTranslation(position.value.x, position.value.y, newScale)
  scale.value = newScale
}

const handleMouseDown = (e: MouseEvent) => {
  if (selectedHotspot.value) return
  isDragging.value = true
  dragStart.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y
  }
}

const calculateClampedTranslation = (
  x: number,
  y: number,
  currentScale: number
) => {
  if (!containerRef.value) return { x, y }

  const containerRect = containerRef.value.getBoundingClientRect()
  const scaledWidth = IMAGE_WIDTH * currentScale
  const scaledHeight = IMAGE_HEIGHT * currentScale

  let clampedX = x
  if (scaledWidth <= containerRect.width) {
    clampedX = (containerRect.width - scaledWidth) / 2
  } else {
    clampedX = Math.min(0, Math.max(containerRect.width - scaledWidth, x))
  }

  let clampedY = y
  if (scaledHeight <= containerRect.height) {
    clampedY = (containerRect.height - scaledHeight) / 2
  } else {
    clampedY = Math.min(0, Math.max(containerRect.height - scaledHeight, y))
  }

  return { x: clampedX, y: clampedY }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return

  const newX = e.clientX - dragStart.value.x
  const newY = e.clientY - dragStart.value.y

  position.value = calculateClampedTranslation(newX, newY, scale.value)
}

const handleMouseUp = () => {
  isDragging.value = false
}

const openHotspot = (hotspot: Hotspot) => {
  selectedHotspot.value = hotspot
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedHotspot.value) {
    selectedHotspot.value = null
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('keydown', handleKeyDown)

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      calculateDynamicBoundaries()
    })
    resizeObserver.observe(containerRef.value)
  }

  nextTick(() => {
    calculateDynamicBoundaries()
    position.value = calculateClampedTranslation(0, 0, scale.value)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('keydown', handleKeyDown)
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden bg-brand-light-grey cursor-grab active:cursor-grabbing select-none"
    @wheel="handleWheel"
    @mousedown="handleMouseDown"
  >
    <div
      class="relative transition-transform duration-75 ease-out"
      :style="{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transformOrigin: '0 0',
        width: `${IMAGE_WIDTH}px`,
        height: `${IMAGE_HEIGHT}px`,
        willChange: 'transform'
      }"
    >
      <img
        ref="imageRef"
        :src="isometric"
        alt="Map Background"
        class="w-full h-full object-cover pointer-events-none select-none"
        draggable="false"
        @load="calculateDynamicBoundaries"
      />

      <HotspotMarker
        v-for="hotspot in mapData"
        :key="hotspot.id"
        :hotspot="hotspot"
        :scale="scale"
        :show-label="showLabels"
        @click="openHotspot(hotspot)"
      />
    </div>

    <!-- Label Toggle -->
    <div class="absolute bottom-8 right-8 bg-white/90 backdrop-blur rounded-lg shadow-lg p-3 flex items-center gap-3 z-30">
      <span class="text-[#192D38] text-sm font-semibold">Hide labels</span>
      <button
        @click="showLabels = !showLabels"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
        :class="showLabels ? 'bg-brand-green' : 'bg-gray-300'"
      >
        <span
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          :class="showLabels ? 'translate-x-6' : 'translate-x-1'"
        />
      </button>
    </div>

    <HotspotDetailModal
      v-if="selectedHotspot"
      :hotspot="selectedHotspot"
      @close="selectedHotspot = null"
    />
  </div>
</template>
