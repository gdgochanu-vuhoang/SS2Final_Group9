<template>
  <div class="flex flex-col gap-10">
    <CommonPageSection title="Manage Organizers">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <UInput :model-value="table?.tableApi?.getColumn('username')?.getFilterValue() as string"
          placeholder="Search Organizers..."
          @update:model-value="table?.tableApi?.getColumn('username')?.setFilterValue($event)" />
      </div>
      <UButton class="ml-auto cursor-pointer" leading-icon="i-heroicons-plus-circle-solid" label="Invite Organizer"
        @click="() => { createProfileOpen = true }" />
      <CommonPageModal v-model:is-open="createProfileOpen" title="Profile Information"
        inner-class="flex-col justify-center gap-8">
        <p class="text-dimmed">
          This will create an Organizer profile with a temporary password<br>
          The organizer must confirm through the email and change password afterwards
        </p>
        <UForm class="flex flex-col gap-6 w-full lg:px-20" :state="createProfilePayloadState" :schema="schema"
          @submit="handleCreateProfile">
          <UFormField label="Name" name="username" :ui="{ label: 'text-lg' }" required>
            <UInput v-model="createProfilePayloadState.username" class="w-full" />
          </UFormField>
          <UFormField label="Email" name="email" :ui="{ label: 'text-lg' }">
            <UInput v-model="createProfilePayloadState.email" class="w-full" autocomplete="email" />
          </UFormField>
          <UButton class="cursor-pointer" label="Create Profile"
            :ui="{ label: ['mx-auto text-lg', isCreating && 'hidden'], leadingIcon: 'mx-auto' }" :loading="isCreating"
            type="submit" />
        </UForm>
      </CommonPageModal>
    </CommonPageSection>
    <CommonPageSection inner-class="flex-col">
      <p class="self-start">
        {{ `Showing ${data?.data?.length} / ${data!.count} rows` }}
      </p>
      <UTable class="w-full" ref="table" :data="data?.data!" :columns="columns">
        <template #index-cell="{ row }">
          <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
        </template>
        <template #avatar-cell="{ row }">
          <div v-if="row.original.avatar_url">
            <NuxtImg :src="row.original.avatar_url" class="size-8 rounded-lg" quality="50" format="webp" />
          </div>
        </template>

        <template #created_at-cell="{ row }">
          <NuxtTime v-if="row.original.created_at" :datetime="row.original.created_at" month="numeric" day="numeric"
            year="numeric" hour="numeric" minute="numeric" locale="vi-VN" />
        </template>

        <template #actions-cell="{ row }">
          <UDropdownMenu :items="rowActions(row.original)" class="flex justify-end">
            <UButton icon="i-heroicons-bars-3" color="info" variant="ghost" />
          </UDropdownMenu>
        </template>
      </UTable>
    </CommonPageSection>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { z } from 'zod'
import { useOrganizerList } from '~/composables/organizer/useOrganizerList'
import { useProfileCreate } from '~/composables/profile/useProfileCreate'
import type { Enums, Tables } from '~/types/database.types'

const { createProfile, isLoading: isCreating } = await useProfileCreate()

const createProfileOpen = shallowRef<boolean>(false)
const createProfilePayloadState = ref({ email: '', username: '', role: 'ORGANIZER' as Enums<'profile_role'> })
const schema = z.object({ email: z.email('Email không hợp lệ!'), username: z.string().optional() })
const handleCreateProfile = () => {
  createProfile(createProfilePayloadState.value)
}

const table = useTemplateRef('table')
const UButton = resolveComponent('UButton')

const { data } = await useOrganizerList()

const columns: TableColumn<Tables<'organizer_list_view'>>[] = [
  {
    id: 'index',
    header: '#',
  },
  {
    id: 'avatar',
    accessorKey: 'avatar_url',
    header: '',
  },
  {
    accessorKey: 'username',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Registered Date',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-heroicons-bars-arrow-down'
            : 'i-heroicons-bars-arrow-up'
          : 'i-heroicons-arrows-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    }
  },
  {
    id: 'actions',
    header: '',
  },
]

const rowActions = (row: Tables<'organizer_list_view'>) => [
  {
    label: 'View',
    icon: 'i-heroicons-eye-solid',
    to: `/dashboard/${row.id}`,
  },
]
</script>
