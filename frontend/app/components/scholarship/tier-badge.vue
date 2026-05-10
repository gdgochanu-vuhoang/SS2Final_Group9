<template>
  <UBadge
    :label="badgeInfo.label"
    :color="badgeInfo.color"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  tier: string
}>()

const badgeInfo = computed(() => {
  if (props.tier === 'GOLD') return { label: 'Gold', color: 'warning' }
  if (props.tier === 'SILVER') return { label: 'Silver', color: 'neutral' }
  return { label: 'Venue', color: 'info' }
})
</script>
