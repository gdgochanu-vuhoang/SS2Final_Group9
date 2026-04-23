/**<script setup lang="ts">
import { useRouter } from 'vue-router'
definePageMeta({
  layout: false
})

const router = useRouter()
const supabase = useSupabaseClient()
const handleOAuthCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  if (code) {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error during OAuth code exchange:', error.message)
        return
      }
      if (data) {
        router.push('/dashboard')
      }
    }
    catch (error) {
      console.error('Error during OAuth callback handling:', error)
      router.push('/login')
    }
  }
  else {
    console.error('No code found in the URL')
    router.push('/login')
  }
}
onMounted(() => {
  handleOAuthCallback()
})
</script>

<template>
  <div class="text-center text-2xl h-screen flex items-center justify-center">
    Redirecting...
  </div>
</template>
*/