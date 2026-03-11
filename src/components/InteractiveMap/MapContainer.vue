<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Hotspot } from '../../types/MapTypes'
import mapDataJson from '../../data/mapData.json'
import HotspotMarker from './HotspotMarker.vue'
import Modal from '../Shared/Modal.vue'
import ContentRenderer from '../Shared/ContentRenderer.vue'

const mapData = mapDataJson.hotspots as Hotspot[]

const containerRef = ref<HTMLDivElement | null>(null)
const scale = ref(0.8)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const selectedHotspot = ref<Hotspot | null>(null)

// Natural image dimensions
const IMAGE_WIDTH = 1600
const IMAGE_HEIGHT = 900

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  const zoomSpeed = 0.001
  const delta = -e.deltaY
  const newScale = Math.min(Math.max(scale.value + delta * zoomSpeed, 0.4), 2.5)

  // Re-clamp position with new scale
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

  const container = containerRef.value.getBoundingClientRect()
  const scaledWidth = IMAGE_WIDTH * currentScale
  const scaledHeight = IMAGE_HEIGHT * currentScale

  // Horizontal clamping
  let clampedX = x
  if (scaledWidth <= container.width) {
    clampedX = (container.width - scaledWidth) / 2
  } else {
    clampedX = Math.min(0, Math.max(container.width - scaledWidth, x))
  }

  // Vertical clamping
  let clampedY = y
  if (scaledHeight <= container.height) {
    clampedY = (container.height - scaledHeight) / 2
  } else {
    clampedY = Math.min(0, Math.max(container.height - scaledHeight, y))
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

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseup', handleMouseUp)

  // Center map on mount
  setTimeout(() => {
    position.value = calculateClampedTranslation(0, 0, scale.value)
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative w-full h-full overflow-hidden bg-black cursor-grab active:cursor-grabbing select-none"
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
        src="https://images.wallpaperscraft.com/image/single/train_railway_forest_169685_1600x900.jpg"
        alt="Map Background"
        class="w-full h-full object-cover pointer-events-none select-none"
        draggable="false"
      />

      <HotspotMarker
        v-for="hotspot in mapData"
        :key="hotspot.id"
        :hotspot="hotspot"
        :scale="scale"
        @click="openHotspot(hotspot)"
      />
    </div>

    <Modal
      v-if="selectedHotspot"
      :is-open="!!selectedHotspot"
      @close="selectedHotspot = null"
    >
      <ContentRenderer :content="selectedHotspot.content" />
    </Modal>
  </div>
</template>
