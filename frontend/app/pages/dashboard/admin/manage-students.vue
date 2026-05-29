<template>
  <div class="flex flex-col gap-10">
    <CommonPageSection title="Manage Students">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <UInput
          :model-value="table?.tableApi?.getColumn('full_name')?.getFilterValue() as string"
          placeholder="Search Name..."
          @update:model-value="table?.tableApi?.getColumn('full_name')?.setFilterValue($event)"
        />
      </div>
    </CommonPageSection>
    <CommonPageSection inner-class="flex-col">
      <p class="self-start">
        {{ `Showing ${all?.length ?? 0} / ${curPage?.total ?? 0} rows` }}
      </p>
      <UTable
        ref="table"
        class="overflow-auto w-full"
        :data="all"
        :columns="columns"
      >
        <template #index-cell="{ row }">
          <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
        </template>

        <template #avatar-cell="{ row }">
          <div v-if="row.original.avatar_url">
            <NuxtImg
              :src="row.original.avatar_url"
              class="size-8 rounded-lg"
              quality="50"
              format="webp"
            />
          </div>
        </template>

        <template #created_at-cell="{ row }">
          <NuxtTime
            v-if="row.original.created_at"
            :datetime="row.original.created_at"
            month="numeric"
            day="numeric"
            year="numeric"
            hour="numeric"
            minute="numeric"
            locale="vi-VN"
          />
        </template>

        <template #actions-cell="{ row }">
          <UDropdownMenu
            :items="rowActions(row.original)"
            class="flex justify-end"
          >
            <UButton
              icon="i-heroicons-bars-3"
              color="info"
              variant="ghost"
            />
          </UDropdownMenu>
        </template>
      </UTable>
      <CommonTableTrigger
        :on-load="fetchPage"
        :can-load-more="canLoadMore"
        :is-loading="isLoading"
      />
    </CommonPageSection>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { useStudentList } from '~/composables/students/useStudentList'
import type { Tables } from '~/types/database.types'

const { all, canLoadMore, fetchPage, isLoading, curPage } = await useStudentList()

const table = useTemplateRef('table')
const UButton = resolveComponent('UButton')

const columns: TableColumn<Tables<'student_list_view'>>[] = [
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
    accessorKey: 'full_name',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'student_id',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Student Id',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-heroicons-bars-arrow-down'
            : 'i-heroicons-bars-arrow-up'
          : 'i-heroicons-arrows-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
  },
  {
    accessorKey: 'field_of_study',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Field of Study',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-heroicons-bars-arrow-down'
            : 'i-heroicons-bars-arrow-up'
          : 'i-heroicons-arrows-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
  },
  {
    accessorKey: 'university',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'University',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-heroicons-bars-arrow-down'
            : 'i-heroicons-bars-arrow-up'
          : 'i-heroicons-arrows-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
  },
  {
    accessorKey: 'class',
    header: 'Class',
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Created At',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-heroicons-bars-arrow-down'
            : 'i-heroicons-bars-arrow-up'
          : 'i-heroicons-arrows-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      })
    },
  },
  {
    id: 'actions',
    header: '',
  },
]

const rowActions = (row: Tables<'student_list_view'>) => [
  {
    label: 'View',
    icon: 'i-heroicons-eye-solid',
    to: `/dashboard/students/${row.id}`,
  },
]
</script>
