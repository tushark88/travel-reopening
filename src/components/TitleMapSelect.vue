<template>
  <div>
    <div class="container">
      <div class="container__inner">
        <h1>The Ultimate Guide to COVID–19 Travel Restrictions</h1>
        <p class="w-full md:w-8/12 m-0">
          Borders are slowly reopening as we battle COVID–19. Here you will find
          the latest information for travel restrictions and guidelines. Travel safe!
        </p>
        <div class="flex items-center my-4 sm:my-6 md:md-8">
          <div class="mr-2">
            <TravelDirectionToggle/>
          </div>
          <CountrySelect/>
        </div>
      </div>
    </div>
    <div class="bg-warm-gray-50 py-1">
      <div class="container">
        <div class="container__inner">
          <WorldMap/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CountrySelect from '@/components/CountrySelect.vue';
import TravelDirectionToggle from '@/components/TravelDirectionToggle.vue';
import WorldMap from '@/components/WorldMap.vue';

export default {
  name: 'TitleMapSelect',
  components: { CountrySelect, TravelDirectionToggle, WorldMap },
};
</script>
