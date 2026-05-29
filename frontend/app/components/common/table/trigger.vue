<template>
  <div
    ref="el"
    clas="w-full flex flex-row justify-center items-center border-t bg-info-500"
  >
    <p
      v-if="!isLoading && canLoadMore"
      class="text-3xl"
    >
      • • •
    </p>
    <NuxtIcon
      v-if="isLoading"
      name="i-heroicons-arrow-path"
      class="text-3xl animate-spin text-gray-500"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  onLoad: () => void
  canLoadMore: boolean
  isLoading: boolean
}>(), {
  onLoad: () => {},
})

const el = useTemplateRef('el')
const { reset } = useInfiniteScroll(el,
  props.onLoad,
  {
    distance: 10,
    canLoadMore: () => {
      return props.isLoading ? false : props.canLoadMore
    },
  },
)
</script>
