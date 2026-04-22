<template>
    <Transition
enter-from-class="opacity-0" enter-active-class="transition-opacity duration-300 ease-out"
        enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300 ease-in"
        leave-to-class="opacity-0">
        <div v-if="isOpen" class="fixed inset-0 size-full z-50 flex justify-center items-center">
            <CommonPageSection
class="h-5/6 mt-10 z-51 w-100 md:ml-20 lg:w-150 xl:w-200"
                :title-icon="titleIcon" :title="title"
                :inner-class="`overflow-y-auto h-full ${innerClass ?? ''}`">
                <template #titleTrailing>
                    <UButton
icon="i-heroicons-x-mark-solid" color="info" variant="ghost" class="ml-auto cursor-pointer"
                        :ui="{ base: 'p-0', leadingIcon: 'bg-white size-10' }" @click="() => { isOpen = false }" />
                </template>
                <slot />
            </CommonPageSection>
            <div class="absolute bg-black/60 size-full inset-0 bg-black-60" @click="() => { isOpen = false }" />
        </div>
    </Transition>
</template>
<script setup lang="ts">
defineProps<{
    title?: string,
    titleIcon?: string,
    innerClass?: string
}>()

const isOpen = defineModel<boolean>('isOpen', { default: false })
</script>