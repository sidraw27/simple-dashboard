<template>
  <div>
    <div
      class="flex h-screen bg-gray-200"
    >
      <SideBar />

      <div class="flex-1 flex flex-col overflow-hidden">
        <Header />
        <slot />
      </div>
    </div>
  </div>
</template>
