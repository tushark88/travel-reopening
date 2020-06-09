<template>
  <div class="home">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <div class="pb-8">
          <WorldMap/>
        </div>
        <CountrySelect/>
        <TravelDirectionToggle/>
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
