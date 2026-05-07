<template>
  <UForm
    class="flex flex-col gap-10"
    @submit="onSubmit"
  >
    <div class="relative flex justify-center mb-10">
      <div class="relative w-full">
        <img
          v-if="!tempUrl"
          src="/scholarshipBannerPlaceholder.png"
          class="w-full h-100 rounded-lg object-cover shadow-xl"
        >
        <NuxtImg
          v-else
          :src="tempUrl"
          class="w-full h-100 rounded-lg object-cover shadow-xl"
          format="webp"
          quality="70"
        />
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleFileSelect"
        >
        <button
          class="w-full h-100 p-0 m-0 absolute inset-0 bg-black/60 rounded-lg z-2 text-white font-bold text-center opacity-20 hover:opacity-100 hover:opacity-100 transition-opacity cursor-pointer"
          @click="openFilePicker"
        >
          Upload Image
        </button>
      </div>
      <div class="absolute -bottom-10 rounded-lg shadow-xl bg-white px-8 md:px-16 py-8 z-3">
        <UTextarea
          v-model="formState.title"
          :ui="{ base: 'h-16 ring-0 focus-visible:ring-0 border-neutral focus-visible:border-info border-b-2 text-info text-2xl md:text-4xl font-bold', root: 'h-max min-h-0' }"
          placeholder="Enter Title..."
          autoresize
        />
      </div>
    </div>
    <div class="flex gap-10 flex-col xl:flex-row">
      <CommonPageSection
        class="shrink-0 w-full xl:w-50"
        inner-class="flex flex-row xl:flex-col h-full items-start gap-8"
      >
        <div class="grid grid-cols-2 xl:grid-cols-1 gap-4 w-full">
          <UFormField
            label="Deadline"
            name="dead_line"
            class="w-full"
            :ui="{ label: 'font-bold' }"
          >
            <UPopover class="w-full h-full">
              <UButton
                :label="formatDate(formState.deadline)"
                color="neutral"
                class="bg-white hover:bg-neutral-100 text-black ring ring-inset ring-accented justify-between"
                trailing-icon="i-heroicons-calendar-solid"
              />
              <template #content>
                <UCalendar
                  v-model="computedDate"
                  color="neutral"
                />
              </template>
            </UPopover>
          </UFormField>
          <UFormField
            label="Award"
            :ui="{ label: 'font-bold' }"
          >
            <UInput v-model="formState.award" />
          </UFormField>
          <UFormField
            label="Tier"
            :ui="{ label: 'font-bold' }"
          >
            <USelect
              v-model="formState.tier"
              class="w-full"
              :items="tierOptions"
            />
          </UFormField>
        </div>
      </CommonPageSection>
      <CommonPageSection
        class="w-full"
        title="Overview"
        title-icon="i-heroicons-cube-solid"
      >
        <UTextarea
          v-model="formState.description"
          autoresize
          placeholder="Enter Description..."
          class="w-full h-full"
        />
      </CommonPageSection>
    </div>
    <div class="flex justify-end gap-4">
      <UButton
        color="neutral"
        :to="`/dashboard/admin/manage-scholarships`"
        size="lg"
        label="Cancel"
      />
      <UButton
        type="submit"
        color="info"
        class="cursor-pointer"
        icon="i-heroicons-check"
        size="lg"
        label="Save"
        :loading="isLoading"
        :ui="{ label: ['mx-auto text-lg', isLoading && 'hidden'], leadingIcon: 'mx-auto' }"
      />
    </div>
  </UForm>
</template>

<script setup lang="ts">
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
  banner_img: File as null,

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

const fileInput = ref<HTMLInputElement | null>(null)

const openFilePicker = () => {
  fileInput.value?.click()
}

const tempUrl = ref<string>()

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0]
    tempUrl.value = URL.createObjectURL(selectedFile)
    formState.banner_img = target.files[0]
  }
}

const { isLoading, createScholarship } = await useScholarshipCreate()

const onSubmit = async () => {
  createScholarship(formState)
}
</script>
