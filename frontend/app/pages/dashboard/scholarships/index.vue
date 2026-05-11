<template>
  <div class="flex flex-col gap-10">
    <div class="relative flex justify-center">
      <ScholarshipAnimatedBackground />
      <div class="absolute z-2 -bottom-8 rounded-lg shadow-xl flex bg-white">
        <UButton
          v-for="option in tierOptions"
          :key="option.label"
          class="w-36 md:w-48 h-16 justify-center md:text-lg cursor-pointer transition-all"
          :class="route.hash === option.hash && 'scale-110'"
          :variant="route.hash === option.hash ? 'solid' : 'ghost'"
          color="info"
          :label="option.label"
          @click="toggleTier(option.hash)"
        />
      </div>
    </div>
    <CommonPageSection
      v-if="scholarships?.length"
      inner-class="flex flex-col gap-8 px-6"
    >
      <ScholarshipCard
        v-for="scholarship in scholarships"
        :key="scholarship.id!"
        :scholarship="scholarship"
      />
    </CommonPageSection>
    <CommonPageEmpty v-else />
  </div>
</template>

<script setup lang="ts">
import { useScholarshipList } from '~/composables/scholarship/useScholarshipList'

const route = useRoute()
const router = useRouter()

const { data, filterByTier } = await useScholarshipList()

const scholarships = computed(() => {
  if (route.hash) return filterByTier(data.value, route.hash.replace('#', '').toUpperCase())
  return data.value
})

const tierOptions = ref([
  {
    label: 'Gold',
    hash: '#gold',
  },
  {
    label: 'Silver',
    hash: '#silver',
  },
  {
    label: 'Venue',
    hash: '#venue',
  },
])

const toggleTier = (tier: string) => {
  if (route.hash === tier) router.push({ hash: '' })
  else router.push({ hash: tier })
}
</script>
