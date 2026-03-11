<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="scale-95 opacity-0 translate-y-8"
        enter-to-class="scale-100 opacity-100 translate-y-0"
      >
        <div class="bg-brand-dark-grey/80 backdrop-blur-md border border-white/10 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden relative">
          <!-- Close Button -->
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 text-secondary hover:text-white transition-colors z-10 p-2"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="h-full max-h-[90vh] overflow-y-auto custom-scrollbar">
            <slot />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
