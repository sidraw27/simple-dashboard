<template>
  <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
    <div
      class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
    >
      <div class="p-5 bg-white md:flex-1">
        <h3 class="my-4 text-2xl font-semibold text-gray-700">
          Dashboard
        </h3>
        <div class="flex flex-col space-y-5">
          <div class="flex flex-col space-y-1">
            <label
              for="email"
              class="text-sm font-semibold text-gray-500"
            >
              Email address
            </label>
            <input
              id="email"
              v-model="registerDto.email"
              type="email"
              autofocus
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="text-sm font-semibold text-gray-500"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              v-model="registerDto.password"
              type="password"
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
          </div>
          <div class="flex flex-col space-y-1">
            <div class="flex items-center justify-between">
              <label
                for="confirm-password"
                class="text-sm font-semibold text-gray-500"
              >
                Confirm Password
              </label>
            </div>
            <input
              id="confirm-password"
              v-model="registerDto.passwordConfirmation"
              type="password"
              class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
          </div>
          <div>
            <button
              class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              @click="signUp"
            >
              Sign up
            </button>
          </div>

          <div class="flex flex-col space-y-5">
            <span class="flex items-center justify-center font-normal text-red-500">
              {{ loginFailMessage }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RegisterDto } from '~/services/user/dtos/register.dto';
import { serviceFactory, Services } from '~/services';
import { UserService } from '~/services/user';

const { $client } = useNuxtApp();
const service = <UserService>serviceFactory($client, Services.User);

const registerDto = reactive<RegisterDto>({});
const loginFailMessage = ref<string | null>();

watch(registerDto, () => {
  loginFailMessage.value = null;
});

const signUp = async () => {
  try {
    await service.register(registerDto);
    await navigateTo('login');
  } catch (error) {
    loginFailMessage.value = error as string;
  }
};
</script>
