<template>
  <div class="w-full rounded-lg block h-full">
    <NuxtImg
      :src="PROFILEBANNER"
      class="w-full h-40 object-cover rounded-t-lg"
      format="webp"
      quality="70"
    />
    <CommonPageSection
      container-class="rounded-t-none lg:h-30"
      inner-class="gap-4 relative flex-col lg:flex-row h-full"
    >
      <NuxtImg
        :src="avatarUrl ?? ''"
        class="absolute -top-1/2 size-40 rounded-full object-cover shadow-xl border-white border-4"
        format="webp"
        quality="70"
      />
      <div class="h-8 lg:w-40" />
      <div class="flex flex-col gap-2">
        <h3 class="text-2xl font-bold text-center lg:text-start">
          {{ name }}
        </h3>
        <div class="flex gap-2 items-center">
          <ProfileRoleBadge :role="role" />
          <p
            v-if="studentCode"
            class="text-dimmed"
          >
            Student Code: {{ studentCode }}
          </p>
        </div>
      </div>
      <div class="lg:ml-auto flex gap-2">
        <div
          v-for="(action, id) in PROFILEACTIONS"
          :key="id"
        >
          <UButton
            v-if="action.visible ?? true"
            :label="action.label"
            :color="action.color"
            :variant="action.variant"
            :to="action.to"
            class="h-10 cursor-pointer px-6"
            @click="action.onclick"
          />
        </div>
      </div>
    </CommonPageSection>
  </div>
</template>

<script setup lang="ts">
import type { Enums, Tables } from '~/types/database.types'

const { data: curUser } = useNuxtData<Tables<'profiles'>>('user-detail')

const PROFILEBANNER = '/ProfileBannerTemp.jpg'

const url = useRequestURL()

const props = defineProps<{
  name?: string | null
  uid?: string | null
  studentCode?: string | null
  avatarUrl?: string | null
  role: Enums<'profile_role'>
}>()

const PROFILEACTIONS: action_types[] = [
  {
    label: 'Edit Profile',
    color: 'info',
    variant: 'outline',
    to: `/dashboard/${props.uid}/edit`,
    visible: props.uid === curUser.value?.id,
  },
  {
    label: 'Share',
    color: 'info',
    variant: 'solid',
    onclick: () => { copier(url.href, 'Link Copied to Clipboard') },
  },
]

type action_types = {
  label: string
  color: 'info' | 'error' | 'primary' | 'secondary' | 'success' | 'warning' | 'neutral'
  variant: 'solid' | 'outline' | 'link' | 'soft' | 'subtle' | 'ghost'
  onclick?: () => void
  to?: string
  visible?: boolean
}
</script>
