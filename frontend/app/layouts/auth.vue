<template>
  <div class="bg-white">
    <div class="hidden md:flex h-screen overflow-hidden ">
      <div class="flex z-1 min-w-90 xl:min-w-130 justify-center items-center bg-white rounded-r-xl relative">
        <slot />
      </div>
      <div class="size-full">
        <NuxtImg :src="banner" class="object-cover size-full" format="webp" quality="100" alt="banner" />
      </div>
    </div>
    <div class="flex md:hidden justify-center items-center h-screen">
      <div class="flex w-full h-full justify-center items-center relative">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { banner } from '~/constants/logos';
</script>
