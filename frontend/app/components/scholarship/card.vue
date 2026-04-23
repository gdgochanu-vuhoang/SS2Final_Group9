<template>
    <NuxtLink
        :to="`/dashboard/scholarships/${scholarship.id}`"
        class="w-full bg-gray-100 rounded-lg ring-info hover:ring-2 hover:shadow-xl hover:scale-102 transition h-50 py-2 px-4 flex items-center gap-8">
        <NuxtImg v-if="scholarship.icon_url" :src="scholarship.icon_url" class="size-30 rounded-lg shrink-0" />
        <div>
            <p class="text-dimmed">{{ scholarship.deadline }}</p>
            <h2 class="text-2xl text-info font-bold">{{ scholarship.title }}</h2>
            <p class="line-clamp-2">{{ scholarship.description }}</p>
            <UAvatarGroup class="mt-2">
                <UAvatar src="https://upload.wikimedia.org/wikipedia/commons/c/c2/Hanu_logo.jpg" />
                <UAvatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2d6LXZgvLrFIkRZSs0dO-Krhv9ygyRAnUtg&s" />
                <UAvatar src="https://github.com/noook.png" />
            </UAvatarGroup>
        </div>
    </NuxtLink>
</template>
<script lang="ts" setup>
import type { Tables } from '~/types/database.types';

defineProps<{ scholarship: Tables<"scholarships"> }>()
</script>