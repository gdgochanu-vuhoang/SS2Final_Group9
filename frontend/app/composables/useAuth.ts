import type { ApiResponse, LogInPayload, LoginResponse, RegisterPayload, ResetPasswordPayload } from "~/types/auth"
import { LogInEndpoint, LogOutEndpoint, MissingPasswordEndpoint, RegisterEndpoint, ResetPasswordEndpoint, VerifyResetEndpoint } from "~/constants/endpoints";

export const useAuth = () => {
    const toast = useToast();

    const accessToken = useState<string | null>(() => null)

    const logIn = async (payload: LogInPayload) => {
        try {
            const { message, data } = await $fetch<LoginResponse>(LogInEndpoint, {
                method: 'POST',
                body: payload
            })

            toast.add({
                title: 'Đăng nhập thành công!',
                description: message
            })
            accessToken.value = data.accessToken
            return data

        } catch {
            toast.add({
                title: 'Đăng nhập thất bại!',
                description: 'Sai email hoặc mật khẩu.',
                color: 'error'
            })
            return false
        }
    }

    const logOut = async () => {
        try {
            //await $fetch(LogOutEndpoint)
            accessToken.value = null
            navigateTo('/login')
        }
        catch {
            toast.add({
                title: 'Đăng xuất thất bại!',
                description: 'Vui lòng thử lại sau.',
                color: 'error'
            })
        }
    }

    const register = async (payload: RegisterPayload) => {
        try {
            const { message, data } = await $fetch<ApiResponse>(RegisterEndpoint, {
                method: 'POST',
                body: payload
            })

            toast.add({
                title: 'Đăng ký thành công',
                description: message
            })
            return data
        } catch {
            toast.add({
                title: 'Đăng ký thất bại',
                color: 'error'
            })
        }
    }

    const missingPassword = async (email: string) => {
        try {
            const { data } = await $fetch<ApiResponse>(MissingPasswordEndpoint, {
                method: 'POST',
                query: { email }
            })

            toast.add({
                title: 'Đã gửi mail!',
                description: `Hướng dẫn phục hồi tài khoản đã được gửi về ${email}`
            })
            return data
        } catch {
            toast.add({
                title: 'Gửi mail thất bại!',
                description: 'Vui lòng thử lại sau.',
                color: 'error'
            })
            return false
        }
    }

    const resetPassword = async (payload: ResetPasswordPayload) => {
        try {
            const { message, data } = await $fetch<ApiResponse>(ResetPasswordEndpoint, {
                method: 'POST',
                body: payload
            })

            toast.add({
                title: 'Thay đổi mật khẩu thành công!',
                description: message
            })
            return data
        } catch {
            toast.add({
                title: 'Thay đổi mật khẩu thất bại!',
                description: 'Vui lòng thử lại sau.',
                color: 'error'
            })
        }
    }

    const verifyResetToken = async (token: string) => {
        try {
            await $fetch<ApiResponse>(VerifyResetEndpoint, {
                method: 'GET',
                query: { token: token }
            })
            return true
        } catch {
            return false
        }
    }


    return { accessToken, logIn, logOut, register, missingPassword, resetPassword, verifyResetToken }
}