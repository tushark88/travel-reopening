<template>
  <nav class="bg-white shadow mb-4 sm:mb-6 lg:mb-8">
    <div class="flex h-12 px-4 sm:px-6 lg:px-8">
      <div class="flex-shrink-0 flex items-center">
        <router-link class="pr-1 pt-1 no-underline hover:opacity-100" :to="{ name: 'Home'}">
          <img class="block h-8 w-auto" src="../assets/images/site-logo.png">
        </router-link>
      </div>
      <div class="flex">
        <router-link class="ml-3 sm:ml-4 inline-flex items-center px-1 pt-1
          text-sm font-medium text-gray-700 no-underline hover:text-gray-900"
          :to="{ name: 'About'}" id="sitenav-about">About</router-link>
        <a class="ml-3 sm:ml-4 inline-flex items-center px-1 pt-1 text-sm font-medium
          text-gray-700 no-underline hover:text-gray-900"
          href="https://github.com/tourhero/travel-reopening" id="sitenav-contribute">Contribute</a>
        <router-link class="ml-3 sm:ml-4 inline-flex items-center px-1 pt-1 text-sm
          font-medium text-gray-700 no-underline hover:text-gray-900" :to="{ name: 'Subscribe'}"
          id="sitenav-subscribe">Subscribe</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'SiteNav',
};
</script>
