<template>
  validate ...
  <div>
    {{ serverError }}
  </div>
</template>

<script setup lang="ts">
import { serviceFactory, Services } from '~/services';
import { ValidateEmailDto } from '~/services/user/dtos/validate-email.dto';
import { AxiosError } from 'axios';
import { AuthStore, useAuthStore } from '~/stores/auth';
import { AuthService } from '~/services/auth';

definePageMeta({
  layout: 'clear',
});

const { $client } = useNuxtApp();
const service = <AuthService>serviceFactory($client, Services.Auth);
const authStore = useAuthStore() as unknown as AuthStore;
const route = useRoute();
const { token, email } = route.query as ValidateEmailDto;

if (token === undefined || email === undefined) {
  await navigateTo('/login');
}

if (authStore.isVerify) {
  await navigateTo('/');
}

const serverError = ref<string>();

try {
  await service.validateEmail({
    token,
    email,
  });

  await navigateTo('/');
} catch (error) {
  serverError.value = (error as AxiosError).response?.data.message;
}
</script>
