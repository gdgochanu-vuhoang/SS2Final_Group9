<template>
  <div class="flex flex-col lg:flex-row-reverse gap-10 h-full">
    <ProfileEditFloaterBox class="w-full lg:w-80 lg:sticky shrink-0 top-16 self-start" />

    <UForm
      :state="formState"
      :schema="schema"
      class="w-full flex flex-col gap-10"
      @submit="onSubmit"
    >
      <CommonPageSection
        title="Personal Information"
        title-icon="i-heroicons-user-solid"
        inner-class="grid grid-cols-3 gap-4"
      >
        <UFormField
          label="Full Name"
          name="fullName"
          required
          class="w-full"
        >
          <UInput
            v-model="formState.fullName"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Gender"
          name="gender"
          required
          class="w-full"
        >
          <USelect
            v-model="formState.gender"
            class="w-full"
            :items="genderOptions"
            color="info"
          />
        </UFormField>
        <UFormField
          label="Date of Birth"
          name="dob"
          class="w-full"
          required
        >
          <UPopover class="w-full h-full">
            <UButton
              :label="formatDate(formState.dob)"
              color="neutral"
              class="bg-white hover:bg-neutral-100 text-black ring ring-inset ring-accented justify-between"
              trailing-icon="i-heroicons-calendar-solid"
            />
            <template #content>
              <UCalendar
                v-model="computedDob"
                color="neutral"
              />
            </template>
          </UPopover>
        </UFormField>
        <UFormField
          label="Bio"
          class="col-span-3"
        >
          <UTextarea
            v-model="formState.fullName"
            class="w-full"
            autoresize
          />
        </UFormField>
      </CommonPageSection>

      <CommonPageSection
        title="Student Information"
        title-icon="i-heroicons-book-open-solid"
        inner-class="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <UFormField
          label="Field of Study"
          name="fieldOfStudy"
          class="w-full"
        >
          <UInput
            v-model="formState.fieldOfStudy"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="University"
          name="university"
          class="w-full"
        >
          <UInput
            v-model="formState.university"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Class"
          name="class"
          class="w-full"
        >
          <UInput
            v-model="formState.class"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Student Code"
          name="studentCode"
          class="w-full"
        >
          <UInput
            v-model="formState.studentCode"
            class="w-full"
          />
        </UFormField>
      </CommonPageSection>

      <CommonPageSection
        title="Residence Information"
        title-icon="i-heroicons-map-pin-solid"
        inner-class="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <UFormField
          label="Province / City"
          name="province"
          required
          class="w-full"
        >
          <USelect
            v-model="formState.province"
            :items="provinces"
            value-key="label"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="District / Ward"
          name="district"
          required
          class="w-full"
        >
          <UInput
            v-model="formState.district"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Specific Address"
          name="detail"
          required
          class="w-full col-span-2"
        >
          <UTextarea
            v-model="formState.detail"
            class="w-full"
            autoresize
          />
        </UFormField>
      </CommonPageSection>

      <!-- <CommonPageSection
        title="Thông tin Liên hệ"
        title-icon="i-heroicons-phone-solid"
        inner-class="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <UFormField
          label="Số điện thoại"
          name="phoneNumber"
          required
          class="w-full"
        >
          <UInput
            v-model="formState.phoneNumber"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Email"
          name="email"
          required
          class="w-full"
        >
          <UInput
            v-model="profile!.email"
            class="w-full"
            disabled
          />
        </UFormField>
      </CommonPageSection>
      <CommonPageSection
        title="Thông tin Liên quan"
        title-icon="i-heroicons-cube-solid"
        inner-class="grid grid-cols-2 gap-8"
      >
        <UFormField
          label="Chức vụ Đoàn hội"
          name="organPosition"
          class="w-full"
        >
          <UInput
            v-model="formState.organPosition"
            class="w-full"
          />
        </UFormField>
        <UFormField
          label="Đảng viên / Đoàn viên"
          name="ydMember"
          class="w-full"
        >
          <UInput
            v-model="formState.ydMember"
            class="w-full"
          />
        </UFormField>
      </CommonPageSection> -->
      <div class="flex justify-end gap-4">
        <UButton
          color="neutral"
          to="/dashboard/me"
          size="lg"
          label="Hủy"
        />
        <UButton
          type="submit"
          color="info"
          class="cursor-pointer"
          icon="i-heroicons-check"
          size="lg"
          label="Lưu thông tin"
          :loading="isLoading"
          :ui="{ label: ['mx-auto text-lg', isLoading && 'hidden'], leadingIcon: 'mx-auto' }"
        />
      </div>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { useProfileDetail } from '~/composables/profile/useProfileDetail'
import type { Tables } from '~/types/database.types'

const route = useRoute()
const id = route.params.id as string

const { provinces } = await useLocation()
const { data: profile } = await useProfileDetail(id)
const { data: curUser } = useNuxtData<Tables<'profiles'>>('user-detail')

const genderOptions = [
  {
    label: 'Male',
    value: 'MALE',
  },
  {
    label: 'Female',
    value: 'FEMALE',
  },
  {
    label: 'Other',
    value: 'OTHER',
  },
]

const isLoading = ref<boolean>(false)

const currentDay = today(getLocalTimeZone())

const computedDob = computed({
  get: (): CalendarDate => {
    if (!formState.dob) return currentDay
    return parseDate(formState.dob)
  },
  set: (newDate: CalendarDate | undefined) => {
    if (!newDate) {
      formState.dob = ''
      return
    }
    formState.dob = newDate.toString()
  },
})

const formState = reactive({
  fullName: profile.value?.full_name ?? '',
  dob: profile.value?.dob ?? currentDay.toString(),
  gender: profile.value?.gender ?? 'MALE',
  bio: curUser.value?.bio ?? '',

  studentCode: profile.value?.student_code ?? '',
  fieldOfStudy: profile.value?.field_of_study ?? '',
  university: profile.value?.university ?? '',
  class: profile.value?.class ?? '',
  province: profile.value?.residence?.province ?? '',
  district: profile.value?.residence?.district ?? '',
  detail: profile.value?.residence?.detail ?? '',
})

const schema
  = z.object({
    fullName: z.string().min(1, 'This field is required!'),
    dob: z.string().min(1, 'This field is required!')
      .refine((dateString) => {
        try {
          const selectedDate = parseDate(dateString)
          if (selectedDate.compare(currentDay) <= 0) {
            return true
          }
          else {
            return false
          }
        }
        catch {
          return false
        }
      }, {
        message: 'Invalid Date of Birth!',
      }),
    gender: z.string().min(1, 'This field is required!'),
    province: z.string().min(1, 'This field is required!'),
    district: z.string().min(1, 'This field is required!'),
    detail: z.string().min(1, 'This field is required!'),
  })

const onSubmit = async () => {
  console.log('lol')
}
</script>
