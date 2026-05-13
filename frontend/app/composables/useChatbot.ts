export const useChatbot = () => {
  const isLoading = ref<boolean>(false)
  const chatOpen = useState<boolean>('chatbot-open', () => false)

  const toggleChat = useThrottleFn(() => {
    chatOpen.value = !chatOpen.value
  }, 700)

  return { isLoading, chatOpen, toggleChat }
}
