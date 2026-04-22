import type { Enums } from "~/types/database.types"

export const useProfileCreate = async () => {
    const toast = useToast()
    const supabase = useSupabaseClient()
    const isLoading = ref<boolean>(false)

    const siteUrl = useRequestURL().origin

    const createProfile = async (payload: { email: string, role: Enums<'profile_role'> }) => {
        isLoading.value = true
        const { error } = await supabase.auth.signUp({
            email: payload.email,
            password: 'Absdiou2313214214123bfoasnfiOAIH091i230fh!27802',
            options: {
                emailRedirectTo: `${siteUrl}/reset_password`,
                data: {
                    role: payload.role
                }
            }
        })

        if (error) {
            isLoading.value = false
            toast.add({
                title: 'Error Creating Account!',
                description: error.message,
                color: 'error'
            })
            return
        }

        isLoading.value = false
        toast.add({
                title: 'Account Created!',
                color: 'success'
        })
    }

    return { createProfile, isLoading }
}