<template>
  <div class="flex flex-col gap-10">
    <ProfileBanner
      v-if="profile?.role === 'STUDENT'"
      :name="profile?.full_name"
      :student-code="profile?.student_code"
      :uid="profile?.id"
      :avatar-url="profile.avatar_url"
      role="STUDENT"
    />
    <ProfileBanner
      v-else
      :name="profile?.username"
      :uid="profile?.id"
      :avatar-url="profile?.avatar_url"
      :role="profile?.role!"
    />
    <ProfileOverview
      v-if="profile?.role === 'STUDENT'"
      :sections="OVERVIEWSECTIONS"
    />
    <CommonPageSection
      v-else-if="profile?.bio"
      inner-class="bg-info-300 rounded-lg p-10 flex-col text-white gap-2"
    >
      <p class="text-white text-lg">
        {{ profile?.bio }}
      </p>
    </CommonPageSection>

    <div
      v-if="profile?.role === 'STUDENT'"
      class="flex flex-col lg:grid grid-cols-3 gap-10 lg:gap-4"
    >
      <div class="flex flex-col gap-10 col-span-2">
        <CommonPageSection
          title="Information"
          title-icon="i-heroicons-user-solid"
        >
          <div class="flex flex-wrap gap-y-2">
            <div
              v-for="info in STUDENTOVERVIEWINFO"
              :key="info.label"
              class="w-1/2 grid grid-cols-1 md:grid-cols-[30%_auto]"
            >
              <h3 class="font-bold text-info">
                {{ info.label }}:
              </h3>
              <p>
                {{ info.value }}
              </p>
            </div>
            <div class="flex flex-col md:flex-row md:gap-2">
              <h3 class="font-bold text-info">
                Residence:
              </h3>
              <p>
                {{ profile?.residence?.detail }}, {{ profile?.residence?.district }}, {{ profile?.residence?.province }}
              </p>
            </div>
          </div>
        </CommonPageSection>
        <CommonPageSection
          title="Contact"
          title-icon="i-heroicons-phone-solid"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 w-full">
            <div
              v-for="(contact, idx) in profile?.contact_info"
              :key="idx"
              class="cursor-pointer rounded-lg bg-neutral-100 py-2 text-center"
              @click="copier(contact.value)"
            >
              <p>{{ contact.value }}</p>
            </div>
          </div>
        </CommonPageSection>
      </div>
      <div class="flex flex-col gap-10">
        <CommonPageSection inner-class="bg-info-300 rounded-lg p-10 flex-col text-white gap-2">
          <p class="text-white text-lg">
            {{ profile?.bio }}
          </p>
        </CommonPageSection>
        <CommonPageSection
          title="Tiến Độ Học Tập"
          container-class="h-full"
          inner-class="h-full"
          title-icon="i-heroicons-bolt-solid"
        >
          <div class="flex flex-col w-full h-full gap-4">
            <div
              v-for="progress in PROGRESSES"
              :key="progress.label"
              class="h-full"
            >
              <div class="flex justify-between font-bold w-full">
                <p>{{ progress.label }}</p>
                <p>{{ progress.score }}<span class="font-normal text-dimmed"> / 100</span></p>
              </div>
              <UProgress
                v-model="progress.score"
                color="info"
              />
            </div>
          </div>
        </CommonPageSection>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col gap-10"
    >
      <CommonPageSection
        v-if="profile?.role === 'ORGANIZER'"
        title="Information"
        title-icon="i-heroicons-user-solid"
      >
        <div class="w-full flex flex-wrap gap-y-2">
          <div
            v-for="info in ORGANIZEROVERVIEWINFO"
            :key="info.label"
            class="w-1/3 grid grid-cols-1 md:grid-cols-[30%_auto]"
          >
            <h3 class="font-bold text-info">
              {{ info.label }}:
            </h3>
            <p>
              {{ info.value }}
            </p>
          </div>
        </div>
      </CommonPageSection>
      <CommonPageSection
        v-if="profile?.contact_info?.length"
        title="Contact"
        title-icon="i-heroicons-phone-solid"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2 w-full">
          <div
            v-for="(contact, idx) in profile?.contact_info"
            :key="idx"
            class="cursor-pointer rounded-lg bg-neutral-100 py-2 text-center"
            @click="copier(contact.value)"
          >
            <p>{{ contact.value }}</p>
          </div>
        </div>
      </CommonPageSection>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileDetail } from '~/composables/profile/useProfileDetail'

const route = useRoute()
const { id } = route.params

const { data: profile } = await useProfileDetail(id?.toString())

const OVERVIEWSECTIONS = [
  {
    label: 'GPA',
    desc: '3.8',
    icon: 'i-heroicons-academic-cap-solid',
  },
  {
    label: 'TRẠNG THÁI RÈN LUYỆN',
    desc: 'TỐT',
    icon: 'i-heroicons-check-circle-solid',
  },
  {
    label: 'SỐ TÍN CHỈ HOÀN THÀNH',
    desc: '36',
    icon: 'i-heroicons-clock-solid',
  },
  {
    label: 'HỒ SƠ BỊ LOẠI/THIẾU',
    desc: '12',
    icon: 'i-heroicons-exclamation-circle-solid',
  },
]

const STUDENTOVERVIEWINFO = [
  {
    label: 'Full Name',
    value: profile.value?.full_name,
  },
  {
    label: 'Student Code',
    value: profile.value?.student_code,
  },
  {
    label: 'Gender',
    value: formatGender[profile.value?.gender ?? 'OTHER'],
  },
  {
    label: 'Field of Study',
    value: profile.value?.field_of_study,
  },
  {
    label: 'Date of Birth',
    value: formatDate(profile.value?.dob),
  },
  {
    label: 'University',
    value: profile.value?.university,
  },
  {
    label: 'Class',
    value: profile.value?.class,
  },
]

const ORGANIZEROVERVIEWINFO = [
  {
    label: 'Website',
    value: profile.value?.website,
  },
]

const PROGRESSES = [
  {
    label: 'Chuyên Ngành',
    score: 22,
  },
  {
    label: 'Đại Cương',
    score: 36,
  },
  {
    label: 'Thể Chất',
    score: 47,
  },
]
</script>
