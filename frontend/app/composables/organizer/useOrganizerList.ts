export const useOrganizerList = async () => {
    const toast = useToast()
    const supabase = useSupabaseClient()

    const organizerListKey = computed(() => {
        return `organizer-list`
    })

    const { data, error } = await useAsyncData(
        organizerListKey,
        async () => {
            const { data } = await supabase
                .from('organizer_list_view')
                .select('*')
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