<!-- eslint-disable max-len -->
<template>
  <nav class="bg-white shadow">
    <div class="flex items-center h-12 px-4 sm:px-6 lg:px-8">
      <router-link class="inline-flex items-center px-2 text-sm font-medium hover:text-tertiary" :to="{ name: 'Home'}">Home</router-link>
      <router-link class="inline-flex items-center px-2 text-sm font-medium hover:text-tertiary" :to="{ name: 'About'}">About</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SiteNav',
};
</script>
