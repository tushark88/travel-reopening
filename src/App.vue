<template>
  <div id="app" class="font-body text-gray-800">
    <SiteNav/>
    <router-view/>
    <SiteFooter/>
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default {
  name: 'App',
  components: { SiteNav, SiteFooter },
};
</script>
