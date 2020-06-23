<template>
  <div id="app" class="flex flex-col h-screen font-body text-gray-800">
    <div class="mb-16 sm:mb-18 lg:mb-24">
      <SiteNav/>
    </div>
    <div class="flex-grow">
      <router-view/>
      <div class="main-container">
        <div class="main-container__inner">
          <Subscription/>
        </div>
      </div>
    </div>
    <SiteFooter/>
  </div>
</template>

<script>
import SiteNav from '@/components/SiteNav.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import Subscription from '@/components/Subscription.vue';

export default {
  name: 'App',
  components: { SiteNav, SiteFooter, Subscription },
  metaInfo: {
    title: 'The Ultimate Guide to COVID–19 Travel Restrictions',
    titleTemplate: '%s | Project Travel Reopening',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'A free and open-source project by TourHero. Find the latest information for travel restrictions around the world during this COVID–19 pandemic. Travel safe!' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `https://www.tourhero.com${process.env.BASE_URL}img/travel-reopening-cover.jpg` },
      { name: 'og:image', content: `https://www.tourhero.com${process.env.BASE_URL}img/travel-reopening-cover.jpg` },
    ],
  },
};
</script>

<style>
@media (min-width: 640px) {
  .flex-grow {
    margin-left: calc(100vw - 100%);
    margin-right: 0;
  }
}
</style>
