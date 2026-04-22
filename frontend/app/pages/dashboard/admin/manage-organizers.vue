<template>
    <div class="flex flex-col gap-10">
        <CommonPageSection title="Manage Organizers" title-icon="i-heroicons-users-solid">
            <div class="flex gap-8">
                <div class="flex items-center gap-4">
                    <p>Sort by:</p>
                    <UButton label="Students" />
                    <UButton label="Scholarships" />
                </div>
            </div>
            <UButton class="ml-auto cursor-pointer" leading-icon="i-heroicons-plus-circle-solid"
                label="Create Organizer" @click="() => { createProfileOpen = true }" />
            <CommonPageModal v-model:is-open="createProfileOpen" title="Account Information" inner-class="flex-col justify-center gap-8">
                <p class="text-dimmed">This will create an Organizer account with a temporary password<br >
                The organizer must confirm through the email and change password afterwards</p>
                <UForm class="flex flex-col gap-6 w-full lg:px-20" :state="createProfilePayloadState"
                    :schema="schema" @submit="handleCreateProfile">
                    <UFormField label="Email" name="email" :ui="{ label: 'text-lg' }">
                        <UInput v-model="createProfilePayloadState.email" class="w-full"
                            autocomplete="email" />
                    </UFormField>
                    <UButton class="cursor-pointer" label="Create Account"
                        :ui="{ label: ['mx-auto text-lg', isCreating && 'hidden'], leadingIcon: 'mx-auto' }"
                        :loading="isCreating" type="submit" />
                </UForm>
            </CommonPageModal>
        </CommonPageSection>
        <CommonPageSection>
            <UTable class="w-full" :data="data!" :columns="columns">
                <template #index-cell="{ row }">
                    <span class="text-gray-500 font-medium">{{ row.index + 1 }}</span>
                </template>

                <template #actions-cell="{ row }">
                    <div class="flex justify-end">
                        <UButton icon="i-heroicons-eye" size="sm" color="info" @click="">
                            View
                        </UButton>
                    </div>
                </template>
            </UTable>
        </CommonPageSection>
    </div>
</template>
<script lang="ts" setup>
import { z } from 'zod'
import { useProfileCreate } from '~/composables/profile/useProfileCreate';
import type { Enums } from '~/types/database.types';


const { createProfile, isLoading: isCreating } = await useProfileCreate()

const createProfileOpen = shallowRef<boolean>(false)
const createProfilePayloadState = ref({ email: '', role: 'ORGANIZER' as Enums<'profile_role'> })
const schema = z.object({ email: z.email('Email không hợp lệ!') })
const handleCreateProfile = () => {
    createProfile(createProfilePayloadState.value)
}

const data = []

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