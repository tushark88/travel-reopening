<!-- eslint-disable max-len -->
<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto py-6">
      <h1>The Ultimate Guide to COVID–19 Travel Restriction</h1>
      <p class="w-8/12 m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti ab cupiditate necessitatibus autem, error obcaecati possimus.</p>
      <div class="py-4">
        <WorldMap/>
      </div>
      <div class="flex items-center">
        <div class="mr-2">
          <TravelDirectionToggle/>
        </div>
        <CountrySelect/>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue';
import TravelDirectionToggle from '@/components/TravelDirectionToggle.vue';
import WorldMap from '@/components/WorldMap.vue';

export default {
  name: 'Home',
  components: { CountrySelect, TravelDirectionToggle, WorldMap },
};
</script>
