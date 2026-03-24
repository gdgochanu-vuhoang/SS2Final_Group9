export const useSidebar = () => {
    const sidebarOpen = useState<boolean>(() => true)

    const toggleSidebarOpen = () => {
        sidebarOpen.value = !sidebarOpen.value
    }

    return { sidebarOpen, toggleSidebarOpen}
}