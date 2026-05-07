<template>
  <div class="flex flex-col gap-10">
    <CommonPageSection title="Manage Scholarships">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <UInput
          :model-value="table?.tableApi?.getColumn('title')?.getFilterValue() as string"
          placeholder="Search Title..."
          @update:model-value="table?.tableApi?.getColumn('title')?.setFilterValue($event)"
        />
        <CommonPageToggle
          label="Sort By"
          :options="sortOptions"
        />
      </div>
      <UButton
        class="ml-auto cursor-pointer"
        leading-icon="i-heroicons-plus-circle-solid"
        label="Create Scholarship"
        to="manage-scholarships/create"
      />
    </CommonPageSection>
    <CommonPageSection>
      <UTable
        ref="table"
        class="overflow-auto w-full"
        :data="route.hash === '#all' ? all! : own!"
        :columns="columns"
      >
        <template #index-cell="{ row }">
          <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
        </template>
        <template #icon-cell="{ row }">
          <div v-if="row.original.icon_url">
            <NuxtImg
              :src="row.original.icon_url"
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

const { data: all, filteredData: own, listById } = await useScholarshipList(curUser.value!.id, curUser.value!.role!)

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
    header: 'Deadline',
    cell: ({ row }) => {
      return h('p', formatDate(row.getValue('deadline')))
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
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

const handleFetchOwn = async () => {
  if (!own.value) await listById()
}

const sortOptions = [
  {
    label: 'All',
    hash: '#all',
  },
  {
    label: 'Own',
    hash: '#own',
    onclick: handleFetchOwn,
  },
]

onMounted(() => {
  router.push({ hash: '#all' })
})
</script>
