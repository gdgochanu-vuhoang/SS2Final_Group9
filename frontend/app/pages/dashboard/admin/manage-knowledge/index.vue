<template>
  <CommonPageSection
    title-icon="i-heroicons-sparkles-solid"
    title="Hub Assistant Knowledge Management"
    inner-class="flex-col items-start"
  >
    <div class="mb-6">
      <p class="text-sm text-gray-500">
        Insert new paragraphs here to train the AI assistant.
      </p>
    </div>

    <UForm
      :schema="schema"
      :state="formState"
      class="flex flex-col gap-4"
      @submit="onSubmit"
    >
      <UFormField
        v-for="field in formFields"
        :key="field.name"
        :name="field.name"
        :label="field.label"
        :description="field.description"
        :required="field.required"
      >
        <UTextarea
          v-if="field.type === 'textarea'"
          v-model="formState[field.name]"
          :placeholder="field.placeholder"
          class="w-full min-w-120"
          autoresize
        />

        <UInput
          v-else
          v-model="formState[field.name]"
          :placeholder="field.placeholder"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        color="info"
        variant="solid"
        icon="i-heroicons-cpu-chip"
        :loading="isLoading"
        class="mt-4 w-max"
      >
        Vectorize & Save
      </UButton>
    </UForm>
  </CommonPageSection>
</template>

<script setup lang="ts">
import { z } from 'zod'

const formState = reactive({
  title: '',
  content: '',
  url: '',
})

const schema = z.object({
  title: z.string().min(1, 'This field is required!'),
  url: z.string().optional(),
  content: z.string().min(15, 'Content must be at least 15 characters long to be useful for the AI!'),
})

const formFields = [
  {
    name: 'title' as const,
    label: 'Title / Keywords',
    description: 'A short label for this piece of information',
    placeholder: '(e.g., Display all scholarships)',
    type: 'input',
    required: true,
  },
  {
    name: 'url' as const,
    label: 'Reference URL (Optional)',
    description: 'The page the AI should link the user to for more details',
    placeholder: '(e.g., dashboard/scholarships)',
    type: 'input',
  },
  {
    name: 'content' as const,
    label: 'Knowledge Content',
    description: 'The actual text the AI will read to answer the user',
    placeholder: 'Enter the exact rules, deadlines, or documentation here...',
    type: 'textarea',
    required: true,
  },
]

const { isLoading, ingest } = useChatbot()

const onSubmit = async () => {
  await ingest(formState)
  formState.title = ''
  formState.content = ''
  formState.url = ''
}
</script>
