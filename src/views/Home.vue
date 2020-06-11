<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto py-6">
        <h1>The Ultimate Guide to COVID–19 Travel Restrictions</h1>
        <p class="w-full md:w-8/12 m-0">Borders are slowly reopening as we battle COVID–19. Here you will find the latest information for travel restrictions and guidelines. Travel safe!</p>
      </div>
    </div>
    <div class="bg-warm-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto py-6">
          <WorldMap/>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto py-6">
        <CountrySelect/>
        <TravelDirectionToggle/>
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
