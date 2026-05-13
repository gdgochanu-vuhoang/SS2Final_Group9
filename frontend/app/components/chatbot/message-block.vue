<template>
  <div class="w-full grid grid-cols-4">
    <div
      v-if="message.role === 'assistant'"
      class="col-span-1"
    />
    <div
      class="w-max max-w-full h-max col-span-3 px-4 py-2 rounded-lg relative"
      :class="message.role === 'user' ? 'bg-info-300 text-black' : 'bg-purple-600 text-white ml-auto'"
    >
      <div
        class="absolute top-2 size-4 rotate-45 rounded-sm z-1"
        :class="message.role === 'user' ? 'bg-info-300 -left-2' : 'bg-purple-600 -right-2'"
      />
      <div
        class="prose prose-sm prose-purple max-w-none"
        v-html="renderMarkdown(message.content)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '~/types/chatbot'
import MarkdownIt from 'markdown-it'

defineProps<{
  message: ChatMessage
}>()

const md = new MarkdownIt()
const renderMarkdown = (content: string) => {
  return md.render(content)
}
</script>
