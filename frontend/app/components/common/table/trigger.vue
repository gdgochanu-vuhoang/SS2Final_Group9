<template>
  <div ref="el" clas="w-full flex flex-row justify-center items-center border-t bg-info-500">
    <p
      class="text-3xl"
    >
      • • •
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  onLoad: () => void
  canLoadMore: boolean
}>(), {
  onLoad: () => {}
})

const el = useTemplateRef('el')
const { reset } = useInfiniteScroll(el, 
() => {
  props.onLoad()
},
{
  distance: 10,
  canLoadMore: () => {
    return props.canLoadMore
  }
}
)
</script>
