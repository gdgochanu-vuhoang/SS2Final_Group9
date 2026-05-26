<template>
  <div class="flex gap-4">
    <p>{{ label }}:</p>
    <div class="relative">
      <UButton
        v-for="option in options"
        :key="option.hash"
        class="absolute h-6 w-24 justify-center duration-200 transition-all"
        :class="route.hash === option.hash ? 'scale-120 translate-x-0' : 'translate-x-[120%] opacity-50'"
        :to="{ hash: option.hash }"
        :label="option.label"
        size="sm"
        @click="option.onclick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  options: {
    label: string
    hash?: string
    onclick?: () => void
  }[]
}>()

const route = useRoute()
</script>
