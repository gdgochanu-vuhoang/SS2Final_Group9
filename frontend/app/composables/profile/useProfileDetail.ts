export const useProfileDetail = async (id?: string) => {
  const toast = useToast()
  if (!id) {
    toast.add({
      title: 'Invalid Params!',
      description: 'Missing/Incorrect ID Params.',
      color: 'error',
    })
    return { data: ref(null) }
  }
  const supabase = useSupabaseClient()

  const profileDetailKey = computed(() => {
    return `profile-detail-${id}`
  })

  const { data, error } = await useAsyncData(
    profileDetailKey,
    async () => {
      const { data } = await supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single()
      return data
    },
  )
  if (error.value) {
    toast.add({
      title: 'Error Fetching Detail!',
      color: 'error',
    })
    return { data: ref(null) }
  }

  return { data }
}
