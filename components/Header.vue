<template>
  <header class="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="componentStore.triggerSideBar"
      >
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center">
      <div
        class="relative"
      >
        <button
          class="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none"
          @click="componentStore.triggerDropdown"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>

        <div
          v-show="componentStore.isDropdownOpen"
          class="fixed inset-0 h-full w-full z-10"
          style="display: none;"
          @click="componentStore.triggerDropdown"
        />

        <div
          v-show="componentStore.isDropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
          style="display: none;"
        >
          <a
            href="javascript: void(0)"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
            @click="logout"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ComponentStore, useComponentStore } from '~/stores/component';
import { AuthService } from '~/services/auth';
import { serviceFactory, Services } from '~/services';

const { $client } = useNuxtApp();

const componentStore = useComponentStore() as unknown as ComponentStore;
const service = <AuthService>serviceFactory($client, Services.Auth);

const logout = async () => {
  await service.logout();

  return navigateTo('login');
};
</script>
