<template>
  <div clas="w-full flex flex-row justify-center items-center border-t bg-info-500">
    <p
      class="text-3xl"
    >
      • • •
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  onClick: () => void
}>()
</script>
