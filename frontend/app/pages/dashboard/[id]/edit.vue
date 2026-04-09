<template>
  <div class="flex flex-col lg:flex-row-reverse gap-x-10 gap-y-10 h-full">
    <ProfileEditFloaterBox class="w-full lg:w-80 lg:sticky shrink-0 top-16 self-start" />

      <UForm :state="form" class="w-full flex flex-col gap-10" @submit="onSubmit">
        <CommonPageSection title="Thông tin Cá nhân" title-icon="i-heroicons-user-solid">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            <UFormField label="Họ và Tên (Full Name)" name="full_name" required class="w-full">
              <UInput v-model="form.full_name" placeholder="Nguyễn Văn A" icon="i-heroicons-user" class="w-full" />
            </UFormField>

            <UFormField label="Số CMND/CCCD (Identity Number)" name="identity_number" required class="w-full">
              <UInput v-model="form.identity_number" placeholder="012345678912" icon="i-heroicons-identification" class="w-full" />
            </UFormField>

            <UFormField label="Ngày sinh (Date of Birth)" name="dob" class="w-full">
              <UInput v-model="form.dob" type="date" icon="i-heroicons-calendar" class="w-full" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Giới tính (Gender)" name="gender">
                <USelect v-model="form.gender" :items="genderOptions" placeholder="Chọn..." class="w-full" />
              </UFormField>

              <UFormField label="Dân tộc (Ethnicity)" name="ethnicity">
                <UInput v-model="form.ethnicity" placeholder="Kinh" class="w-full" />
              </UFormField>
            </div>

            <UFormField label="Số điện thoại (Phone)" name="phone_number" class="md:col-span-2 w-full" >
              <UInput v-model="form.phone_number" type="tel" placeholder="0901234567" icon="i-heroicons-phone" class="w-full" />
            </UFormField>

            <UFormField label="Nơi ở hiện tại (Residence)" name="residence" class="md:col-span-2" >
              <UTextarea v-model="form.residence" placeholder="Địa chỉ chi tiết..." :rows="2" class="w-full" autoresize />
            </UFormField>

          </div>
        </CommonPageSection>

        <CommonPageSection title="Thông tin Học tập" title-icon="i-heroicons-user-solid">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

            <UFormField label="Trường Đại học (University)" name="university" required class="md:col-span-2 w-full">
              <UInput v-model="form.university" placeholder="Đại học Quốc gia Hà Nội" icon="i-heroicons-academic-cap" class="w-full" />
            </UFormField>

            <UFormField label="Mã Sinh viên (Student ID)" name="student_id" required class="w-full">
              <UInput v-model="form.student_id" placeholder="SV123456" class="w-full" />
            </UFormField>

            <UFormField label="Năm học (Year)" name="university_year" class="w-full">
              <USelect v-model="form.university_year" :items="uniYearOptions" placeholder="Năm thứ..." class="w-full" />
            </UFormField>

            <UFormField label="Chuyên ngành (Major)" name="major" class="w-full">
              <UInput v-model="form.major" placeholder="Công nghệ Thông tin" class="w-full"/>
            </UFormField>

            <UFormField label="Lớp (Class)" name="class" class="w-full">
              <UInput v-model="form.class" placeholder="K65-CQ" class="w-full"/>
            </UFormField>

          </div>


        </CommonPageSection>
        <div class="flex justify-end gap-3 pt-4">
          <UButton color="neutral">Hủy</UButton>
          <UButton type="submit" color="info" icon="i-heroicons-check">Lưu thông tin</UButton>
        </div>
      </UForm>
  </div>
</template>

<script lang="ts" setup>

const route = useRoute()
const { id } = route.params

const uniYearOptions = [
  {
    label: '1st Year',
    value: 1
  },
  {
    label: '2nd Year',
    value: 2
  },
  {
    label: '3rd Year',
    value: 3
  },
  {
    label: '4th Year',
    value: 4
  },
] 

const genderOptions = [
  {
    label: "Male",
    value: 'male',
  },
  {
    label: "Female",
    value: 'female',
  },
  {
    label: "Other",
    value: 'other',
  },
]

const form = reactive({
  full_name: '',
  identity_number: '',
  dob: '',
  gender: '',
  ethnicity: '',
  phone_number: '',
  residence: '',
  university: '',
  student_id: '',
  university_year: 1,
  major: '',
  class: ''
})

const onSubmit = async () => {
  const supabase = useSupabaseClient()
  const toast = useToast()

  try {
    // Upsert means it will Insert if new, or Update if the user already exists!
    const { error } = await supabase
      .from('students')
      .update({
        ...form
      })
      .eq('uid', id!.toString())

    if (error) throw error

    toast.add({ title: 'Thành công', description: 'Đã lưu thông tin sinh viên!', color: 'success' })
  } catch (error) {
    toast.add({ title: 'Lỗi', description: error.message, color: 'error' })
  }
}
</script>