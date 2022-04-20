import { AxiosError } from 'axios';
import { AlertStore, useAlertStore } from '~/stores/alert';

export const errorHandler = (error: AxiosError) => {
  const alertStore = useAlertStore() as unknown as AlertStore;

  const { response } = error;
  let message;

  switch (response?.status) {
    case 400:
      message = response?.data.message;

      if (message instanceof Array) {
        alertStore.alert = message.join('、');
      } else {
        alertStore.alert = message;
      }

      setTimeout(() => alertStore.flush(), 3000);

      throw message;
    case 401:
      throw error.response?.data.message;
    case 403:
      navigateTo({
        path: '/login',
      });
      break;
    default:
      throw error;
  }
};
