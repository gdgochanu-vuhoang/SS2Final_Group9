<template>
  <div class="grid grid-cols-2">
    <div class="pr-10 pb-10 h-full relative">
      <CommonPageSection
        container-class="h-full"
        inner-class="gap-4 h-full"
      >
        <div class="relative">
          <NuxtImg
            :src="PROFILEIMAGE"
            class="size-40 rounded-full object-cover shadow-xl border-white border-4"
            format="webp"
            quality="70"
          />
          <div
            class="absolute size-40 top-0 left-0 bg-black/65 flex items-center justify-center rounded-full border-white border-4 cursor-pointer hover:opacity-100 opacity-0 transition-opacity"
          >
            <p class="text-white font-bold">
              Thay Đổi
            </p>
          </div>
          <div
            class="absolute bottom-4 right-4 bg-info size-6 rounded-full flex p-1 items-center justify-center pointer-events-none"
          >
            <UIcon
              class="size-full bg-white"
              name="i-heroicons-camera-solid"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <h3 class="text-2xl font-bold text-center lg:text-start">
            Nguyễn Văn A
          </h3>
          <p class="text-dimmed">
            MSV: 2301140037
          </p>
          <UBadge
            label="Sinh Viên"
            class="w-max mt-2"
            color="neutral"
          />
        </div>
      </CommonPageSection>
      <div class="absolute bottom-0 right-0 bg-white size-4">
        <div class="size-full bg-gray-200 rounded-br-full" />
      </div>
    </div>
    <CommonPageSection
      container-class="rounded-b-none"
      title="Thông Tin Sinh Viên"
      title-icon="i-heroicons-user-solid"
      inner-class="flex-col items-start h-full"
    >
      <h2 class="text-2xl text-info font-bold">
        Cá Nhân
      </h2>
      <div class="grid grid-cols-[auto_40%] w-full h-full mt-2 gap-x-8 gap-y-2">
        <div
          v-for="(field, idx) in PERSONALFIELDS"
          :key="idx"
          class="w-full"
        >
          <UFormField
            :label="field.label"
            required
          >
            <USelect
              v-if="field.select"
              :items="field.options"
              :default-value="field.placeholder"
              color="info"
              class="w-full"
              :ui="{ base: 'bg-gray-100 h-10 text-black' }"
            />
            <UInput
              v-else
              :value="field.placeholder"
              class="w-full"
              color="neutral"
              :ui="{ base: 'bg-gray-100 h-10 text-black' }"
            />
          </UFormField>
        </div>
      </div>
    </CommonPageSection>
    <CommonPageSection
      container-class="rounded-br-none rounded-tr-none"
      inner-class="flex-col items-start gap-2"
    >
      <h2 class="text-2xl text-info font-bold">
        Thông Tin Liên Hệ
      </h2>
      <div
        v-for="(field, idx) in CONTACTFIELDS1"
        :key="idx"
        class="w-full mt-2"
      >
        <UFormField
          :label="field.label"
          required
        >
          <UInput
            :value="field.placeholder"
            class="w-full"
            color="neutral"
            :ui="{ base: 'bg-gray-100 h-10 text-black' }"
          />
        </UFormField>
      </div>
    </CommonPageSection>
    <CommonPageSection
      container-class="rounded-bl-none rounded-tl-none"
      inner-class="flex-col items-start justify-end gap-2 h-full"
    >
      <div
        v-for="(field, idx) in CONTACTFIELDS2"
        :key="idx"
        class="w-full mt-2"
      >
        <UFormField
          :label="field.label"
          required
        >
          <UInput
            :value="field.placeholder"
            class="w-full"
            color="neutral"
            :ui="{ base: 'bg-gray-100 h-10 text-black' }"
          />
        </UFormField>
      </div>
    </CommonPageSection>
  </div>
</template>

<script setup lang="ts">
const PROFILEIMAGE = '/ProfileUserImageTemp.jpg'

const PERSONALFIELDS = [
  {
    label: 'Họ và Tên',
    placeholder: 'Nguyễn Văn A',
  },
  {
    label: 'Giới Tính',
    select: true,
    options: [
      {
        label: 'Nam',
        value: 'male',
      },
      {
        label: 'Nữ',
        value: 'female',
      },
      {
        label: 'Khác',
        value: 'other',
      },
    ],
    placeholder: 'male',
  },
  {
    label: 'Số CMND',
    placeholder: '01020304050607080',
  },
  {
    label: 'Ngày Sinh',
    placeholder: '25/11/2005',
  },
  {
    label: 'Dân Tộc',
    placeholder: 'Kinh',
  },
]

const CONTACTFIELDS1 = [
  {
    label: 'Mail Outlook',
    placeholder: '2301140037@ms.hanu.edu.vn',
  },
  {
    label: 'Mail bổ sung',
    placeholder: 'sheepishlysheeping@gmail.com',
  },
]

const CONTACTFIELDS2 = [
  {
    label: 'Số Điện Thoại',
    placeholder: '0123456789',
  },
  {
    label: 'Số Điện Thoại Giáo Viên Phụ Trách',
    placeholder: '0987654321',
  },
]
</script>
