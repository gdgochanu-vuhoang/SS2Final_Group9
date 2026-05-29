import type { Tables } from '~/types/database.types'

export const useScholarshipDelete = async () => {
  const toast = useToast()
  const supabase = useSupabaseClient()

  const { data: curUser } = useNuxtData<Tables<'profiles'>>('user-detail')
  const { data: all } = useNuxtData('scholarship-list')
  const { data: own } = useNuxtData(`scholarship-list-${curUser.value!.id}`)

  const isDeleting = ref<boolean>(false)

  const deleteScholarship = async (id: string) => {
    isDeleting.value = true
    const { error: deleteError } = await supabase
      .from('scholarships')
      .delete()
      .eq('id', id)

    const { error: knowledgeError } = await supabase
      .from('site_documentation')
      .delete()
      .eq('url', `/scholarships/${id}`)

    isDeleting.value = false
    if (deleteError || knowledgeError) {
      toast.add({
        title: 'Error Deleting Scholarship!',
        description: deleteError?.message || knowledgeError?.message,
        color: 'error',
      })
      return false
    }

    all.value = all.value?.filter((scholarship) => scholarship.id !== id) ?? null
    own.value = own.value?.filter((scholarship) => scholarship.id !== id) ?? null

    toast.add({
      title: 'Scholarship Deleted!',
      color: 'success',
    })
    return true
  }

  return { deleteScholarship, isDeleting }
}
