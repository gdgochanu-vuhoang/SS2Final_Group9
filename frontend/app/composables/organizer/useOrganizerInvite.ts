import type { Enums } from '~/types/database.types'

export const useOrganizerInvite = async () => {
  const toast = useToast()
  const isLoading = ref<boolean>(false)

  const siteUrl = useRequestURL().origin

  const createProfile = async (payload: { email: string, username: string, role: Enums<'profile_role'> }) => {
    isLoading.value = true
    try {
      await $fetch('/api/profiles/invite', {
        method: 'POST',
        body: {
          email: payload.email,
          url: siteUrl,
          role: payload.role,
          username: payload.username,
        },
      })

      toast.add({
        title: 'Invite Sent!',
        description: `An invitation has been emailed.`,
        color: 'success',
      })
    }
    catch (error: any) {
      toast.add({
        title: 'Failed to Create Profile!',
        description: error.data?.statusMessage || 'An unexpected error occurred.',
        color: 'error',
      })
    }
    finally {
      isLoading.value = false
    }
  }

  return { createProfile, isLoading }
}
