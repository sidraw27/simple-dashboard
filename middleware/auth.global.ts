import { AuthStore, useAuthStore } from '~/stores/auth';

// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => {
  const exceptRoutes = ['login', 'oauth-callback'];

  if (!exceptRoutes.includes(to.name as string)) {
    const authStore = useAuthStore() as unknown as AuthStore;
    if (authStore.isInit && !authStore.isLogin) {
      return navigateTo('/login');
    }
  }
});
