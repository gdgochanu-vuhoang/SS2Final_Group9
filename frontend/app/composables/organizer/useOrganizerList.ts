export const useOrganizerList = async () => {
  const toast = useToast()
  const supabase = useSupabaseClient()

  const organizerListKey = computed(() => {
    return `organizer-list`
  })

  const { data, error } = await useAsyncData(
    organizerListKey,
    async () => {
      const { data, count } = await supabase
        .from('organizer_list_view')
        .select('*', { count: 'exact' })
      return { data, count }
    },
  )
  if (error.value) {
    toast.add({
      title: 'Error Fetching Detail!',
      color: 'error',
    })
    return { data: ref(null), count: ref(0) }
  }

  return { data }
}
