<template>
    <div class="relative flex justify-center mb-10">
        <NuxtImg
v-if="banner" preload format="webp" :src="banner"
            class="rounded-lg shadow-xl object-cover h-100 w-full" />
        <div v-else class="h-20" />
        <div class="absolute -bottom-10 rounded-lg shadow-xl bg-white px-8 md:px-16 py-8">
            <h1 class="text-info text-2xl md:text-4xl font-bold">{{ title }}</h1>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { Tables } from '~/types/database.types';


defineProps<{
    banner?: Tables<"scholarships">['banner_url']
    title?: Tables<"scholarships">['title']
}>()
</script>