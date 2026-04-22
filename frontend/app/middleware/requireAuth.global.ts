import type { Tables } from "~/types/database.types"

export default defineNuxtRouteMiddleware((to) => {

    const loggedIn = useSupabaseUser()
    const { data: curUser } = useNuxtData<Tables<"profiles">>('user-detail')


    if (to.path === '/') {
        if (!loggedIn.value) {
            return navigateTo('/login')
        }
        return navigateTo('/dashboard')
    }

    if (to.path.startsWith('/dashboard')) {

        if (!loggedIn.value) {
            return navigateTo('/login?status=unauthorized')
        }
    }

    if (to.path.startsWith('/dashboard/admin')) {
        if (curUser.value?.role != 'ADMIN') {
            if (!loggedIn.value) { return navigateTo('/login?status=unauthorized') }
            return navigateTo('/dashboard')

        }
    }
})