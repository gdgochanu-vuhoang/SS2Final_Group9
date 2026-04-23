<template>
    <div>
        <div :class="['h-screen transition-all', sidebarOpen ? 'w-50' : 'w-20']" />
        <div :class="['fixed h-screen top-0 left-0 p-2 transition-all z-98', sidebarOpen ? 'w-50' : 'w-20']">
            <div class="size-full bg-info-300 flex flex-col gap-6 rounded-lg items-center shadow-xl overflow-hidden">
                <div class="w-full px-4">
                    <NuxtImg :src="icon" format="webp" quality="70" class="rounded-lg w-full max-w-30 mt-4 mx-auto" preload />
                </div>
                <div class="flex flex-col gap-2 w-full px-4">
                    <div v-for="(section, id) in authorizedSidebarOptions" :key="id" class="w-full">
                        <UButton
:leading-icon="section.icon" variant="ghost" color="info"
                            class="w-full cursor-pointer text-white hover:bg-info-400 py-2" :to="section.path"
                            active-class="bg-info">
                            <p class="text-wrap overflow-hidden transition-all font-bold">{{sidebarOpen ? section.name : ''}}</p>
                        </UButton>
                    </div>
                </div>
            </div>
            <div
class="group absolute h-full w-2 py-2 right-0 top-0 cursor-pointer"
                @click="toggleSidebarOpen">
                <div class="group-hover:bg-gray-300 h-full w-1/2 ml-auto rounded-lg" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { icon } from '~/constants/logos';

const { sidebarOpen, toggleSidebarOpen, authorizedSidebarOptions } = useSidebar()

</script>