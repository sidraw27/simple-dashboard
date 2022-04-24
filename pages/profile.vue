<template>
  <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
    <div class="container mx-auto px-6 py-8">
      <h3 class="text-gray-700 text-3xl font-medium">
        Profile
      </h3>

      <div class="mt-8">
        <div class="mt-4">
          <div class="p-6 bg-white rounded-md shadow-md">
            <h2 class="text-lg text-gray-700 font-semibold capitalize">
              Profile
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label
                  class="text-gray-700"
                >
                  Name
                </label>
                <input
                  v-model="namePatchDto.name"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  type="text"
                >
              </div>

              <div>
                <label
                  class="text-gray-700"
                >
                  Email
                </label>
                <input
                  disabled="disabled"
                  :value="authStore.email"
                  class="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-400"
                  type="email"
                >
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                @click="updateName"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="authStore.loginType === LoginType.custom"
        class="mt-8"
      >
        <div class="mt-4">
          <div class="max-w-md p-3 bg-white rounded-md shadow-md">
            <h2 class="text-lg text-gray-700 font-semibold capitalize">
              Reset Password
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-1 gap-6 mt-4">
              <div>
                <label
                  class="text-gray-700"
                >
                  Old Password
                </label>
                <input
                  v-model="passwordPatchDto.oldPassword"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  type="password"
                >
              </div>

              <div>
                <label
                  class="text-gray-700"
                >
                  New Password
                </label>
                <input
                  v-model="passwordPatchDto.password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  type="password"
                >
              </div>

              <div>
                <label
                  class="text-gray-700"
                >
                  New Password Confirmation
                </label>
                <input
                  v-model="passwordPatchDto.passwordConfirmation"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  type="password"
                >
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button
                class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                @click="resetPassword"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-blue-800 text-blue-200 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { AuthStore, LoginType, useAuthStore } from '~/stores/auth';
import { serviceFactory, Services } from '~/services';
import { UserService } from '~/services/user';
import { PatchDto } from '~/services/user/dtos/patch.dto';
import { AuthService } from '~/services/auth';

const { $client } = useNuxtApp();
const userService = <UserService>serviceFactory($client, Services.User);
const authService = <AuthService>serviceFactory($client, Services.Auth);
const authStore = useAuthStore() as unknown as AuthStore;

const namePatchDto = reactive<PatchDto>({
  name: authStore.name as string,
});

const passwordPatchDto = reactive<PatchDto>({
  oldPassword: undefined,
  password: undefined,
  passwordConfirmation: undefined,
});

const logout = async () => {
  await authService.logout();

  return navigateTo('login');
};

const updateName = async () => {
  await userService.update(authStore.uuid as string, namePatchDto);
  await authService.reAuth(true);
};

const resetPassword = async () => {
  await userService.update(authStore.uuid as string, passwordPatchDto);
  await authService.logout();

  return navigateTo('/login');
};
</script>
