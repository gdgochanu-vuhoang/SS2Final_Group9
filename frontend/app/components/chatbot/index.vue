<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="chatOpen"
      class="absolute w-140 pl-4"
    >
      <div class="animate-gradient bg-gradient-to-r from-info-400 via-purple-400 to-info-500 bg-[length:300%_100%] rounded-lg w-full relative px-2 flex flex-col ring-4 ring-purple-600">
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
            @click="() => { chatOpen = false }"
          />
        </div>
        <div
          ref="messagesContainer"
          class="bg-white w-full h-80 rounded-lg py-2 px-4 overflow-y-auto flex flex-col gap-4"
        >
          <ChatbotMessageBlock
            v-for="message in messages"
            :key="message.id"
            :message="message"
          />
          <ChatbotReplyingBlock v-if="isLoading" />
        </div>
        <div class=" flex h-14 items-center gap-4">
          <input
            v-model="curMessage"
            type="text"
            placeholder="Enter your message..."
            class="w-full bg-white rounded-lg p-2"
            @keydown.enter="handleAddMessage"
          >
          <UButton
            icon="i-heroicons-paper-airplane-solid"
            color="info"
            variant="solid"
            class="ml-auto cursor-pointer bg-white hover:bg-neutral-200 size-10"
            :ui="{ base: 'p-0', leadingIcon: 'bg-purple-600 mx-auto size-8' }"
            :loading="isLoading"
            @click="handleAddMessage"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const { isLoading, chatOpen, messages, sendMessage } = useChatbot()

const curMessage = ref<string>('')

const messagesContainer = ref<HTMLElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()

  if (messagesContainer.value) {
    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth',
    })
  }
}

const handleAddMessage = async () => {
  if (!chatOpen || !curMessage.value || isLoading.value) return
  const query = curMessage.value.trim()
  curMessage.value = ''
  await scrollToBottom()
  await sendMessage(query)
  await scrollToBottom()
}
</script>

<style scoped>
.animate-gradient {
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
