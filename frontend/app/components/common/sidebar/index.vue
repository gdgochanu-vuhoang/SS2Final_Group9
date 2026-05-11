<template>
  <div>
    <div :class="['h-screen transition-all', sidebarOpen ? 'w-50' : 'w-20']" />
    <div :class="['fixed h-screen top-0 left-0 p-2 transition-all z-98', sidebarOpen ? 'w-50' : 'w-20']">
      <div class="size-full bg-info-300 flex flex-col gap-6 rounded-lg items-center shadow-xl overflow-hidden">
        <div class="w-full px-4">
          <NuxtImg
            :src="icon"
            format="webp"
            quality="70"
            class="rounded-lg w-full max-w-30 mt-4 mx-auto"
            preload
          />
        </div>
        <div class="flex flex-col gap-2 w-full px-4">
          <div
            v-for="(section, id) in authorizedSidebarOptions"
            :key="id"
            class="w-full"
          >
            <UButton
              :leading-icon="section.icon"
              variant="ghost"
              color="info"
              class="w-full cursor-pointer text-white hover:bg-info-400 py-2"
              :to="section.path"
              active-class="bg-info"
            >
              <p class="text-wrap overflow-hidden transition-all font-bold">
                {{ sidebarOpen ? section.name : '' }}
              </p>
            </UButton>
          </div>
        </div>
        <div
          class="mt-auto mb-2 bg-red-500 w-full cursor-pointer"
        >
          <div v-if="sidebarOpen" class="relative group flex items-center justify-center">
            <div class="size-12 z-2 rounded-full animate-scoped-gradient bg-gradient-to-r from-info-400 via-purple-400 to-info-500 bg-[length:300%_100%] p-2 shadow-xl transition-transform duration-400 ease-out group-hover:-translate-x-[80%]">
              <UIcon
                name="i-heroicons-sparkles-solid"
                class="size-full"
              />
            </div>
            <div class="absolute bg-info-500 ring-2 ring-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out group-hover:translate-x-[10%]">
              <p class="text-white p-1 pl-6">
                Assistant
              </p>
            </div>
          </div>
          <div v-else class="mx-auto size-12 z-2 rounded-full animate-scoped-gradient bg-gradient-to-r from-info-400 via-purple-400 to-info-500 bg-[length:300%_100%] p-2 shadow-xl">
            <UIcon
              name="i-heroicons-sparkles-solid"
              class="size-full"
            />
          </div>
        </div>
      </div>
      <div
        class="group absolute h-full w-2 py-2 right-0 top-0 cursor-pointer"
        @click="toggleSidebarOpen"
      >
        <div class="group-hover:bg-gray-300 h-full w-1/2 ml-auto rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { icon } from '~/constants/logos'

const { sidebarOpen, toggleSidebarOpen, authorizedSidebarOptions } = useSidebar()
</script>

<style scoped>
.animate-scoped-gradient {
  background-size: 300% 100%;
  animation: gradientMove 8s linear infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
