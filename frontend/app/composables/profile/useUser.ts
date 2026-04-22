export const useUser = async () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  if (!user) return { curUser: ref(null) }

  const userKey = computed(() => {return 'user-detail'})

  const { data: curUser } = await useAsyncData(
    userKey,
    async () => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.value!.sub) 
            .single()
        return data
    }
  )

  return { curUser }
}