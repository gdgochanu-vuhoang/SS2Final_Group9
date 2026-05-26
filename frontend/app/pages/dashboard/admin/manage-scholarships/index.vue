<template>
  <div class="flex flex-col gap-10">
    <CommonPageSection title="Manage Scholarships">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <UInput :model-value="table?.tableApi?.getColumn('title')?.getFilterValue() as string"
          placeholder="Search Title..."
          @update:model-value="table?.tableApi?.getColumn('title')?.setFilterValue($event)" />
        <CommonPageToggle label="Sort By" :options="sortOptions" />
      </div>
      <UButton class="ml-auto cursor-pointer" leading-icon="i-heroicons-plus-circle-solid" label="Create Scholarship"
        to="manage-scholarships/create" />
    </CommonPageSection>
    <CommonPageSection inner-class="flex-col">
      <p class="self-start">
        {{ `Showing ${route.hash === '#all' ? all?.length : own?.length} / ${curPage.total} rows` }}
      </p>
      <UTable ref="table" class="overflow-auto w-full" :data="route.hash === '#all' ? all! : own!" :columns="columns">
        <template #index-cell="{ row }">
          <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
        </template>
        <template #icon-cell="{ row }">
          <div v-if="row.original.icon_url">
            <NuxtImg :src="row.original.icon_url" class="size-8 rounded-lg" quality="50" format="webp" />
          </div>
        </template>

        <template #tier-cell="{ row }">
          <ScholarshipTierBadge :tier="row.original.tier ?? 'venue'" />
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
      <CommonTableTrigger :onLoad="fetchPage" :canLoadMore="route.hash === '#all' ? canLoadMore.all : canLoadMore.own"
        :is-loading="isLoading" />
    </CommonPageSection>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { useScholarshipList } from '~/composables/scholarship/useScholarshipList'
import type { Tables } from '~/types/database.types'

const { data: curUser } = useNuxtData<Tables<'profiles'>>('user-detail')

const route = useRoute()
const router = useRouter()

const table = useTemplateRef('table')
const UButton = resolveComponent('UButton')

const { isLoading, isFiltering, all, own, curPage, canLoadMore, fetchPage, fetchCount } = await useScholarshipList(curUser.value!.id, curUser.value!.role!)

const columns: TableColumn<Tables<'scholarship_list_view'>>[] = [
  {
    id: 'index',
    header: '#',
  },
  {
    id: 'icon',
    header: '',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'tier',
    header: 'Tier',
  },
  {
    accessorKey: 'deadline',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Deadline',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-heroicons-bars-arrow-down'
            : 'i-heroicons-bars-arrow-up'
          : 'i-heroicons-arrows-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => {
      return h('p', formatDate(row.getValue('deadline')))
    },
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
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
  },
  {
    id: 'actions',
    header: '',
  },
]

const rowActions = (row: Tables<'scholarship_list_view'>) => [
  {
    label: 'View',
    icon: 'i-heroicons-eye-solid',
    to: `/dashboard/scholarships/${row.id}`,
  },
]

const sortOptions = [
  {
    label: 'All',
    hash: '#all',
  },
  {
    label: 'Own',
    hash: '#own',
  },
]

watch(() => route.hash, async (newHash) => {
  if (newHash === '#own') {
    isFiltering.value = true
  } else {
    isFiltering.value = false
  }
  await fetchCount()
})
onMounted(() => {
  router.push({ hash: '#all' })
})
</script>
