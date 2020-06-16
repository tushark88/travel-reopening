<template>
  <div>
    <div class="container">
      <div class="container__inner">
        <h1>The Ultimate Guide to COVID–19 Travel Restrictions</h1>
        <p class="w-full md:w-8/12 m-0">
          This guide is a free and open source project by TourHero. Select the country you want to
          travel to, and see its travel restriction. Alternatively, toggle to the country you’re
          traveling from to see which countries you’re allowed to enter. Travel safe!
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
