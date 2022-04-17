import { AxiosError } from 'axios';

export const errorHandler = (error: AxiosError) => {
  switch (error.response?.status) {
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
