<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-to-class="opacity-0"
  >
    <div v-if="chatOpen" class="absolute w-140 pl-4">
      <div class="animate-scoped-gradient bg-gradient-to-r from-info-400 via-purple-400 to-info-500 bg-[length:300%_100%] rounded-lg w-full relative px-2 flex flex-col ring-4 ring-purple-600">
        <div class="absolute bottom-2 -left-2 size-4 bg-purple-600 rotate-45 rounded-sm -z-1" />
        <div class="h-12 flex items-center">
          <p class="font-bold text-white text-xl">
            Hub Assistant
          </p>
          <UButton
            icon="i-heroicons-x-mark-solid"
            color="info"
            variant="solid"
            class="ml-auto cursor-pointer bg-white hover:bg-neutral-200"
            :ui="{ base: 'p-0', leadingIcon: 'bg-purple-600 size-8' }"
            @click="() => {}"
          />
        </div>
        <div class="bg-white w-full h-80 rounded-lg p-2">
          helooo
        </div>
        <div class=" flex h-14 items-center gap-4">
          <input
            type="text"
            placeholder="Enter your message..."
            class="w-full bg-white rounded-lg p-2"
          >
          <UButton
            icon="i-heroicons-paper-airplane-solid"
            color="info"
            variant="solid"
            class="ml-auto cursor-pointer bg-white hover:bg-neutral-200 size-10"
            :ui="{ base: 'p-0', leadingIcon: 'bg-purple-600 mx-auto size-8' }"
            @click="() => {}"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { chatOpen } = useChatbot()
</script>

<style scoped>
.animate-scoped-gradient {
  background-size: 300% 100%;
  animation: gradientMove 12s linear infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
