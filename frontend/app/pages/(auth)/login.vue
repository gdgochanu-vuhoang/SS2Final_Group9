<template>
  <UForm 
  class="flex flex-col gap-6 w-full px-6 xl:px-16"
  :state="logInPayloadState" :schema="schema" @submit="handleLogIn">
    <p class="text-4xl text-info-500 font-bold text-center">
      Đăng Nhập
    </p>
    <UFormField
      label="Email"
      name="email"
      :ui="{ label: 'text-lg' }"
    >
        <UInput
          v-model="logInPayloadState.email"
          class="w-full"
          color="neutral"
          placeholder="Nhập email..."
          :ui="{ base: 'bg-gray-100 h-10 text-black' }"
          autocomplete="email"
        />
    </UFormField>
    <UFormField
      label="Mật Khẩu"
      name="password"
      :ui="{ label: 'text-lg' }"
    >
      <UInput
        v-model="logInPayloadState.password"
        class="w-full"
        color="neutral"
        placeholder="Nhập mật khẩu..."
        :ui="{ base: 'bg-gray-100 h-10 text-black' }"
        :type="passwordShow ? 'text' : 'password'"
      >
        <template #trailing>
          <UButton
            class="cursor-pointer"
            color="neutral"
            variant="link"
            size="sm"
            :icon="passwordShow ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="passwordShow ? 'Hide password' : 'Show password'"
            :aria-pressed="passwordShow"
            aria-controls="password"
            @click="passwordShow = !passwordShow"
          />
        </template>
      </UInput>
    </UFormField>
    <div class="flex justify-between items-center">
      <UCheckbox
        color="neutral"
        label="Lưu Tài Khoản"
        :ui="{ base: 'cursor-pointer', label: 'cursor-pointer' }"
      />
      <NuxtLink
        to="/forgot_password"
        class="text-info-500 hover:text-muted text-sm"
      >Quên Mật Khẩu</NuxtLink>
    </div>
    <UButton
      class="h-10 cursor-pointer"
      color="info"
      label="Đăng Nhập"
      :loading="isLoading"
      :ui="{ label: ['mx-auto text-lg', isLoading && 'hidden'], leadingIcon: 'mx-auto' }"
      type="submit"
    />
    <p class="text-sm mx-auto">
      Chưa có tài khoản?
      <NuxtLink
        to="/signup"
        class="text-info-500 hover:text-muted"
      >Đăng Ký</NuxtLink>
    </p>

  </UForm>

</template>
<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
  layout: 'auth',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const isLoading = ref<boolean>(false)

const schema = z.object({
  email: z.email('Email không hợp lệ!'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu!')
})

const { logIn } = useAuth()

const handleLogIn = async () => {
  isLoading.value = true
  await logIn(logInPayloadState);
  isLoading.value = false
}

const passwordShow = ref<boolean>(false)

const logInPayloadState = reactive<{email: string, password: string}>({
  email: '',
  password: ''
})


const statusKeys : Record<string, {title: string, desc: string, color: "success" | "error" }> = {
    register_success : { title: 'Đăng ký thành công', desc: 'Vui lòng kiểm tra email để xác minh.', color: 'success'},
    unauthorized : { title: 'Chưa được xác minh!', desc: 'Vui lòng đăng nhập để truy cập.', color: 'error' },
    invalid_token: { title: 'Token hết hạn!', desc: 'Vui lòng đăng ký lại để nhận token mới.', color: 'error' }
} 

onMounted(() => {
  const statusKey = statusKeys[route.query.status as string]

  if (route.query.status && statusKey) {
    toast.add({
      title: statusKey.title,
      description: statusKey.desc,
      color: statusKey.color
    })
    router.replace('/login')
  }
})

</script>
