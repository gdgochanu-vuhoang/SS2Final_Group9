import type { ChatMessage } from '~/types/chatbot'

export const useChatbot = () => {
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

  const testTest = async () => {
    console.log('is ingesting')
    await $fetch('/api/gemini/ingest', {
      method: 'POST',
      body: {
        title: 'How to upload a Banner',
        content: 'To upload a scholarship banner, go to the Admin Dashboard, click Manage Scholarships, and use the file uploader. Banners must be under 5MB.',
        url: '/dashboard/admin',
      },
    })
  }

  return { isLoading, chatOpen, toggleChat, messages, sendMessage }
}
