<template>
  <div class="flex items-start">
    <ShareNetwork v-for="network in networks"
      :network="network.network"
      :key="network.network"
      :url="sharing.url"
      :title="sharing.title"
      :description="sharing.description"
      :quote="sharing.quote"
      :hashtags="sharing.hashtags"
      :twitterUser="sharing.twitterUser"
    >
      <button class="h-6 w-6">
        <img
          :src="require(`@/assets/images/social_${network.icon}.svg`)"
          class="mr-1">
      </button>
    </ShareNetwork>
  </div>
</template>
<script>
import Vue from 'vue';
import VueSocialSharing from 'vue-social-sharing';

Vue.use(VueSocialSharing);

export default {
  data() {
    return {
      sharing: {
        url: 'https://www.tourhero.com/en/ultimate-guide-covid19-travel-restrictions-reopening/',
        title: 'The Ultimate Guide to COVID-19 Travel Restrictions',
        description: 'A free and open-source project by TourHero. Find the latest information for travel restrictions around the world during this COVID-19 pandemic.Travel safe!',
        quote: 'Get the latest travel reopening information',
        hashtags: 'tourherotravel',
        twitterUser: 'tourherotravel',
      },
      networks: [
        { network: 'facebook', icon: 'facebook' },
        // { network: 'linkedin', icon: 'linkedin' },
        // { network: 'telegram', icon: 'telegram' },
        { network: 'twitter', icon: 'twitter' },
        // { network: 'whatsapp', icon: 'whatsapp' },
      ],
    };
  },
};
</script>
