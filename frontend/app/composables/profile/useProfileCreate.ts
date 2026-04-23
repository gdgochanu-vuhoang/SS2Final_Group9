import type { Enums } from "~/types/database.types"

export const useProfileCreate = async () => {
    const toast = useToast()
    const isLoading = ref<boolean>(false)

    const siteUrl = useRequestURL().origin

    const createProfile = async (payload: { email: string, username: string, role: Enums<'profile_role'> }) => {
        try {
        // Send the request to your secure backend
        await $fetch('/api/profiles/invite', {
            method: 'POST',
            body: {
                email: payload.email,
                url: siteUrl,
                role: payload.role,
                username: payload.username
            }
        })

        toast.add({
            title: 'Invite Sent!',
            description: `An invitation has been emailed.`,
            color: 'success'
        })
        
    } catch (error: any) {
        // Nuxt $fetch errors throw automatically. We catch them and show the toast.
        toast.add({
            title: 'Failed to Create Profile!',
            description: error.data?.statusMessage || 'An unexpected error occurred.',
            color: 'error'
        })
    } finally {
        isLoading.value = false
    }
    }

    return { createProfile, isLoading }
}