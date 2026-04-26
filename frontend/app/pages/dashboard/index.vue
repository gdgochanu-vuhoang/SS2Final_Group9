<template>
  <div>
    <ProfileMissingInfo
      v-if="!curUser?.is_complete"
    />
  </div>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'

const { data: curUser } = useNuxtData<Tables<'profiles'>>('user-detail')
</script>
