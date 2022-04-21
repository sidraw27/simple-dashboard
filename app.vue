<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { AuthStore, useAuthStore } from '~/stores/auth';
import { AuthService } from './services/auth';
import { serviceFactory, Services } from './services';

const { $client } = useNuxtApp();
const authStore = useAuthStore() as unknown as AuthStore;
const service = <AuthService>serviceFactory($client, Services.Auth);

authStore.isInit = true;

try {
  await service.reAuth();
  if (!authStore.isVerify && useRoute().name !== 'emails-validate') {
    await navigateTo('/unvalidated');
  }
} catch (error) {
  authStore.logout();
  await navigateTo('/login');
}
</script>

<style>
#nprogress .bar {
  background: rgba(16, 143, 120, 0.87);

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 8px;
}
</style>
