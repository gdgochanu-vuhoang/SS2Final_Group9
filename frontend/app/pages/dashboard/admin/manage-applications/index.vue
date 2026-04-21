<template>
    <div class="flex flex-col gap-10">
        <CommonPageSection title="Manage Applications">
            <div class="flex gap-8">
                <div class="flex items-center gap-4">
                    <p>Sort by:</p>
                    <UButton label="Students" />
                    <UButton label="Scholarships" />
                </div>
            </div>
        </CommonPageSection>
        <CommonPageSection v-if="data && data.length">
            <UTable :columns="columns" :data="data" class="w-full">
                <template #index-cell="{ row }">
                    <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
                </template>

                <template #icon-cell="{ row }">
                    <div v-if="row.original.icon">
                        <NuxtImg :src="row.original.icon" class="size-8" />
                    </div>
                </template>

                <template #actions-cell="{ row }">
                    <div class="flex justify-end">
                        <UButton icon="i-heroicons-eye" color="info" label="Select" class="cursor-pointer" @click="() => { navigateTo(`manage-applications/${row.original.id}`)}" />
                    </div>
                </template>
            </UTable>
        </CommonPageSection>
        <CommonPageEmpty v-else />
    </div>
</template>
<script setup lang="ts">
import { useScholarshipList } from '~/composables/scholarship/useScholarshipList';


const { data } = await useScholarshipList()

const columns: TableColumn[] = [
    {
        id: 'index',
        header: '#'
    },
    {
        id: 'icon',
    },
    {
        accessorKey: 'title',
        header: 'Scholarship Name'
    },
    {
        accessorKey: 'deadline',
        header: 'Deadline'
    },
    {
        id: 'actions',
        header: ''
    }
]
</script>