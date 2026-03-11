<template>
  <div class="fixed left-0 top-0 bottom-0 w-[15vw] min-w-[120px] pointer-events-none z-30">
    <div class="relative w-full h-full">
      <div
        v-for="i in 10"
        :key="i"
        class="absolute left-0 top-0 bottom-0 bg-primary"
        :style="{
          width: `${110 - i * 10}%`,
          opacity: (11 - i) * 0.1,
          zIndex: i - 1
        }"
      ></div>
    </div>
  </div>
</template>
