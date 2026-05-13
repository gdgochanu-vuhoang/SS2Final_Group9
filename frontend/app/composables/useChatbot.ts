import type { ChatMessage } from '~/types/chatbot'

export const useChatbot = () => {
  const toast = useToast()

  const isLoading = ref<boolean>(false)
  const chatOpen = useState<boolean>('chatbot-open', () => false)

  const toggleChat = useThrottleFn(() => {
    chatOpen.value = !chatOpen.value
  }, 700)

  const messages = useState<ChatMessage[]>('chatbot-messages', () => [
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: 'Hi there! I am your personal assistant for ScholarHub. How can I help?',
    },
  ])

  const addMessage = (msg: Omit<ChatMessage, 'id'>) => {
    messages.value.push({
      ...msg,
      id: crypto.randomUUID(),
    })
  }

  const sendMessage = async (message: string) => {
    isLoading.value = true

    try {
      addMessage({
        role: 'user',
        content: message,
      })
      const response = await $fetch('/api/gemini/chat', {
        method: 'POST',
        body: { message: message },
      })

      addMessage({
        role: 'assistant',
        content: response.content,
      })
    }
    catch (error) {
      addMessage({ role: 'assistant', content: 'Connection error.' })
    }
    finally {
      isLoading.value = false
    }
  }

  const ingest = async (form: { title: string, content: string, url: string }) => {
    isLoading.value = true
    try {
      await $fetch('/api/gemini/ingest', {
        method: 'POST',
        body: {
          title: form.title,
          content: form.content,
          url: form.url,
        },
      })
      toast.add({
        title: 'Successful Ingestion',
        description: 'Knowledge database updated!',
        color: 'success',
      })
    }
    catch (error) {
      toast.add({
        title: 'Error Ingesting Knowledge',
        description: 'Please try again later!',
        color: 'error',
      })
    }
    finally {
      isLoading.value = false
    }
  }

  return { isLoading, chatOpen, toggleChat, messages, sendMessage, ingest }
}
