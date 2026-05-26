import type { Enums } from '~/types/database.types'
import { TABLE_LIMIT } from '~/constants/scholarship'

export const useScholarshipList = async (id?: string, role?: Enums<'profile_role'>) => {
  const toast = useToast()
  const supabase = useSupabaseClient()

  const isLoading = ref<boolean>(false)
  const isFiltering = ref<boolean>(false)

  const { data: all } = useNuxtData('scholarship-list')
  const { data: own } = useNuxtData(`scholarship-list-${id}`)

  const curPage = useState<{ all: number, filtered: number, total: number }>('scholarship-list-page', () => ({ all: 2, filtered: 1, total: 0 }))

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
    let query = supabase
      .from('scholarship_list_view')
      .select('id', { count: 'exact', head: true })

    if (isFiltering.value && id && role) {
      const reqColumn = 'organizers'
      query = query.contains(reqColumn, JSON.stringify([{ id: id }]))
    }

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
    const filteredCount = (curPage.value.filtered - 1) * TABLE_LIMIT
    return { all: allCount < curPage.value.total, own: filteredCount < curPage.value.total }
  })

  const fetchPage = async () => {
    console.log(`fetching ${isFiltering.value ? 'filtered' : 'all'} count...`)
    isLoading.value = true
    const from = (curPage.value[isFiltering.value ? 'filtered' : 'all'] - 1) * TABLE_LIMIT
    const to = from + TABLE_LIMIT - 1
    let query = supabase
      .from('scholarship_list_view')
      .select('*')
      .range(from, to)
      .order('created_at', { ascending: false })

    if (isFiltering.value && id && role) {
      const reqColumn = 'organizers'
      query = query.contains(reqColumn, JSON.stringify([{ id: id }]))
    }

    console.log(`fetching from ${from} to ${to}...`)

    const { data, error } = await query
    isLoading.value = false
    if (error) {
      handleError(error.message)
      return
    }

    if (isFiltering.value) {
      own.value = [...(own.value || []), ...(data || [])]
      curPage.value.filtered += 1
    }
    else {
      all.value = [...(all.value || []), ...(data || [])]
      curPage.value.all += 1
    }
    return data
  }
  
  const { data, error } = await useAsyncData(
    'scholarship-list',
    async () => {
      await fetchCount()
      const { data } = await supabase
        .from('scholarship_list_view')
        .select('*')
        .range(0, TABLE_LIMIT - 1)
        .order('created_at', { ascending: false })
      return data
    },
    {
      getCachedData: (key) => {
        const { data } = useNuxtData(key)
        return data.value ?? undefined
      }
    }
  )
  if (error.value) handleError(error.value.message)

  return { isLoading, isFiltering, all, own, curPage, canLoadMore, fetchPage, fetchCount }
}
