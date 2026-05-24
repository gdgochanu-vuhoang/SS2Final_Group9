import type { Enums, Tables } from '~/types/database.types'
import { TABLE_LIMIT } from '~/constants/scholarship'

export const useScholarshipList = async (id?: string, role?: Enums<'profile_role'>) => {

  const toast = useToast()
  const supabase = useSupabaseClient()

  const scholarshipListKey = computed(() => {
    return `scholarship-list`
  })

  const { data: filteredData } = useNuxtData(`scholarship-list-${id}`)

  const handleError = (error: string) => {
    toast.add({
      title: 'Error Fetching List!',
      description: error,
      color: 'error',
    })
    return { data: ref(null) }
  }

  const listAll = async (page: number) => {
    const from = (page - 1) * TABLE_LIMIT
    const to = from + TABLE_LIMIT - 1
    const { data, error } = await supabase
      .from('scholarship_list_view')
      .select('*')
      .range(from, to)
    if (error) handleError(error.message)
    return data
  }

  const listById = async () => {
    if (!id || !role) return
    console.log(id)
    const reqColumn = 'organizers'
    const { data, error } = await supabase
      .from('scholarship_list_view')
      .select('*')
      .contains(reqColumn, JSON.stringify([{ id: id }]))
    if (error) handleError(error.message)
    filteredData.value = data
    return { data }
  }

  const filterByTier = (scholarships: Tables<'scholarships'>[], tier: Enums<'scholarship_tier'>) => {
    return scholarships.filter(s => tier.includes(s.tier))
  }

  const { data, error } = await useAsyncData(
    scholarshipListKey,
    async () => {
      return listAll(1)
    },
  )
  if (error.value) handleError(error.value.message)

  return { data, filterByTier, filteredData, listById }
}
