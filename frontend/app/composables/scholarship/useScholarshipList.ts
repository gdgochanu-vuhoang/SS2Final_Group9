import type { Enums, Tables } from '~/types/database.types'
import { TABLE_LIMIT } from '~/constants/scholarship'

export const useScholarshipList = async (id?: string, role?: Enums<'profile_role'>) => {
  const toast = useToast()
  const supabase = useSupabaseClient()

  const { data: all } = useNuxtData('scholarship-list')
  const { data: own } = useNuxtData(`scholarship-list-${id}`)

  const curPage = useState<{ all: number, filtered: number, total: number }>('scholarship-list-page', () => ({ all: 1, filtered: 1, total: 0 }))

  const handleError = (error: string) => {
    toast.add({
      title: 'Error Fetching List!',
      description: error,
      color: 'error',
    })
    return { data: ref(null) }
  }

  const fetchCount = async (filterById = false) => {
    let query = supabase
      .from('scholarship_list_view')
      .select('id', { count: 'exact', head: true })

    if (filterById && id && role) {
      const reqColumn = 'organizers'
      query = query.contains(reqColumn, JSON.stringify([{ id: id }]))
    }

    const { count, error } = await query
    if (error) {
      handleError(error.message)
      return 0
    }
    curPage.value.total = count ?? 0
    return count ?? 0
  }

  const canLoadMore = computed(() => {
    const currentCount = (curPage.value.all - 1) * TABLE_LIMIT
    return currentCount < curPage.value.total
  })

  const fetchPage = async (filterById = false) => {
    const from = (curPage.value[filterById ? 'filtered' : 'all'] - 1) * TABLE_LIMIT
    const to = from + TABLE_LIMIT - 1
    let query = supabase
      .from('scholarship_list_view')
      .select('*')
      .range(from, to)

    if (filterById && id && role) {
      const reqColumn = 'organizers'
      query = query.contains(reqColumn, JSON.stringify([{ id: id }]))
    }

    const { data, count, error } = await query
    if (error) {
      handleError(error.message)
      return
    }

    curPage.value.total = count ?? 0

    if (filterById) {
      own.value = [...(own.value || []), ...(data || [])]
      curPage.value.filtered += 1
    }
    else {
      if (curPage.value.all != 1) {
        all.value = [...(all.value || []), ...(data || [])]
      }
      curPage.value.all += 1
    }
    return data
  }

  const filterByTier = (scholarships: Tables<'scholarships'>[], tier: Enums<'scholarship_tier'>) => {
    return scholarships.filter(s => tier.includes(s.tier))
  }

  const { data, error } = await useAsyncData(
    'scholarship-list',
    async () => {
      return fetchPage()
    },
    {
      getCachedData: (key) => {
        const { data } = useNuxtData(key)
        return data.value ?? undefined
      }
    }
  )
  if (error.value) handleError(error.value.message)

  const {data: countData, error: countError} = await useAsyncData(
    'scholarship-list-count',
    async () => {
      return fetchCount()
    },
    {
      getCachedData: (key) => {
        const { data } = useNuxtData(key)
        return data.value ?? undefined
      }
    }
  )
  if (countError.value) handleError(countError.value.message)

  return { all, own, curPage, canLoadMore, fetchPage, filterByTier }
}
