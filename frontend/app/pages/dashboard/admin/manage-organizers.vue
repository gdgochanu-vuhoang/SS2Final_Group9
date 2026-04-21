<template>
        <CommonPageSection title="Quản lý Sinh viên" title-icon="i-heroicons-users-solid">
        <UTable class="w-full" :data="" :columns="">
            <template #index-cell="{ row }">
                <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
            </template>

            <template #actions-cell="{ row }">
                <div class="flex justify-end">
                    <UButton icon="i-heroicons-eye" size="sm" color="info"
                        @click="">
                        View
                    </UButton>
                </div>
            </template>
        </UTable>
    </CommonPageSection>
</template>
<script lang="ts" setup>

const columns: TableColumn[] = [
    {
        id: 'index',
        header: '#'
    },
    {
        accessorKey: 'full_name',
        header: 'Full Name'
    },
    {
        accessorKey: 'student_id',
        header: 'Student Id'
    },
    {
        accessorKey: 'full_name',
        header: 'Full Name'
    },
    {
        accessorKey: 'university',
        header: 'University'
    },
    {
        accessorKey: 'major',
        header: 'Major'
    },
    {
        accessorKey: 'class',
        header: 'Class'
    },
    {
        id: 'actions',
        header: ''
    }
]
</script>