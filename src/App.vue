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
  metaInfo: {
    title: 'The Ultimate Guide to COVID–19 Travel Restrictions',
    titleTemplate: '%s | Project Travel Reopening',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Borders are slowly reopening as we battle COVID–19. Here you will find the latest information for travel restrictions and guidelines. Travel safe!' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  },
};
</script>

<style>
.flex-grow {
  margin-left: calc(100vw - 100%);
  margin-right: 0;
}
</style>
