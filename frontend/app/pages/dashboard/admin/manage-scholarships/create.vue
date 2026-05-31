<template>
  <UForm class="flex flex-col gap-10" :schema="schema" @submit="onSubmit">
    <div class="relative flex justify-center mb-10">
      <div class="relative w-full">
        <img v-if="!tempBanner" src="/scholarshipBannerPlaceholder.png"
          class="w-full h-100 rounded-lg object-cover shadow-xl">
        <NuxtImg v-else :src="tempBanner" class="w-full h-100 rounded-lg object-cover shadow-xl" format="webp"
          quality="70" />
        <input ref="bannerInput" type="file" accept="image/*" class="hidden" @change="handleBannerSelect">
        <button type="button"
          class="w-full h-100 p-0 m-0 absolute inset-0 bg-black/60 rounded-lg z-2 text-white font-bold text-center opacity-20 hover:opacity-100 hover:opacity-100 transition-opacity cursor-pointer"
          @click="openBannerPicker">
          Upload Banner
        </button>
      </div>
      <div class="absolute -bottom-10 flex gap-26 h-30">
        <div class="h-full w-30 relative">
          <NuxtImg v-if="tempIcon" :src="tempIcon" class="size-full rounded-lg object-cover shadow-xl" format="webp"
            quality="70" />
          <input ref="iconInput" type="file" accept="image/*" class="hidden" @change="handleIconSelect">
          <button type="button"
            class="size-full p-0 m-0 absolute inset-0 bg-black rounded-lg z-2 text-white font-bold text-center opacity-20 hover:opacity-100 hover:opacity-100 transition-opacity cursor-pointer"
            @click="openIconPicker">
            Upload Icon
          </button>
        </div>
        <div class="rounded-lg shadow-xl bg-white px-8 md:px-16 py-8 z-3">
          <UFormField name="title">
            <UTextarea v-model="formState.title"
              :ui="{ base: 'h-16 ring-0 focus-visible:ring-0 border-neutral focus-visible:border-info border-b-2 text-info text-2xl md:text-4xl font-bold', root: 'h-max min-h-0' }"
              placeholder="Enter Title..." autoresize />
          </UFormField>
        </div>
      </div>
    </div>
    <div class="flex gap-10 flex-col xl:flex-row">
      <CommonPageSection class="shrink-0 w-full xl:w-50"
        inner-class="flex flex-row xl:flex-col h-full items-start gap-8">
        <div class="grid grid-cols-2 xl:grid-cols-1 gap-4 w-full">
          <UFormField label="Deadline" name="deadline" class="w-full" :ui="{ label: 'font-bold' }">
            <UPopover class="w-full h-full">
              <UButton :label="formatDate(formState.deadline)" color="neutral"
                class="bg-white hover:bg-neutral-100 text-black ring ring-inset ring-accented justify-between"
                trailing-icon="i-heroicons-calendar-solid" />
              <template #content>
                <UCalendar v-model="computedDate" color="neutral" />
              </template>
            </UPopover>
          </UFormField>
          <UFormField label="Award" name="award" :ui="{ label: 'font-bold' }">
            <UInput v-model="formState.award" />
          </UFormField>
          <UFormField label="Tier" name="tier" :ui="{ label: 'font-bold' }">
            <USelect v-model="formState.tier" class="w-full" :items="tierOptions" />
          </UFormField>
        </div>
      </CommonPageSection>
      <CommonPageSection class="w-full" title="Overview" title-icon="i-heroicons-cube-solid">
        <UFormField name="description" class="w-full h-full">
          <UTextarea v-model="formState.description" autoresize placeholder="Enter Description..."
            class="w-full h-full" />
        </UFormField>
      </CommonPageSection>
    </div>
    <div>
      <CommonPageSection title="Organizers" title-icon="i-heroicons-users-solid">
        <p class="text-sm text-muted-foreground">This section will be implemented in the future to allow assigning
          organizers to the scholarship.</p>
      </CommonPageSection>
    </div>
    <div class="flex justify-end gap-4">
      <UButton color="neutral" :to="`/dashboard/admin/manage-scholarships`" size="lg" label="Cancel" />
      <UButton type="submit" color="info" class="cursor-pointer" icon="i-heroicons-check" size="lg" label="Save"
        :loading="isLoading" :ui="{ label: ['mx-auto text-lg', isLoading && 'hidden'], leadingIcon: 'mx-auto' }" />
    </div>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { useScholarshipCreate } from '~/composables/scholarship/useScholarshipCreate'
import type { Enums } from '~/types/database.types'

const tierOptions = [
  'GOLD',
  'SILVER',
  'VENUE',
]

const currentDay = today(getLocalTimeZone())

const formState = reactive({
  title: '',
  award: '',
  tier: 'VENUE' as Enums<'scholarship_tier'>,
  deadline: currentDay.toString(),
  description: '',
  banner_img: null as File | null,
  icon_img: null as File | null,
})

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long!').max(30, 'Title must be less than 30 characters!'),
  award: z.string().min(1, 'Award is required!').max(20, 'Award must be less than 20 characters!'),
  tier: z.enum(tierOptions),
  deadline: z.string().refine((dateString) => {
    try {
      const selectedDate = parseDate(dateString)
      return selectedDate.compare(currentDay) >= 0
    }
    catch {
      return false
    }
  }, {
    message: 'Deadline must be a valid date and in the future!',
  }),
  description: z.string().max(200, 'Description must be less than 200 characters!').optional(),
  banner_img: z.any().optional(),
  icon_img: z.any().optional(),
})

const computedDate = computed({
  get: (): CalendarDate => {
    if (!formState.deadline) return currentDay
    return parseDate(formState.deadline)
  },
  set: (newDate: CalendarDate | undefined) => {
    if (!newDate) {
      formState.deadline = ''
      return
    }
    formState.deadline = newDate.toString()
  },
})

const bannerInput = ref<HTMLInputElement | null>(null)
const iconInput = ref<HTMLInputElement | null>(null)

const openBannerPicker = () => {
  bannerInput.value?.click()
}
const openIconPicker = () => {
  iconInput.value?.click()
}

const tempBanner = ref<string>()
const tempIcon = ref<string>()

const handleBannerSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0]
    if (tempBanner.value) {
      URL.revokeObjectURL(tempBanner.value)
    }
    tempBanner.value = URL.createObjectURL(selectedFile)
    formState.banner_img = target.files[0]
  }
}

const handleIconSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0]
    if (tempIcon.value) {
      URL.revokeObjectURL(tempIcon.value)
    }
    tempIcon.value = URL.createObjectURL(selectedFile)
    formState.icon_img = target.files[0]
  }
}

const { isLoading, createScholarship } = await useScholarshipCreate()

const onSubmit = async () => {
  createScholarship(formState)
}
</script>
