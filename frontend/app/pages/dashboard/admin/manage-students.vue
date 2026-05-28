<template>
  <div class="flex flex-col gap-10">
    <CommonPageSection title="Manage Students">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <UInput :model-value="table?.tableApi?.getColumn('full_name')?.getFilterValue() as string"
          placeholder="Search Name..."
          @update:model-value="table?.tableApi?.getColumn('full_name')?.setFilterValue($event)" />
      </div>
    </CommonPageSection>
    <CommonPageSection inner-class="flex-col">
      <p class="self-start">
        {{ `Showing ${data?.data?.length ?? 0} / ${data!.count ?? 0} rows` }}
      </p>
      <UTable ref="table" class="overflow-auto w-full" :data="data!.data!" :columns="columns">
        <template #index-cell="{ row }">
          <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex justify-end">
            <UButton icon="i-heroicons-eye" size="sm" color="info" @click="handleViewStudent(row.original.uid)">
              View
            </UButton>
          </div>
        </template>
      </UTable>
    </CommonPageSection>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { useStudentList } from '~/composables/students/useStudentList'
import type { Tables } from '~/types/database.types'

const { data } = await useStudentList()

const handleViewStudent = (uid: string) => {
  navigateTo(`/dashboard/${uid}`)
}

const table = useTemplateRef('table')
const UButton = resolveComponent('UButton')

const columns: TableColumn<Tables<'students'>>[] = [
  {
    id: 'index',
    header: '#',
  },
  {
    id: 'icon',
    header: '',
  },
  {
    accessorKey: 'full_name',
    header: 'Full Name',
  },
  {
    accessorKey: 'student_id',
    header: 'Student Id',
  },
  {
    accessorKey: 'university',
    header: 'University',
  },
  {
    accessorKey: 'major',
    header: 'Major',
  },
  {
    accessorKey: 'class',
    header: 'Class',
  },
  {
    id: 'actions',
    header: '',
  },
]
</script>
