import type { Tables } from "~/types/database.types"

export const useScholarshipApply = async (sid: string) => {
    const supabase = useSupabaseClient()
    const toast = useToast()
    const isLoading = ref<boolean>(false)
    const { data: curUser } = useNuxtData<Tables<"profiles">>('user-detail')

    const checkUnique = async () => {
        isLoading.value = true
        const { data, error } = await supabase
            .from('applications')
            .select('id')
            .eq('user_id', curUser.value!.id)
            .eq('scholarship_id', sid)
            .limit(1)

        if (error) {
            toast.add({
                title: 'Error fetching data',
                description: error.message ?? 'Please try again later!',
                color: 'error'
            })
            isLoading.value = false
            return false
        }
        isLoading.value = false
        if (data.length) return false
        return true
    }

    const applicationKey = computed(() => {
        return `application-${sid}`
    })
    const isUnique = await useAsyncData(applicationKey, checkUnique)

    const scholarshipApply = async (a: Tables<"applications">) => {
        isLoading.value = true
        const { error } = await supabase
            .from('applications')
            .insert({
                ...a,
                scholarship_id: sid,
                user_id: curUser.value!.id,
                status: 'Applied'
            })

        if (error) {
            toast.add({
                title: 'Error uploading data',
                description: error.message ?? 'Please try again later!',
                color: 'error'
            })
            isLoading.value = false
            return
        }

        refreshNuxtData(applicationKey.value)

        toast.add({
            title: 'Applied successfully',
            color: 'success'
        })
    }

    return {
        isLoading,
        isUnique,
        scholarshipApply
    }
}