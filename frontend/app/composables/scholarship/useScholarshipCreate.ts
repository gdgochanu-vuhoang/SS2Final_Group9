import type { Enums, Tables } from '~/types/database.types'

type FormPayload = {
  title: string
  award?: string
  tier: Enums<'scholarship_tier'>
  deadline: string
  description?: string
  banner_img: File | null
}

export const useScholarshipCreate = async () => {
  const toast = useToast()
  const supabase = useSupabaseClient()
  const isLoading = ref<boolean>(false)

  const createScholarship = async (payload: FormPayload) => {
    isLoading.value = true

    const { banner_img, ...scholarshipData } = payload

    const { data: curUser } = useNuxtData<Tables<'profiles'>>('user-detail')
    const { ingest } = useChatbot()

    let bannerUrl: string | undefined

    if (payload.banner_img) {
      const fileExt = payload.banner_img.name.split('.').pop()
      const filePath = `scholarships/${curUser.value!.id}/banner-${curUser.value!.id}-${scholarshipData.tier}-${scholarshipData.title}.${fileExt}`

      const { error } = await supabase
        .storage
        .from('public_images')
        .upload(filePath, payload.banner_img, {
          upsert: true,
        })
      if (error) {
        toast.add({
          title: 'Update Banner Failure',
          description: error.message,
          color: 'error',
        })
        return
      }
      const { data } = supabase
        .storage
        .from('public_images')
        .getPublicUrl(filePath)

      bannerUrl = `${data.publicUrl}?t=${Date.now()}`
    }

    const { error } = await supabase
      .from('scholarships')
      .insert({
        ...scholarshipData,
        ...(bannerUrl && { banner_url: bannerUrl }),
      })

    if (error) {
      isLoading.value = false
      toast.add({
        title: 'Error Creating Scholarship!',
        description: error.message,
        color: 'error',
      })
      return
    }

    await ingest({
      title: `Scholarship: ${scholarshipData.title}, ${scholarshipData.tier}`,
      content: `There is a new ${scholarshipData.tier} tier scholarship called "${scholarshipData.title}". The award is ${scholarshipData.award || 'variable'}. The deadline to apply is ${scholarshipData.deadline}. Description: ${scholarshipData.description || 'No description provided.'}`,
    })

    isLoading.value = false
    clearNuxtData('scholarship-list')
    clearNuxtData(`scholarship-list-${curUser.value!.id}`)
    const curPage = useState('scholarship-list-page')
    curPage.value = { all: 2, filtered: 1, total: 0 }
    toast.add({
      title: 'Scholarship Created!',
      color: 'success',
    })
    return navigateTo(`/dashboard/admin/manage-scholarships`)
  }
  return { createScholarship, isLoading }
}
