<template>
    <div class="flex flex-col gap-10">
        <CommonPageSection>
            Filtering for 
        </CommonPageSection>
        <CommonPageSection v-if="data && data.length">
            <UTable :columns="columns" :data="data" class="w-full">
                <template #index-cell="{ row }">
                    <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
                </template>

                <template #actions-cell="{ row }">
                    <div class="flex justify-end">
                        <UButton icon="i-heroicons-eye" color="info" label="Select" class="cursor-pointer" @click="() => { 
                            curRow = row.original
                            isOpen = true
                         }" />
                    </div>
                </template>
            </UTable>
            <Transition 
            enter-from-class="opacity-0" enter-active-class="transition-opacity duration-300 ease-out"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-300 ease-in"
            leave-to-class="opacity-0">
            <div v-if="isOpen" class="fixed inset-0 size-full z-50 flex justify-center items-center">
                <CommonPageSection class="h-5/6 mt-10 z-51 w-100 md:ml-20 lg:w-150 xl:w-200" title-icon="i-heroicons-user-solid" title="Register Information" inner-class="overflow-y-auto items-start">
                    <template #titleTrailing>
                        <UButton icon="i-heroicons-x-mark-solid" color="info" variant="ghost" class="ml-auto cursor-pointer" :ui="{base: 'p-0', leadingIcon: 'bg-white size-10'}" @click="() => {isOpen = false}" />
                    </template>
                    <UForm class="flex flex-col gap-8 w-full">
                        <div v-for="section in formSections" :key="section.title" class="w-full flex flex-col">
                            <h3 class="text-info font-bold text-lg mb-4">{{ section.title }}</h3>
                            <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-4 w-full">
                            <UFormField v-for="field in section.fields" :key="field.label" :label="field.label" class="w-full">
                                <UInput v-model="curRow[section.key][field.key]" class="w-full" disabled />
                            </UFormField>
                            </div>
                        </div>
                    </UForm>
                </CommonPageSection>
                <div class="absolute bg-black/60 size-full inset-0 bg-black-60" @click="() => {isOpen = false}" />
            </div>
        </Transition>
        </CommonPageSection>
        <CommonPageEmpty v-else />
    </div>
</template>
<script setup lang="ts">
import { useApplicationList } from '~/composables/application/useApplicationList';
import type { Tables } from '~/types/database.types';


const route = useRoute()

const curRow = ref<Tables<"applications"> | null>()
const isOpen = ref<boolean>(false)


const { listByScholarship } = await useApplicationList()

const { data } = await listByScholarship(route.params.id!.toString())

const columns: TableColumn[] = [
    {
        id: 'index',
        header: '#'
    },
    {
        accessorKey: 'user_id',
        header: 'Applicant Id'
    },
    {
        accessorKey: 'status',
        header: 'Status'
    },
    {
        id: 'actions',
        header: ''
    }
]

const formSections = ref([
    {
        title: 'Study Information',
        key: 'study_info',
        fields: [
            {
                label: 'GPA',
                key: 'gpa',
            },
            {
                label: 'Accumulated Credits',
                key: 'accumulated_credit',
            }
        ]
    },
    {
        title: 'Extra Curricular',
        key: 'extra_curricular',
        fields: [
            {
                label: 'Club',
                key: 'club_activity',
            },
            {
                label: 'Time Active',
                key: 'time_active',
            },
            {
                label: 'Role',
                key: 'role',
            },
        ]
    },
    {
        title: 'Family Background',
        key: 'family_backgr_info',
        fields: [
            {
                label: `Father's Occupation`,
                key: 'father_job',
            },
            {
                label: `Mother's Occupation`,
                key: 'mother_job',
            },
            {
                label: 'Average Income',
                key: 'avg_income',
            },
        ]
    },
])
</script>