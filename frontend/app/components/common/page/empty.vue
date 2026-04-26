<template>
  <CommonPageSection inner-class="flex flex-col justify-center items-center gap-6 py-10">
    <h2 class="text-3xl font-bold text-info">
      {{ title }}
    </h2>
    <p class="text-xl">
      {{ desc }}
    </p>
    <slot />
  </CommonPageSection>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  desc?: string
}>(), {
  title: 'Missing Data',
  desc: 'Please try again later!',
})
</script>
