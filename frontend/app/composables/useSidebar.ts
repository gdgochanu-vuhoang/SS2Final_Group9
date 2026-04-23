import { sidebarOptions } from '~/constants/sidebar';
import type { Tables } from '~/types/database.types';

export const useSidebar = () => {
    const { data: curUser } = useNuxtData<Tables<"profiles">>('user-detail')

    const sidebarOpen = useState<boolean>(() => true)

    const toggleSidebarOpen = useThrottleFn(() => {
        sidebarOpen.value = !sidebarOpen.value
    }, 700)

    const authorizedSidebarOptions = computed(() => {
        const userRole = curUser?.value?.role

        return sidebarOptions.filter((option) => {
            if (!option.roles || option.roles.length === 0) {
                return true
            }
            return userRole && option.roles.includes(userRole)
        })
    })


    return { sidebarOpen, toggleSidebarOpen, authorizedSidebarOptions }
}