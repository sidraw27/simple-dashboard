import axios from 'axios';
import { errorHandler } from '~/plugins/client/error-handler';
import NProgress from 'nprogress';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  let prefix = '';

  axios.defaults.baseURL = config.public.api.baseUrl;
  axios.interceptors.request.use(
    (axiosConfig) => {
      NProgress.start();
      return axiosConfig;
    },
  );
  axios.interceptors.response.use(
    (response) => {
      NProgress.done();
      return response;
    },
    (error) => {
      NProgress.done();
      return errorHandler(error);
    },
  );

  const getUrl = (target: string) => {
    const endpoint = `/${prefix}/${target}`;
    prefix = '';

    return endpoint;
  };

  const client: Client = {
    setPrefix(_prefix) {
      prefix = _prefix;

      return client;
    },
    async get(target, params) {
      const { data: { data } } = await axios.get(getUrl(target), { params });

      return data;
    },
    async post(target, payload) {
      const { data: { data } } = await axios.post(getUrl(target), payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data;
    },
    async patch(target, payload) {
      const { data: { data } } = await axios.patch(getUrl(target), payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data;
    },
  };

  return {
    provide: {
      client,
    },
  };
});
