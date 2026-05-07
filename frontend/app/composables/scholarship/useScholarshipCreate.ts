import type { Enums, Tables } from '~/types/database.types'

type FormPayload = {
  title: string
  award?: string
  tier: Enums<'scholarship_tier'>
  dead_line: string
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

    isLoading.value = false
    toast.add({
      title: 'Scholarship Created!',
      color: 'success',
    })
  }
  return { createScholarship, isLoading }
}
