import { sidebarOptions } from '~/constants/sidebar';
import type { Tables } from '~/types/database.types';

export const useSidebar = () => {
    const { data: curUser } = useNuxtData<Tables<"profiles">>('user-detail')

    const sidebarOpen = useState<boolean>(() => true)

    const toggleSidebarOpen = useThrottleFn(() => {
        sidebarOpen.value = !sidebarOpen.value
    }, 700)

    const authorizedSidebarOptions = computed(() => {
        const isAdmin = curUser?.value?.role === 'ADMIN'

        return sidebarOptions.filter((section) => {
            if (isAdmin) return true;
            return !section.admin;
        })
    })


    return { sidebarOpen, toggleSidebarOpen, authorizedSidebarOptions }
}