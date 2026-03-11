<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import type { Hotspot } from '../../types/MapTypes'
import mapDataJson from '../../data/mapData.json'
import HotspotMarker from './HotspotMarker.vue'
import Modal from '../Shared/Modal.vue'
import ContentRenderer from '../Shared/ContentRenderer.vue'
import isometric from '../../assets/isometric.png'

const mapData = mapDataJson.hotspots as Hotspot[]

const containerRef = ref<HTMLDivElement | null>(null)
const imageRef = ref<HTMLImageElement | null>(null)
const scale = ref(0.8)
const position = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const selectedHotspot = ref<Hotspot | null>(null)

// Natural image dimensions
const IMAGE_WIDTH = 1600
const IMAGE_HEIGHT = 900

const minScale = ref(0.4)
const maxScale = 2.5

const calculateDynamicBoundaries = () => {
  if (!containerRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()

  // Calculate minimum scale to ensure image always fills container
  const scaleX = containerRect.width / IMAGE_WIDTH
  const scaleY = containerRect.height / IMAGE_HEIGHT
  minScale.value = Math.max(scaleX, scaleY)

  // Ensure current scale is not below minScale
  if (scale.value < minScale.value) {
    scale.value = minScale.value
  }

  // Re-clamp position
  position.value = calculateClampedTranslation(position.value.x, position.value.y, scale.value)
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  const zoomSpeed = 0.001
  const delta = -e.deltaY
  const newScale = Math.min(Math.max(scale.value + delta * zoomSpeed, minScale.value), maxScale)

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

  const containerRect = containerRef.value.getBoundingClientRect()
  const scaledWidth = IMAGE_WIDTH * currentScale
  const scaledHeight = IMAGE_HEIGHT * currentScale

  // Horizontal clamping
  let clampedX = x
  if (scaledWidth <= containerRect.width) {
    clampedX = (containerRect.width - scaledWidth) / 2
  } else {
    clampedX = Math.min(0, Math.max(containerRect.width - scaledWidth, x))
  }

  // Vertical clamping
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

  // Initial calculation
  nextTick(() => {
    calculateDynamicBoundaries()
    // Center map
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
        :src=isometric
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
