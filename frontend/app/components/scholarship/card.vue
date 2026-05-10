<template>
  <NuxtLink
    :to="`/dashboard/scholarships/${scholarship.id}`"
    class="w-full bg-gray-100 rounded-lg ring-info hover:ring-2 hover:shadow-xl hover:scale-102 transition h-50 py-2 px-4 flex items-center gap-8"
  >
    <NuxtImg
      v-if="scholarship.icon_url"
      :src="scholarship.icon_url"
      class="size-30 rounded-lg shrink-0"
    />
    <div>
      <div class="flex gap-2">
        <ScholarshipTierBadge :tier="scholarship.tier ?? 'venue'" />
        <p class="text-dimmed">{{ scholarship.deadline }}</p>
      </div>
      <h2 class="text-2xl text-info font-bold">{{ scholarship.title }}</h2>
      <p class="line-clamp-2">{{ scholarship.description }}</p>
      <UAvatarGroup class="mt-2">
        <UTooltip
          v-for="organizer in scholarship.organizers"
          :key="organizer.id!"
          :label="organizer.username"
        >
          <UAvatar :src="organizer.avatar_url!" />
        </UTooltip>
      </UAvatarGroup>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Tables } from '~/types/database.types'

defineProps<{ scholarship: Tables<'scholarship_list_view'> }>()
</script>
