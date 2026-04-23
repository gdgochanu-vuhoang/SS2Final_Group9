<template>
  <div class="flex flex-col gap-10">
    <div class="relative flex justify-center">
      <ScholarshipAnimatedBackground />
      <div class="absolute z-2 -bottom-8 rounded-lg shadow-xl flex bg-white">
        <UButton v-for="option in tierOptions" :key="option.label"
          class="w-36 md:w-48 h-16 justify-center md:text-lg cursor-pointer"
          :variant="route.hash === option.label ? 'solid' : 'ghost'" color="info" :to="{
            hash: option.label
          }" :label="option.label" />
      </div>
    </div>
    <CommonPageSection v-if="scholarships?.length" inner-class="flex flex-col gap-8 px-6">
      <ScholarshipCard v-for="scholarship in scholarships" :key="scholarship.id!" :scholarship="scholarship" />
    </CommonPageSection>
    <CommonPageEmpty v-else />
  </div>
</template>

<script setup lang="ts">
import { useScholarshipList } from '~/composables/scholarship/useScholarshipList';

const route = useRoute()

const { data: scholarships } = await useScholarshipList()

const tierOptions = ref([
  {
    label: 'Gold',
    hash: '#gold'
  },
  {
    label: 'Silver',
    hash: '#silver'
  },
  {
    label: 'Venue',
    hash: '#venue'
  }
])
</script>
