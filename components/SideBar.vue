<template>
  <div
    :class="componentStore.isSideBarOpen ? 'block' : 'hidden'"
    class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
    @click="componentStore.triggerSideBar"
  />
  <div
    :class="componentStore.isSideBarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
    class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
  >
    <div class="flex items-center justify-center mt-8">
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <span class="text-white text-2xl mx-2 font-semibold">
          Demo
        </span>
      </div>
    </div>

    <nav class="mt-10">
      <NuxtLink
        :class="isActive('index') ? 'text-gray-100' : 'text-gray-500'"
        class="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        to="/"
      >
        <svg
          class="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>

        <span class="mx-3">
          Dashboard
        </span>
      </NuxtLink>

      <NuxtLink
        :class="isActive('profile') ? 'text-gray-100' : 'text-gray-500'"
        class="flex items-center mt-4 py-2 px-6 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
        to="/profile"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
        <span class="mx-3">
          Profile
        </span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ComponentStore, useComponentStore } from '~/stores/component';

const componentStore = useComponentStore() as unknown as ComponentStore;

const route = useRoute();
const isActive = (name: string) => name === route.name;
</script>
