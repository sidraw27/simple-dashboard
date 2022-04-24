import { AuthStore, useAuthStore } from '~/stores/auth';
import { nextTick } from '@vue/runtime-core';
import { AuthService } from '~/services/auth';
import { serviceFactory, Services } from '~/services';

// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => nextTick(async () => {
  const { $client } = useNuxtApp();
  const authStore = useAuthStore() as unknown as AuthStore;
  const service = <AuthService>serviceFactory($client, Services.Auth);

  const exceptRoutes = ['login', 'signup', 'oauth-callback', 'emails-validate'];

  if (!exceptRoutes.includes(to.name as string)) {
    try {
      await service.reAuth();
    } catch (error) {
      authStore.logout();
      return navigateTo('/login');
    }

    if (!authStore.isVerify && to.name !== 'unvalidated') {
      return navigateTo('/unvalidated');
    }
  }
}));
