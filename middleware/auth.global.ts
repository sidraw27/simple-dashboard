import { AuthStore, useAuthStore } from '~/stores/auth';

// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => {
  const exceptRoutes = ['login', 'signup', 'oauth-callback', 'emails-validate'];

  if (!exceptRoutes.includes(to.name as string)) {
    const authStore = useAuthStore() as unknown as AuthStore;
    if (authStore.isInit) {
      if (!authStore.isLogin) {
        return navigateTo('/login');
      }
      if (!authStore.isVerify && to.name !== 'unvalidated') {
        return navigateTo('/unvalidated');
      }
    }
  }
});
