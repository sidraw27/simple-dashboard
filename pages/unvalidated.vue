<template>
  <div class="rounded-t-lg overflow-hidden border-t border-l border-r border-gray-400 text-center p-4">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="resend"
    >
      Resend Validate Email ...
    </button>
  </div>
  <div class="text-center">
    <span class="py-2 px-4 text-red-500">
      {{ serverError }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { serviceFactory, Services } from '~/services';
import { AxiosError } from 'axios';
import { AuthStore, useAuthStore } from '~/stores/auth';
import { AuthService } from '~/services/auth';

const { $client } = useNuxtApp();
const service = <AuthService>serviceFactory($client, Services.Auth);
const authStore = useAuthStore() as unknown as AuthStore;

if (authStore.isVerify) {
  await navigateTo('/');
}

const serverError = ref<string>();

const resend = async () => {
  try {
    await service.resendValidateEmail();
  } catch (error) {
    serverError.value = (error as AxiosError).response?.data.message;
    setTimeout(() => {
      serverError.value = undefined;
    }, 3000);
  }
};
</script>
