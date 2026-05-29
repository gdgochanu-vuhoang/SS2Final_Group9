import { TABLE_LIMIT } from '~/constants/scholarship'

export const useStudentList = async () => {
  const toast = useToast()
  const supabase = useSupabaseClient()

  const isLoading = ref<boolean>(false)
  const curPage = useState<{ all: number, total: number }>('student-list-page', () => ({ all: 2, total: 0 }))

  const { data: all } = useNuxtData('student-list')

  const handleError = (error: string) => {
    toast.add({
      title: 'Error Fetching List!',
      description: error,
      color: 'error',
    })
    return { data: ref(null) }
  }

  const fetchCount = async () => {
    isLoading.value = true
    const query = supabase
      .from('student_list_view')
      .select('id', { count: 'exact', head: true })

    const { count, error } = await query
    isLoading.value = false
    if (error) {
      handleError(error.message)
      return 0
    }
    curPage.value.total = count ?? 0
    return count ?? 0
  }

  const canLoadMore = computed(() => {
    const allCount = (curPage.value.all - 1) * TABLE_LIMIT
    return allCount < curPage.value.total
  })

  const fetchPage = async () => {
    isLoading.value = true
    const from = (curPage.value.all - 1) * TABLE_LIMIT
    const to = from + TABLE_LIMIT - 1
    const query = supabase
      .from('student_list_view')
      .select('*')
      .range(from, to)
      .order('created_at', { ascending: false })

    const { data, error } = await query
    isLoading.value = false
    if (error) {
      handleError(error.message)
      return
    }

    all.value = [...(all.value || []), ...(data || [])]
    curPage.value.all += 1

    return data
  }

  const { error } = await useAsyncData(
    'student-list',
    async () => {
      await fetchCount()
      const { data } = await supabase
        .from('student_list_view')
        .select('*')
        .range(0, TABLE_LIMIT - 1)
        .order('created_at', { ascending: false })
      return data
    },
    {
      getCachedData: (key) => {
        const { data } = useNuxtData(key)
        return data.value ?? undefined
      },
    },
  )
  if (error.value) handleError(error.value.message)

  return { all, canLoadMore, fetchPage, isLoading, curPage }
}
