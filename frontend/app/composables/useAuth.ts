export const useAuth = () => {

    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    const toast = useToast();

    const siteUrl = useRequestURL().origin

    const logIn = async (payload: { email: string, password: string }) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        })

        if (error) {
            toast.add({
                title: 'Đăng nhập thất bại!',
                description: error.message,
                color: 'error'
            })
            return
        }

        if (!user.value) {
            await new Promise<void>((resolve) => {
                const unwatch = watch(user, (newUser) => {
                    if (newUser) {
                        unwatch()
                        resolve()
                    }
                })
            })
        }

        toast.add({
            title: 'Đăng nhập thành công!',
            color: 'success'
        })
        return navigateTo('/dashboard')

    }

    const logOut = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            toast.add({
                title: 'Đăng xuất thất bại!',
                description: error.message,
                color: 'error'
            })
            return
        }

        return navigateTo('/login')
    }

    const register = async (payload: { email: string, password: string }) => {
        const { error } = await supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
            options: {
                emailRedirectTo: `${siteUrl}/auth/callback`,
                data: {
                    role: 'STUDENT'
                }
            }
        })

        if (error) {
            toast.add({
                title: 'Đăng ký thất bại!',
                description: error.message,
                color: 'error'
            })
            return
        }

        return navigateTo('/login?status=register_success')
    }

    const missingPassword = async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${siteUrl}/reset_password`,
        })

        if (error) {
            toast.add({
                title: 'Cập nhật thất bại!',
                description: error.message,
                color: 'error'
            })
            return
        }

        toast.add({
            title: 'Vui lòng kiểm tra email để tiếp tục!',
            color: 'success'
        })
    }

    const resetPassword = async (new_password: string) => {
        const { error } = await supabase.auth.updateUser({
            password: new_password
        })

        if (error) {
            toast.add({
                title: 'Đổi mật khẩu thất bại!',
                description: error.message,
                color: 'error'
            })
            return
        }

        toast.add({
            title: 'Đổi mật khẩu thành công!',
            color: 'success'
        })
        return navigateTo('/dashboard')
    }


    return { logIn, logOut, register, missingPassword, resetPassword }
}