export const useFetchProfileList = async () => {
  const toast = useToast()
  const supabase = useSupabaseClient()

  const profileDetailKey = computed(() => {
    return `profile-list`
  })

  const { data, error } = await useAsyncData(
    profileDetailKey,
    async () => {
      const { data, count } = await supabase
        .from('students')
        .select('uid, full_name, student_id, university, major, class', {count: 'exact'})
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
