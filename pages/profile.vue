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
                  v-model="name"
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
                  value="sidraw.fr@gmail.com"
                  class="block shadow appearance-none border rounded w-full py-2 px-3 text-gray-400"
                  type="email"
                >
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
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
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  type="password"
                >
              </div>
            </div>

            <div class="flex justify-end mt-4">
              <button class="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { AuthStore, useAuthStore, LoginType } from '~/stores/auth';

const authStore = useAuthStore() as unknown as AuthStore;
const name = ref<string|null>(authStore.name);
</script>
