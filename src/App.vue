<template>
  <div id="app" class="flex flex-col h-screen font-body text-gray-800">
    <SiteNav/>
    <div class="flex-grow">
      <router-view/>
    </div>
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

<style>
.flex-grow {
  margin-left: calc(100vw - 100%);
  margin-right: 0;
}
</style>
