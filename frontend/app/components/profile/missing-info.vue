<template>
  <CommonPageSection inner-class="flex flex-col justify-center items-center gap-6 py-10">
    <h2 class="text-3xl font-bold text-info">
      Incomplete Account
    </h2>
    <p class="text-xl">
      Please complete your account!
    </p>
    <UButton
      class="py-4 cursor-pointer"
      color="info"
      label="Edit Profile"
      @click="handleRouting"
    />
  </CommonPageSection>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'

const { data: curUser } = useNuxtData<Tables<'profiles'>>('user-detail')

const handleRouting = () => {
  navigateTo(`/dashboard/${curUser.value?.id}/edit`)
}
</script>
