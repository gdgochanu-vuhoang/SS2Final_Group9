<template>
  <div class="sticky top-0 right-0 flex items-center p-2 h-12 bg-info-300 rounded-b-lg shadow-xl md:mr-2 z-99">
    <UButton
      color="info"
      class="relative h-full w-10 cursor-pointer overflow-hidden"
      :icon="sidebarOpen ? 'i-lucide-panel-right-open' : 'i-lucide-panel-left-open'"
      @click="toggleSidebarOpen"
    >
      <div class="absolute hidden md:block -bottom-2 -right-2 size-6 bg-white rounded-lg">
        <p class="text-black mr-1">
          k
        </p>
      </div>
    </UButton>
    <UInput
      color="neutral"
      class="ml-4 h-full w-50 md:w-70"
      placeholder="Tìm Kiếm..."
      icon="i-lucide-search"
      type="search"
      :ui="{ base: 'h-full' }"
    />
    <UDropdownMenu :items="profileActions">
      <UButton
        class="ml-auto cursor-pointer"
        color="info"
        variant="ghost"
      >
        <UUser
          :avatar="{ src: 'temp' }"
          :ui="{ name: 'text-white', description: 'text-white' }"
        />
      </UButton>
      <template #user-profile>
        <div>
          <p class="font-bold">
            {{ curUser?.username }}
          </p>
          <div class="flex gap-4">
            <ProfileRoleBadge
              v-if="curUser?.role"
              :role="curUser?.role"
            />
            <p
              v-if="curUser?.role === 'STUDENT'"
              class="text-dimmed text-sm"
            >
              Student Code: 0123456
            </p>
          </div>
        </div>
      </template>
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useUser } from '~/composables/profile/useUser'

const { curUser } = await useUser()

const { logOut } = useAuth()

const handleLogOut = async () => {
  await logOut()
}

const profileActions: DropdownMenuItem[][] = [
  [
    {
      slot: 'user-profile' as const,
      type: 'label',
    },
  ],
  [
    {
      label: 'Me',
      icon: 'i-heroicons-user-solid',
      onSelect: () => navigateTo(`/dashboard/${curUser.value?.id}`),
    },
  ],
  [
    {
      label: 'Sign Out',
      icon: 'i-heroicons-arrow-left-start-on-rectangle',
      onSelect: handleLogOut,
    },
  ],
]

const { sidebarOpen, toggleSidebarOpen } = useSidebar()
</script>
