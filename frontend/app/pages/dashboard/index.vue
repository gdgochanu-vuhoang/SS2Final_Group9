<template>
    <div>
        <CommonPageSection v-if="!curUser?.is_filled" inner-class="flex flex-col justify-center py-16 gap-8">
            <h1>Tài khoản chưa được điền thông tin</h1>
            <p>Vui lòng điền thông tin cá nhân để tiếp tục</p>
            <UButton :to="`/dashboard/${curUser?.id}/edit`" color="info" label="Điền thông tin" />
        </CommonPageSection>
    </div>
</template>
<script setup lang="ts">
const { curUser } = await useUser()
</script>