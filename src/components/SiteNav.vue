<!-- eslint-disable max-len -->
<template>
  <nav class="bg-white shadow">
    <div class="flex items-center h-12 px-4 sm:px-6 lg:px-8">
      <router-link class="inline-flex px-2 text-gray-800 font-medium no-underline hover:opacity-100" :to="{ name: 'Home'}">Home</router-link>
      <router-link class="inline-flex px-2 text-gray-800 font-medium no-underline hover:opacity-100" :to="{ name: 'About'}">About</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SiteNav',
};
</script>
