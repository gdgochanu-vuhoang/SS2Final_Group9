export const useScholarshipDetail = async (id?: string ) => {
    const toast = useToast()
    if (!id) {
        toast.add({
            title: 'Invalid Params!',
            description: 'Missing/Incorrect ID Params.',
            color: 'error'
        })
        return { data: ref(null) }
    }
    const supabase = useSupabaseClient()

    const scholarshipDetailKey = computed(() => {
        return `scholarship-detail-${id}`
    })

    const { data, error } = await useAsyncData(
        scholarshipDetailKey,
        async () => {
            const { data } = await supabase
                .from('scholarships')
                .select('*')
                .eq('id', id) 
                .single()
            return data
        }
    )
    if ( error.value ) {
        toast.add({
            title: 'Error Fetching Detail!',
            color: 'error'
        })
        return { data: ref(null) }
    }

    return { data }
}