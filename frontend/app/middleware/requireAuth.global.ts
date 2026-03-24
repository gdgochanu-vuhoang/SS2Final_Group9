export default defineNuxtRouteMiddleware((to) => {

    const { accessToken } = useAuth()

    if (to.path.startsWith('/dashboard')) {

        if (!accessToken.value) {
            return navigateTo('/login?error=unauthorized')
        }
    }
})