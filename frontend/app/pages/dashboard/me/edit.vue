<template>
  <div class="flex flex-col gap-10">
    <ProfileEditFloaterGrid />
    <CommonPageSection>
      <div class="grid grid-cols-2 w-full gap-x-8">
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl text-info font-bold mb-2">
            Thông Tin ABC
          </h2>
          <UFormField
            v-for="n in 6"
            :key="n"
            label="Tạm Thời"
            required
          >
            <UInput
              value="Tạm Thời"
              class="w-full"
              color="neutral"
              :ui="{ base: 'bg-gray-100 h-10 text-black' }"
            />
          </UFormField>
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="text-2xl text-info font-bold mb-2">
            Thông Tin 123
          </h2>
          <UFormField
            v-for="n in 8"
            :key="n"
            label="Tạm Thời"
            required
          >
            <UInput
              value="Tạm Thời"
              class="w-full"
              color="neutral"
              :ui="{ base: 'bg-gray-100 h-10 text-black' }"
            />
          </UFormField>
        </div>
      </div>
    </CommonPageSection>
    <div class="ml-auto flex gap-4">
      <UButton
        label="Lưu Lại"
        color="info"
        class="h-10 px-10 cursor-pointer"
        :ui="{ label: 'mx-auto text-lg' }"
      />
      <UButton
        label="Hủy"
        color="neutral"
        class="h-10 px-10 cursor-pointer"
        :ui="{ label: 'mx-auto text-lg' }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
