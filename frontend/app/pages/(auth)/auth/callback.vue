<template>
    <div class="flex items-center justify-center min-h-screen">
        <UCard>
            <div class="flex flex-col items-center gap-4">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-info" />
                <p class="text-lg font-medium">Authenticating your invitation...</p>
            </div>
        </UCard>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: undefined
})

const route = useRoute()
const supabase = useSupabaseClient()

const handleCallback = async () => {
    const hash = route.hash

    if (hash && hash.includes('access_token')) {
    // 2. Remove the '#' so we can parse it like a standard query string
    const params = new URLSearchParams(hash.substring(1))
    
    // 3. Extract the exact tokens Supabase needs
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (accessToken && refreshToken) {
      // 4. FORCE Supabase to establish the session manually
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })

      if (error) {
        console.error('Failed to set session:', error.message)
        alert('Invite link expired or invalid.')
        return
      }

      // 6. Hard-redirect to your update-password page. 
      // We use window.location.href instead of navigateTo() to force a 
      // full page reload, guaranteeing the new auth cookie is recognized by Nuxt.
      return navigateTo('/reset_password')
    }
  } else {
    // If there is no hash, they shouldn't be on this page.
    return navigateTo('/login')
  }
}



onMounted(() => {
    handleCallback()
})
</script>